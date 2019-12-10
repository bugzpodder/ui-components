import "@testing-library/jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { SimpleTable } from ".";
import { TestWrapper } from "../test-utils";
import {
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  columns,
  data,
  invalidColumns,
  tableOptions,
} from "./utilities/test-table-properties";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render simple table", () => {
  const { container, getByText } = render(
    <TestWrapper>
      <SimpleTable columns={columns} data={data} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByText("Column One")).toHaveAttribute(
    "style",
    "padding-left: 20px;",
  );
});

test("render simple table with no results", () => {
  const { container, getByText } = render(
    <TestWrapper>
      <SimpleTable paddingLeft={100} columns={columns} data={[]} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByText("Column One")).toHaveAttribute(
    "style",
    "padding-left: 100px;",
  );
});

test("render loading simple table", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable columns={columns} data={data} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <SimpleTable columns={columns} data={[]} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with all items selected", () => {
  const mockSelect = jest.fn();
  const { container, getByText } = render(
    <TestWrapper>
      <SimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        onSelect={mockSelect}
        selectedRows={[...tableOptions.selectedRowIds, "Second Datum"]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByText("Column One")).not.toHaveAttribute("style");
});

test("render full simple table", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <SimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        onSelect={mockSelect}
        selectedRows={tableOptions.selectedRowIds}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render simple table with column visibility chooser", async () => {
  const { container, getByTestId, queryByTestId, queryByText } = render(
    <TestWrapper>
      <SimpleTable
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        hasColumnVisibilityChooser
      />
    </TestWrapper>,
  );
  expect(queryByText("Second Datum")).toBeVisible();
  expect(
    queryByTestId("column-visibility-chooser-popover"),
  ).not.toBeInTheDocument();
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("column-visibility-chooser-button"));
  expect(getByTestId("column-visibility-chooser-popover")).toBeVisible();
  expect(container).toMatchSnapshot();
  expect(
    getByTestId("column-visibility-chooser-popover-apply-button"),
  ).toBeDisabled();
  expect(getByTestId("column-item-checkbox-1")).toHaveAttribute("checked", "");
  fireEvent.click(getByTestId("column-item-checkbox-1"));
  await wait(() => {
    expect(
      getByTestId("column-visibility-chooser-popover-apply-button"),
    ).not.toBeDisabled();
  });
  // Since we haven't clicked "Apply" yet, expect data to still be visible.
  expect(queryByText("Second Datum")).toBeVisible();
  fireEvent.click(
    getByTestId("column-visibility-chooser-popover-apply-button"),
  );
  await waitForElementToBeRemoved(() =>
    queryByTestId("column-visibility-chooser-popover"),
  );
  expect(queryByText("Second Datum")).not.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

/**
 Fail Cases
 */

test("throw invalid simple table error", async () => {
  mockConsole();
  expect(() => render(<SimpleTable columns={columns} />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid columns error", () => {
  mockConsole();
  expect(() =>
    render(<SimpleTable columns={invalidColumns} data={data} />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid sortOptions error", () => {
  mockConsole();
  expect(() =>
    render(<SimpleTable columns={columns} data={data} onSort={() => {}} />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid selectedRows error", () => {
  mockConsole();
  expect(() =>
    render(<SimpleTable columns={columns} data={data} onSelect={() => {}} />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
