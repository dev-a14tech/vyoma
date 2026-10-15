// Bundles the API into one self-contained CommonJS file (src/server.bundle.cjs), next to
// src/main.ts so Vercel ships it beside the compiled entry point.
//
// Why: on Vercel the API function was missing its node_modules at run time
// ("Cannot find module '@nestjs/core'"), and Nest 12 is ESM-only, which makes loading it
// from CommonJS fragile. A single file with every dependency inlined needs neither.
//
// Only packages Nest loads lazily and the app never uses stay external.
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

await build({
  entryPoints: ['src/server.ts'],
  outfile: 'src/server.bundle.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  sourcemap: false,
  // The ESM-only Nest packages use import.meta.url; in a CommonJS bundle it is empty, so
  // point it at the bundle file itself.
  define: { 'import.meta.url': '__import_meta_url' },
  banner: { js: "const __import_meta_url = require('node:url').pathToFileURL(__filename).href;" },
  external: [...OPTIONAL, ...OPTIONAL.map((p) => `${p}/*`)],
  plugins: [mongooseFacadePlugin],
  logLevel: 'info',
});
