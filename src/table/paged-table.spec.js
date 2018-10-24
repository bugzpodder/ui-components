// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { PagedTable } from "./index";
import { TestWrapper } from "../utils";
import {
  allSelectedRows,
  columns,
  data,
  headerActions,
  invalidColumns,
  invalidTableOptions,
  tableOptions,
} from "./utilities/test-table-properties";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
const bodyUtils = bindElementToQueries(document.body);

/**
 Passing Cases
 */

test("render basic paged table", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={data}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render paged table with no results", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={[]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render loading paged table", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={data}
        isLoading
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render paged table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={[]}
        isLoading
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render paged table with no initially selected items, then select items", () => {
  const mockSelect = jest.fn(result => result);
  const { container } = render(
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
  fireEvent.click(bodyUtils.getByTestId("table-checkbox-cell-first-datum"));
  expect(mockSelect.mock.results[0].value).toEqual(["First Datum"]);
  fireEvent.click(bodyUtils.getByTestId("table-checkbox-header"));
  expect(mockSelect.mock.results[1].value).toEqual(allSelectedRows);
  expect(container).toMatchSnapshot();
});

test("render paged table with all items selected, then unselect items", () => {
  const mockSelect = jest.fn(result => result);
  const { container } = render(
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
  fireEvent.click(bodyUtils.getByTestId("table-checkbox-cell-first-datum"));
  expect(mockSelect.mock.results[0].value).toEqual(allSelectedRows.slice(1, allSelectedRows.length));
  fireEvent.click(bodyUtils.getByTestId("table-checkbox-header"));
  expect(mockSelect.mock.results[1].value).toEqual([]);
  expect(container).toMatchSnapshot();
});

test("render paged table with default ids, and test row highlighting", () => {
  const mockSelect = jest.fn();
  const mockHandleHighlight = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={data}
        onSelect={mockSelect}
        selectedRows={[]}
        highlightedRowId={1}
        onHighlightRow={mockHandleHighlight}
      />
    </TestWrapper>,
  );
  fireEvent.keyDown(bodyUtils.getByTestId("table"), {
    key: "up",
    keyCode: 38,
    which: 38,
  });
  expect(container).toMatchSnapshot();
});

test("render paged table and test pagination", () => {
  const pagedData = data.slice(tableOptions.offset, tableOptions.offset + (tableOptions.count + 1));
  const mockPagination = jest.fn(result => result);
  const mockSelect = jest.fn(result => result);
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
  expect(getByTestId("card-header")).toHaveTextContent("Test Table (2 Selected)");
  fireEvent.click(bodyUtils.getByTestId("next-page"));
  expect(mockPagination.mock.results[0].value).toEqual({ offset: 5, count: 5 });
  // TODO(nsawas): TypeError: _this.inputRef.focus is not a function
  // fireEvent.click(bodyUtils.getByTestId("rows-per-page"));
  expect(container).toMatchSnapshot();
});

test("render paged table and test sorting", () => {
  const mockSort = jest.fn(result => result);
  const { container } = render(
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
  fireEvent.click(bodyUtils.getByTestId("sort-columnOne"));
  expect(mockSort.mock.results[0].value).toEqual({ sortOptions: [{ id: "columnOne", desc: true }] });
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
  expect(() => render(<PagedTable
    columns={invalidColumns}
    data={data}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid pagination prop error", () => {
  const mockPagination = jest.fn();
  mockConsole();
  expect(() => render(<PagedTable
    columns={columns}
    data={data}
    onPageChange={mockPagination}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid pagination options error", () => {
  mockConsole();
  expect(() =>
    render(<PagedTable
      columns={columns}
      data={data}
      onPageChange={() => {}}
      tableOptions={invalidTableOptions}
    />),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid sortOptions error", () => {
  mockConsole();
  expect(() => render(<PagedTable
    columns={columns}
    data={data}
    onSort={() => {}}
  />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
