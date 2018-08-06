// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { PagedTable } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";
import {
  columns,
  data,
  headerActions,
  invalidColumns,
  invalidTableOptions,
  tableOptions,
} from "./utilities/test-table-properties";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render simple paged table", () => {
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

test("render paged table with no selected items", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <PagedTable
        columns={columns}
        data={data}
        onSelect={mockSelect}
        selectedRows={[]}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render full paged table", () => {
  const mockPagination = jest.fn();
  const mockSelect = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <PagedTable
        title="Test Table"
        idKey="columnOne"
        columns={columns}
        data={data}
        headerActions={headerActions}
        tableOptions={tableOptions}
        onPageChange={mockPagination}
        onSelect={mockSelect}
        selectedRows={tableOptions.selectedRowIds}
      />
    </TestWrapper>,
  );
  expect(getByTestId("card-header")).toHaveTextContent("Test Table (1 Selected)");
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
