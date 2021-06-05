/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  plugins: ['@snowpack/plugin-dotenv', '@snowpack/plugin-typescript'],
  mount: {
    public: '/',
    src: '/_dist_',
  },
  devOptions: {
    open: 'none',
  },
  buildOptions: {
    baseUrl: process.env.CI ? '/webgame-template' : '/',
    // sourcemap: 'inline',
  },
  packageOptions: {},
  optimize: {
    treeshake: true,
    preload: true,
    minify: true,
    target: 'es2017',
  },
};
