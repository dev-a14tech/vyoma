// Entry point (Vercel looks for src/main.ts).
//
// Prefers the self-contained bundle built by `pnpm build:bundle` (server.bundle.cjs): it has
// every dependency inlined, so it runs even where node_modules is not shipped. If the
// bundle is missing (local `nest start`, tests) it runs the app from source instead.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function startFromBundle(): boolean {
  // Literal path first: it is what Vercel's file tracing follows to include the bundle.
  try {
    require('./server.bundle.cjs');
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') throw err;
  }

  // Not found next to this file: look where the monorepo layout could have put it.
  for (const dir of [__dirname, join(process.cwd(), 'apps/api/src'), join(process.cwd(), 'src')]) {
    const file = join(dir, 'server.bundle.cjs');
    if (existsSync(file)) {
      require(file);
      return true;
    }
  }

  // Visible in the runtime logs, so a missing bundle is diagnosable instead of a mystery.
  const ls = (dir: string) => {
    try {
      return readdirSync(dir).slice(0, 40).join(', ');
    } catch {
      return '(unreadable)';
    }
  };
  console.error(`[boot] server.bundle.cjs not found. __dirname=${__dirname} cwd=${process.cwd()}`);
  console.error(`[boot] ls __dirname: ${ls(__dirname)}`);
  console.error(`[boot] ls cwd: ${ls(process.cwd())}`);
  return false;
}

if (!startFromBundle()) require('./server');
