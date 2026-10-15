// Bundles the API into one self-contained CommonJS file: src/main.cjs.
//
// src/main.cjs IS the Vercel entry point (Vercel looks for src/main.{js,cjs,ts,...}). Being
// plain CommonJS with every dependency inlined, Vercel neither has to compile it (its
// compile step wrote ESM-flavoured .cjs files that could not require() the ESM-only Nest
// packages) nor ship node_modules. Source of truth: src/server.ts.
//
// Why: on Vercel the API function was missing its node_modules at run time
// ("Cannot find module '@nestjs/core'"), and Nest 12 is ESM-only, which makes loading it
// from CommonJS fragile. A single file with every dependency inlined needs neither.
//
// Only packages Nest loads lazily and the app never uses stay external.
//
// The output IS COMMITTED: Vercel's build did not reliably run this step, and without the
// file the function falls back to running from source and dies on require() of the
// ESM-only Nest packages ("ERR_REQUIRE_ESM"). Re-run `pnpm --filter api build:bundle`
// and commit src/main.cjs whenever API code or API dependencies change.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);

const OPTIONAL = [
  '@nestjs/microservices',
  '@nestjs/websockets',
  '@nestjs/platform-socket.io',
  '@nestjs/platform-fastify',
  '@fastify/static',
  '@fastify/view',
  'swagger-ui-dist',
  'class-transformer/storage',
];

// @nestjs/mongoose does `import * as mongoose from 'mongoose'` and calls
// mongoose.createConnection(). In a bundle that namespace is a copy of the Mongoose
// instance with getter-only properties, and Mongoose then fails with "Cannot set property
// nextConnectionId of #<Mongoose> which has only a getter". Give @nestjs/mongoose a plain
// ES-module facade instead (its `this` is then not a Mongoose, so Mongoose uses the real
// singleton).
const mongooseKeys = Object.keys(require('mongoose')).filter((k) => /^[A-Za-z_$][\w$]*$/.test(k) && k !== 'default');
const mongooseFacade = [
  "import m from 'mongoose';",
  'export default m;',
  ...mongooseKeys.map((k) => `export const ${k} = m.${k};`),
].join('\n');

const mongooseFacadePlugin = {
  name: 'mongoose-facade',
  setup(b) {
    b.onResolve({ filter: /^mongoose$/ }, (args) =>
      /@nestjs[\\/]mongoose/.test(args.importer) ? { path: 'mongoose-facade', namespace: 'mongoose-facade' } : undefined,
    );
    b.onLoad({ filter: /.*/, namespace: 'mongoose-facade' }, () => ({
      contents: mongooseFacade,
      loader: 'js',
      resolveDir: process.cwd(),
    }));
  },
};

// `node scripts/bundle.mjs --check` rebuilds in memory and fails if the committed
// src/main.cjs is out of date with the sources (run it before pushing API changes).
const checkOnly = process.argv.includes('--check');

const result = await build({
  entryPoints: ['src/server.ts'],
  outfile: 'src/main.cjs',
  write: !checkOnly,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  // Whitespace/syntax only: identifiers must keep their names (Mongoose derives collection
  // names from the model class names, e.g. Admin -> admins).
  minifyWhitespace: true,
  minifySyntax: true,
  keepNames: true,
  sourcemap: false,
  // The ESM-only Nest packages use import.meta.url; in a CommonJS bundle it is empty, so
  // point it at the bundle file itself.
  define: { 'import.meta.url': '__import_meta_url' },
  banner: { js: "const __import_meta_url = require('node:url').pathToFileURL(__filename).href;" },
  external: [...OPTIONAL, ...OPTIONAL.map((p) => `${p}/*`)],
  plugins: [mongooseFacadePlugin],
  logLevel: 'info',
});

if (checkOnly) {
  const fresh = result.outputFiles[0].text;
  const committed = readFileSync('src/main.cjs', 'utf8');
  if (fresh !== committed) {
    console.error('src/main.cjs is out of date. Run: pnpm --filter api build:bundle  (then commit it)');
    process.exit(1);
  }
  console.log('src/main.cjs is up to date.');
}
