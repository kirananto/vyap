/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    source: { url: '/' },
  },
  plugins: [
    ['@snowpack/plugin-webpack'],
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-typescript',
  ],
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  alias: {
    'components': './source/components',
  },
};
