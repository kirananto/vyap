/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    source: { url: '/' },
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-postcss',
    ['@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  alias: {
    components: './source/components',
    pages: './source/Pages',
  },
};
