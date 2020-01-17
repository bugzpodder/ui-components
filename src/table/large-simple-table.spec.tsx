import React from "react";
import mockConsole from "jest-mock-console";
import { LargeSimpleTable } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";
import { columns, data, tableOptions } from "./utilities/test-table-properties";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render large simple table", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable columns={columns} data={data} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large simple table with set row height", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        rowHeight={75}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

// FIXME(nsawas): It seems like the table contents are not rendered initially.
// This test fails due to not calling `mockRowHeight`, since there are no rows
// To begin with. `react-virtualized` is a bit of a problem. Need to revisit.
test.skip("render large simple table with dynamic row height", () => {
  const mockRowHeight = jest.fn((_, index) => index * 50);
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        rowHeight={mockRowHeight}
      />
    </TestWrapper>,
  );
  expect(mockRowHeight).toBeCalled();
  expect(container).toMatchSnapshot();
});

test("render large simple table with no results", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable columns={columns} data={[]} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render loading simple table", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable columns={columns} data={data} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large simple table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable columns={columns} data={[]} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large simple table with all items selected", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
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
});

test("render full simple table", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
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

test("render large wide simple table", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable isWide columns={columns} data={data} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large wide simple table with set row height", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        isWide
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        rowHeight={75}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large wide simple table with dynamic row height", () => {
  const mockRowHeight = jest.fn((_, index) => index * 50);
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        isWide
        idKey="columnOne"
        columns={columns}
        data={data}
        tableOptions={tableOptions}
        rowHeight={mockRowHeight}
      />
    </TestWrapper>,
  );
  expect(mockRowHeight).toBeCalled();
  expect(container).toMatchSnapshot();
});

test("render large wide simple table with no results", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable isWide columns={columns} data={[]} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render loading simple table", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable isWide columns={columns} data={data} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large wide simple table with no results and is loading", () => {
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable isWide columns={columns} data={[]} isLoading />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render large wide simple table with all items selected", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        isWide
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
});

test("render full simple table", () => {
  const mockSelect = jest.fn();
  const { container } = render(
    <TestWrapper>
      <LargeSimpleTable
        isWide
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

/**
 Fail Cases
 */

test("throw invalid simple table error", async () => {
  mockConsole();
  expect(() => render(<LargeSimpleTable columns={columns} />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw invalid selectedRows error", () => {
  mockConsole();
  expect(() =>
    render(
      <LargeSimpleTable columns={columns} data={data} onSelect={() => {}} />,
    ),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
