const postcss = require("rollup-plugin-postcss");
const simplevars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const cssnext = require("postcss-cssnext");
const cssnano = require("cssnano");

module.exports = {
  rollup(config) {
    config.plugins.push(
      postcss({
        modules: true,
        plugins: [
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano(),
        ],
      }),
    );
    return config;
  },
};
