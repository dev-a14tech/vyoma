// Entry point (Vercel looks for src/main.ts).
//
// Prefers the self-contained bundle built by `pnpm build:bundle` (server.bundle.cjs): it has
// every dependency inlined, so it runs even where node_modules is not shipped. If the
// bundle is missing (local `nest start`, tests) it runs the app from source instead.
let started = false;
try {
  require('./server.bundle.cjs');
  started = true;
} catch (err) {
  if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') throw err;
}
if (!started) require('./server');
