import React from "react";
import mockConsole from "jest-mock-console";
import { PagedTable } from ".";
import { TestWrapper } from "../test-utils";
import {
  allSelectedRows,
  columns,
  data,
  headerActions,
  invalidColumns,
  invalidTableOptions,
  tableOptions,
} from "./utilities/test-table-properties";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render basic paged table", () => {
  mockConsole();
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable title="Test Table" columns={columns} data={data} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("export-button")).toBeInTheDocument();
  expect(getByTestId("export-button")).toHaveTextContent("Export");
  fireEvent.click(getByTestId("export-button"));
  expect(getByTestId("export-modal")).toBeInTheDocument();
});

test("render paged table with no results", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable title={4} columns={columns} data={[]} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render loading paged table", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable columns={columns} data={data} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("spinner-overlay")).toHaveAttribute(
    "data-is-active",
    "true",
  );
});

test("render paged table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable columns={columns} data={[]} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render paged table with no results and isFullBleed, noMargin", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={[]}
        isFullBleed
        hasTableMargin={false}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render paged table with no initially selected items, then select items", () => {
  const mockSelect = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        idKey="columnOne"
        columns={columns}
        data={data}
        onSelect={mockSelect}
        selectedRows={[]}
      />
    </TestWrapper>,
  );
  // TODO(nsawas): find out why these get called twice.
  fireEvent.click(getByTestId("table-checkbox-cell-first-datum"));
  expect(mockSelect.mock.results[0].value).toEqual(["First Datum"]);
  fireEvent.click(getByTestId("table-checkbox-header"));
  expect(mockSelect.mock.results[1].value).toEqual(allSelectedRows);
  expect(container).toMatchSnapshot();
});

test("render paged table with all items selected, then unselect items", () => {
  const mockSelect = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        idKey="columnOne"
        columns={columns}
        data={data}
        onSelect={mockSelect}
        classes={{ rows: () => "test-row-classname" }}
        selectedRows={allSelectedRows}
      />
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("table-checkbox-cell-first-datum"));
  expect(mockSelect.mock.results[0].value).toEqual(
    allSelectedRows.slice(1, allSelectedRows.length),
  );
  fireEvent.click(getByTestId("table-checkbox-header"));
  expect(mockSelect.mock.results[1].value).toEqual([]);
  expect(container).toMatchSnapshot();
});

test("render paged table with default ids, and test row highlighting", () => {
  const mockSelect = jest.fn();
  const mockHandleHighlight = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={data}
        onSelect={mockSelect}
        selectedRows={[]}
        highlightedRowId={1}
        onHighlightRow={mockHandleHighlight}
        includeExportButton={false}
      />
    </TestWrapper>,
  );
  fireEvent.keyDown(getByTestId("table"), {
    key: "up",
    keyCode: 38,
    which: 38,
  });
  expect(container).toMatchSnapshot();
});

test("render paged table and test pagination", () => {
  const pagedData = data.slice(
    tableOptions.offset,
    tableOptions.offset + (tableOptions.count + 1),
  );
  const mockPagination = jest.fn((result) => result);
  const mockSelect = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        title="Test Table"
        idKey="columnOne"
        columns={columns}
        data={pagedData}
        headerActions={headerActions}
        tableOptions={tableOptions}
        onPageChange={mockPagination}
        onSelect={mockSelect}
        selectedRows={tableOptions.selectedRowIds}
      />
    </TestWrapper>,
  );
  expect(getByTestId("card-header")).toHaveTextContent(
    "Test Table (2 Selected)",
  );
  expect(getByTestId("card-footer-actions")).toHaveTextContent(
    "Rows per page:5Showing 1 to 5 of 100",
  );
  fireEvent.click(getByTestId("next-page"));
  expect(mockPagination.mock.results[0].value).toEqual({ offset: 5, count: 5 });
  // TODO(nsawas): TypeError: _this.inputRef.focus is not a function
  // fireEvent.click(bodyUtils.getByTestId("rows-per-page"));
  expect(container).toMatchSnapshot();
});

test("render paged table and test sorting", () => {
  const mockSort = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        onSort={mockSort}
      />
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("sort-columnOne"));
  expect(mockSort.mock.results[0].value).toEqual({
    sortOptions: [{ id: "columnOne", desc: true }],
  });
  expect(container).toMatchSnapshot();
});

test("render paged table with column visibility chooser", async () => {
  const { container, getByTestId, queryByTestId, queryByText } = render(
    <TestWrapper>
      <PagedTable
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
  await waitFor(() => {
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

test("throw invalid paged table error", async () => {
  mockConsole();
  expect(() => render(<PagedTable columns={columns} />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid columns error", () => {
  mockConsole();
  expect(() =>
    render(<PagedTable columns={invalidColumns} data={data} />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid pagination prop error", () => {
  const mockPagination = jest.fn();
  mockConsole();
  expect(() =>
    render(
      <PagedTable
        columns={columns}
        data={data}
        onPageChange={mockPagination}
      />,
    ),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid pagination options error", () => {
  mockConsole();
  expect(() =>
    render(
      <PagedTable
        columns={columns}
        data={data}
        onPageChange={() => {}}
        tableOptions={invalidTableOptions as any}
      />,
    ),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid sortOptions error", () => {
  mockConsole();
  expect(() =>
    render(<PagedTable columns={columns} data={data} onSort={() => {}} />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
