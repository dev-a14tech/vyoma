import { afterEach, describe, expect, it, vi } from 'vitest';
import { BadGatewayException, ServiceUnavailableException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service.js';

function service(env: Record<string, string | undefined>) {
  const config = {
    get: (key: string, fallback?: string) => env[key] ?? fallback
  } as unknown as ConfigService;
  return new ChatService(config);
}

const user = (content: string) => ({ role: 'user' as const, content });
const assistant = (content: string) => ({ role: 'assistant' as const, content });

function mockFetch(response: Partial<Response> & { json?: () => Promise<unknown>; text?: () => Promise<string> }) {
  const fn = vi.fn().mockResolvedValue({ ok: true, status: 200, ...response });
  vi.stubGlobal('fetch', fn);
  return fn;
}

describe('ChatService', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reports whether a key is configured', () => {
    expect(service({}).isConfigured()).toBe(false);
    expect(service({ GEMINI_API_KEY: 'k' }).isConfigured()).toBe(true);
  });

  it('refuses to answer when no key is configured', async () => {
    await expect(service({}).reply([user('hi')])).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('sends the key as a header, the system prompt, and the turns mapped to Gemini roles', async () => {
    const fetchMock = mockFetch({
      json: async () => ({ candidates: [{ content: { parts: [{ text: 'VYOMA covers four modules.' }] } }] })
    });
    const out = await service({ GEMINI_API_KEY: 'secret', GEMINI_MODEL: 'test-model' }).reply([
      user('What is VYOMA?'),
      assistant('An aviation platform.'),
      user('And logistics?')
    ]);
    expect(out).toEqual({ reply: 'VYOMA covers four modules.' });

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe('https://generativelanguage.googleapis.com/v1beta/models/test-model:generateContent');
    expect(String(url)).not.toContain('secret');
    expect(init.headers['x-goog-api-key']).toBe('secret');
    const body = JSON.parse(init.body);
    expect(body.systemInstruction.parts[0].text).toContain('VYOMA website assistant');
    expect(body.contents.map((c: { role: string }) => c.role)).toEqual(['user', 'model', 'user']);
  });

  it('only forwards the most recent turns', async () => {
    const fetchMock = mockFetch({ json: async () => ({ candidates: [{ content: { parts: [{ text: 'ok' }] } }] }) });
    const many = Array.from({ length: 25 }, (_, i) => (i % 2 === 0 ? user(`q${i}`) : assistant(`a${i}`)));
    many.push(user('last'));
    await service({ GEMINI_API_KEY: 'k' }).reply(many);
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.contents).toHaveLength(10);
    expect(body.contents.at(-1).parts[0].text).toBe('last');
  });

  it('rejects a conversation that does not end with a visitor message', async () => {
    mockFetch({});
    await expect(service({ GEMINI_API_KEY: 'k' }).reply([user('hi'), assistant('hello')])).rejects.toBeInstanceOf(BadGatewayException);
  });

  it('hides upstream error details from the visitor', async () => {
    mockFetch({ ok: false, status: 429, text: async () => 'quota exceeded for key AIza-secret' });
    const err = await service({ GEMINI_API_KEY: 'k' }).reply([user('hi')]).catch((e: Error) => e);
    expect(err).toBeInstanceOf(BadGatewayException);
    expect((err as Error).message).not.toContain('AIza');
  });

  it('tries the next model when one is over quota', async () => {
    const fn = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 429, text: async () => 'quota' })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ candidates: [{ content: { parts: [{ text: 'hello' }] } }] }) });
    vi.stubGlobal('fetch', fn);
    await expect(service({ GEMINI_API_KEY: 'k', GEMINI_MODEL: 'model-a' }).reply([user('hi')])).resolves.toEqual({ reply: 'hello' });
    expect(fn.mock.calls[0]![0]).toContain('model-a');
    expect(fn.mock.calls[1]![0]).not.toContain('model-a');
  });

  it('does not try other models when the key is rejected', async () => {
    const fn = vi.fn().mockResolvedValue({ ok: false, status: 403, text: async () => 'denied' });
    vi.stubGlobal('fetch', fn);
    await expect(service({ GEMINI_API_KEY: 'k' }).reply([user('hi')])).rejects.toBeInstanceOf(BadGatewayException);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('turns a network failure into a friendly error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNRESET')));
    await expect(service({ GEMINI_API_KEY: 'k' }).reply([user('hi')])).rejects.toBeInstanceOf(BadGatewayException);
  });

  it('falls back to a safe message when the model returns no text', async () => {
    mockFetch({ json: async () => ({ candidates: [], promptFeedback: { blockReason: 'SAFETY' } }) });
    const out = await service({ GEMINI_API_KEY: 'k' }).reply([user('hi')]);
    expect(out.reply).toContain('book a demo');
  });
});
