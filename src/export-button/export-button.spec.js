// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { ExportButton } from "./export-button";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

/**
 Passing Cases
 */

const data = [
  {
    columnOne: "First Datum",
    columnTwo: "Second Datum",
    columnThree: "Third Datum",
  },
  {
    columnOne: "Fourth Datum",
    columnTwo: "Fifth Datum",
    columnThree: "Sixth Datum",
  },
  {
    columnOne: "Seventh Datum",
    columnTwo: "Eighth Datum",
    columnThree: "Ninth Datum",
  },
  {
    columnOne: "Tenth Datum",
    columnTwo: "Eleventh Datum",
    columnThree: "Twelfth Datum",
  },
  {
    columnOne: "Thirteenth Datum",
    columnTwo: "Fifteenth Datum",
    columnThree: "Sixteenth Datum",
  },
  {
    columnOne: "Seventeenth Datum",
    columnTwo: "Eighteenth Datum",
    columnThree: "Ninteenth Datum",
  },
];

const columns = [
  {
    exportHeaderName: "Column One",
    exportAccessor: "columnOne",
  },
  {
    exportHeaderName: "Column Two",
    exportAccessor: "columnTwo",
  },
  {
    exportHeaderName: "Column 3",
    exportAccessor: (instance: Object) => instance.columnThree,
  },
];

test("render export table button", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExportButton
        columns={columns}
        visibleRows={data}
        filenamePrefix="example-data"
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
});

test("render export table button and click modal options", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExportButton
        columns={columns}
        visibleRows={data}
        filenamePrefix="example-data"
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
  expect(getByTestId("comma-delimiter-radio-option")).toBeInTheDocument();
  fireEvent.click(getByTestId("comma-delimiter-radio-option"));
  expect(getByTestId("download-button")).toBeInTheDocument();
});

test("render export table button as part of a paged table without selectable rows or fetchBulkExportRows", () => {
  const { container, getByTestId, queryByTestId } = render(
    <TestWrapper>
      <ExportButton
        columns={columns}
        visibleRows={data}
        filenamePrefix="example-data"
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
  expect(getByTestId("comma-delimiter-radio-option")).toBeInTheDocument();
  fireEvent.click(getByTestId("comma-delimiter-radio-option"));
  // Expect no options to show up since only one is possible.
  expect(queryByTestId("visible-rows-data-source-radio-option")).not.toBeInTheDocument();
  expect(queryByTestId("bulk-rows-data-source-radio-option")).not.toBeInTheDocument();
  expect(queryByTestId("selected-rows-data-source-radio-option")).not.toBeInTheDocument();
  expect(getByTestId("download-button")).toBeEnabled();
  fireEvent.click(getByTestId("download-button"));
  // TODO(ecarrel): Figure out how to test that a file was downloaded.
});

test("render export table button as part of a paged table with selectable rows", () => {
  const { container, getByTestId, queryByTestId } = render(
    <TestWrapper>
      <ExportButton
        columns={columns}
        visibleRows={data}
        filenamePrefix="example-data"
        selectedRows={["First Datum", "Fourth Datum"]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
  expect(getByTestId("comma-delimiter-radio-option")).toBeInTheDocument();
  fireEvent.click(getByTestId("comma-delimiter-radio-option"));
  expect(getByTestId("download-button")).toBeDisabled();
  expect(getByTestId("visible-rows-data-source-radio-option")).toBeInTheDocument();
  expect(queryByTestId("bulk-rows-data-source-radio-option")).not.toBeInTheDocument();
  expect(getByTestId("selected-rows-data-source-radio-option")).toBeInTheDocument();
  fireEvent.click(getByTestId("selected-rows-data-source-radio-option"));
  expect(getByTestId("download-button")).not.toBeDisabled();
  fireEvent.click(getByTestId("download-button"));
  // TODO(ecarrel): Figure out how to test the file that was downloaded.
});

test("render export table button as part of a paged table with fetchBulkExportRows", () => {
  const { container, getByTestId, queryByTestId } = render(
    <TestWrapper>
      <ExportButton
        columns={columns}
        visibleRows={data}
        filenamePrefix="example-data"
        fetchBulkExportRows={async () => Promise.resolve(columns)}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
  expect(getByTestId("comma-delimiter-radio-option")).toBeInTheDocument();
  fireEvent.click(getByTestId("comma-delimiter-radio-option"));
  expect(getByTestId("download-button")).toBeDisabled();
  expect(getByTestId("visible-rows-data-source-radio-option")).toBeInTheDocument();
  expect(getByTestId("bulk-rows-data-source-radio-option")).toBeInTheDocument();
  expect(queryByTestId("selected-rows-data-source-radio-option")).not.toBeInTheDocument();
  fireEvent.click(getByTestId("bulk-rows-data-source-radio-option"));
  expect(getByTestId("download-button")).not.toBeDisabled();
  fireEvent.click(getByTestId("download-button"));
  // TODO(ecarrel): Figure out how to test the file that was downloaded.
});
