const package = require('./package.json');
process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION = package.version;
process.env.SNOWPACK_PUBLIC_SERVICE_WORKER = 'sw.js';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-postcss',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          const { glob } = require("glob");
          const { InjectManifest } = require('workbox-webpack-plugin');
          const webpack = require('webpack')
          const additionalManifestEntries = [
            ...glob.sync("*.{png,html,json,txt}", { cwd: './build' })
          ].map((e) => ({ url: e, revision: process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION }));

          config.plugins.push(
            new webpack.DefinePlugin({
              __SNOWPACK_ENV__: JSON.stringify({
                MODE: 'production',
                NODE_ENV: 'production',
                SSR: false
              })
            })
          );

          config.plugins.push(
            new InjectManifest({
              "mode": "development",
              "additionalManifestEntries": additionalManifestEntries,
              "swSrc": "./dist/serviceWorker.js",
              "swDest": process.env.SNOWPACK_PUBLIC_SERVICE_WORKER
            })
          );

          return config;
        },
      },
    ]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { "match": "routes", "src": ".*", "dest": "/index.html" },
  ],
  alias: {
    // Type 2: Local Directory Import Alias (relative to cwd)
    components: './src/components',
    src: './src',
  },
  optimize: {
    // bundle: true,
    minify: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    /* ... */
  },
};