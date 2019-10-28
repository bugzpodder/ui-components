// @flow
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
      name: "Changelog for Components",
      content: "CHANGELOG.md",
    },
    {
      name: "Wrappers",
      components: () => [
        "./src/style-wrapper/style-wrapper.jsx",
        "./src/date-input/picker-util-provider-hoc.jsx",
      ],
    },
    {
      name: "Text & Inputs",
      components: () => [
        "./src/date/date-input.jsx",
        "./src/date/date-time-input.jsx",
        "./src/date/date-value.jsx",
        "./src/date/date-time-value.jsx",
        "./src/date/humanized-date-time.jsx",
        "./src/date/time-input.jsx",
        "./src/readonly-text-field/readonly-text-field.jsx",
        "./src/readonly-text-field/validated-readonly-text-field.jsx",
        "./src/text-input/v1/text-input.jsx",
        "./src/text-input/v2/text-input.jsx",
        "./src/filled-text-input/filled-text-input.jsx",
        "./src/two-column-grid/two-column-grid.jsx",
        "./src/upload-button/upload-button.jsx",
      ],
    },
    {
      name: "Switches, Buttons & Links",
      components: () => [
        "./src/common-switch/common-switch.jsx",
        "./src/link/external-link.jsx",
        "./src/link/external-link-button.jsx",
        "./src/link/link-button.jsx",
      ],
    },
    {
      name: "Simple Components",
      components: () => [
        "./src/alert/alert.jsx",
        "./src/common-card/card.jsx",
        "./src/common-panel/panel.jsx",
        "./src/sign-in-page/sign-in-page.jsx",
        "./src/spinner-overlay/spinner-overlay.jsx",
        "./src/page/page-v2/common-page-v2.jsx",
      ],
    },
    {
      name: "Interactive Components",
      components: () => [
        "./src/common-dialog/dialog.jsx",
        "./src/common-dialog/multi-page-dialog.jsx",
        "./src/page/page-v2/common-tabbed-page-v2.jsx",
        "./src/avatar-icon/avatar-icon.jsx",
        "./src/common-select/common-select.jsx",
        "./src/common-select/common-multi-select.jsx",
        "./src/common-suggest/common-suggest.jsx",
        "./src/common-dropdown/dropdown-menu.jsx",
        "./src/export-button/export-button.jsx",
        "./src/notification-center/notification-center.jsx",
        "./src/navbar/navbar.jsx",
        "./src/omni-search-bar/omni-chips.jsx",
        "./src/omni-search-bar/omni-search-bar.jsx",
        "./src/table/paged-table.jsx",
        "./src/selection-grid/selection-grid.jsx",
        "./src/table/simple-table.jsx",
        "./src/table/large-simple-table.jsx",
        "./src/timeline-graph/timeline-graph.jsx",
        "./src/timeline-graph/timeline-card.jsx",
        "./src/timeline-graph/tabbed-timeline-card.jsx",
      ],
    },
  ],
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
          loader: require.resolve("babel-loader"),
        },
        {
          test: /\.css$/,
          loader: [
            require.resolve("style-loader"),
            require.resolve("css-loader"),
          ],
        },
        {
          test: /\.module\.scss$/,
          loader: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: { modules: true },
            },
            require.resolve("sass-loader"),
          ],
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          loader: [
            require.resolve("style-loader"),
            require.resolve("css-loader"),
            require.resolve("sass-loader"),
          ],
        },
        {
          test: /\.(woff2|gif|jpg|png|svg)$/,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            limit: 50000,
          },
        },
      ],
    },
    resolve: {
      alias: {
        "@grailbio/components": path.resolve(__dirname, "src"),
      },
    },
  },
};
