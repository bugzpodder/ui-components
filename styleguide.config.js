const path = require("path");
const fs = require("fs");

module.exports = {
  components: "src/**/*.jsx",
  pagePerSection: true,
  sections: [
    {
      name: "Getting Started on Components",
      content: "README.md",
    },
    {
      name: "Getting Started on Lib",
      content: "../lib/README.md",
    },
    {
      name: "Changelog for Components",
      content: "CHANGELOG.md",
    },
    {
      name: "Changelog for Lib",
      content: "../lib/CHANGELOG.md",
    },
    {
      name: "Wrappers",
      components: () => ["./src/style-wrapper/style-wrapper.jsx", "./src/date-input/picker-util-provider-hoc.jsx"],
    },
    {
      name: "Text & Inputs",
      components: () => [
        "./src/date-input/date-input.jsx",
        "./src/date-input/date-time-input.jsx",
        "./src/readonly-text-field/readonly-text-field.jsx",
        "./src/readonly-text-field/validated-readonly-text-field.jsx",
        "./src/text-input/text-input.jsx",
        "./src/two-column-grid/two-column-grid.jsx",
      ],
    },
    {
      name: "Selectors & Buttons",
      components: () => [
        "./src/common-switch/common-switch.jsx",
        "./src/external-link/external-link.jsx",
        "./src/external-link-button/external-link-button.jsx",
        "./src/selector/selector.jsx",
      ],
    },
    {
      name: "Simple Components",
      components: () => [
        "./src/alert/alert.jsx",
        "./src/common-card/card.jsx",
        "./src/common-panel/panel.jsx",
        "./src/spinner-overlay/spinner-overlay.jsx",
      ],
    },
    {
      name: "Interactive Components",
      components: () => [
        "./src/common-dialog/dialog.jsx",
        "./src/common-dialog/multi-page-dialog.jsx",
        "./src/tabbed-card/tabbed-card.jsx",
        "./src/avatar-icon/avatar-icon.jsx",
        "./src/common-select/common-select.jsx",
        "./src/common-select/common-multi-select.jsx",
        "./src/notification-center/notification-center.jsx",
        "./src/navbar/navbar.jsx",
        "./src/omni-search-bar/omni-chips.jsx",
        "./src/omni-search-bar/omni-search-bar.jsx",
        "./src/table/paged-table.jsx",
        "./src/table/simple-table.jsx",
        "./src/timeline-graph/timeline-graph.jsx",
        "./src/timeline-graph/timeline-card.jsx",
      ],
    },
  ],
  require: [path.join(__dirname, "..", "lims/client/public/material/material.css")],
  usageMode: "expand",
  exampleMode: "expand",
  skipComponentsWithoutExample: true,
  ignore: [
    "components/utils",
    "**/__tests__/**",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.d.ts",
  ],
  updateExample(props, exampleFilePath) {
    if (typeof props.settings.file === "string") {
      const {
        settings: { file },
      } = props;
      delete props.settings.file;
      const filePath = path.resolve(exampleFilePath, "..", file);
      props.content = fs.readFileSync(filePath, { encoding: "utf-8" });
    }

    props.settings.showCode = props.content.length <= 300;
    return props;
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
        },
        {
          test: /\.module\.scss$/,
          loader: "style-loader!css-loader?modules!sass-loader",
        },

        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          loader: "style-loader!css-loader!sass-loader",
        },
        {
          test: /\.woff2$/,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            limit: 50000,
          },
        },
      ],
    },
  },
};
