const path = require("path");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const tsdocgen = require("react-docgen-typescript");

module.exports = {
  components: "src/**/*.tsx",
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
        "./src/style-wrapper/style-wrapper.tsx",
        "./src/date-input/picker-util-provider-hoc.tsx",
      ],
    },
    {
      name: "Text & Inputs",
      components: () => [
        "./src/date/date-input.tsx",
        "./src/date/date-time-input.tsx",
        "./src/date/date-value.tsx",
        "./src/date/date-time-value.tsx",
        "./src/date/humanized-date-time.tsx",
        "./src/date/time-input.tsx",
        "./src/readonly-text-field/readonly-text-field.tsx",
        "./src/readonly-text-field/validated-readonly-text-field.tsx",
        "./src/text-input/v1/text-input.tsx",
        "./src/text-input/v2/text-input.tsx",
        "./src/filled-text-input/filled-text-input.tsx",
        "./src/two-column-grid/two-column-grid.tsx",
        "./src/upload-button/upload-button.tsx",
      ],
    },
    {
      name: "Switches, Buttons & Links",
      components: () => [
        "./src/common-switch/common-switch.tsx",
        "./src/link/external-link.tsx",
        "./src/link/external-link-button.tsx",
        "./src/link/link-button.tsx",
      ],
    },
    {
      name: "Simple Components",
      components: () => [
        "./src/alert/alert.tsx",
        "./src/common-card/card.tsx",
        "./src/common-panel/panel.tsx",
        "./src/sign-in-page/sign-in-page.tsx",
        "./src/spinner-overlay/spinner-overlay.tsx",
        "./src/page/page-v2/common-page-v2.tsx",
      ],
    },
    {
      name: "Interactive Components",
      components: () => [
        "./src/common-dialog/dialog.tsx",
        "./src/common-dialog/multi-page-dialog.tsx",
        "./src/page/page-v2/common-tabbed-page-v2.tsx",
        "./src/avatar-icon/avatar-icon.tsx",
        "./src/common-select/common-select.tsx",
        "./src/common-select/common-multi-select.tsx",
        "./src/common-suggest/common-suggest.tsx",
        "./src/common-dropdown/dropdown-menu.tsx",
        "./src/export-button/export-button.tsx",
        "./src/notification-center/notification-center.tsx",
        "./src/navbar/navbar.tsx",
        "./src/omni-search-bar/omni-chips.tsx",
        "./src/omni-search-bar/omni-search-bar.tsx",
        "./src/table/paged-table.tsx",
        "./src/selection-grid/selection-grid.tsx",
        "./src/table/simple-table.tsx",
        "./src/table/large-simple-table.tsx",
        "./src/timeline-graph/timeline-graph.tsx",
        "./src/timeline-graph/timeline-card.tsx",
        "./src/timeline-graph/tabbed-timeline-card.tsx",
        "./src/pdf-viewer/pdf-viewer.tsx",
      ],
    },
  ],
  propsParser: tsdocgen.withCustomConfig("./tsconfig.json").parse,
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
};
