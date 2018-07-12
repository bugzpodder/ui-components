// @flow
import React from "react";
import { renderIntoDocument } from "react-testing-library";
import "jest-dom/extend-expect";
import mockConsole from "jest-mock-console";
import { TestWrapper } from "../utils";
import { columns, data, invalidColumns, tableOptions } from "./utilities/test-table-properties";
import { SimpleTable } from "./index";

/**
 Passing Cases
 **/

test("render simple table", () => {
	const { container } = renderIntoDocument(
		<TestWrapper>
			<SimpleTable
				columns={columns}
				data={data} />
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render simple table with no results", () => {
	const { container } = renderIntoDocument(
		<TestWrapper>
			<SimpleTable
				columns={columns}
				data={[]} />
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render loading simple table", () => {
	const { container } = renderIntoDocument(
		<TestWrapper>
			<SimpleTable
				columns={columns}
				data={data}
				isLoading={true} />
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render simple table with no results and is loading", () => {
	const { container } = renderIntoDocument(
		<TestWrapper>
			<SimpleTable
				columns={columns}
				data={[]}
				isLoading={true} />
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render simple table with all items selected", () => {
	const mockSelect = jest.fn();
	const { container } = renderIntoDocument(
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
});

test("render full simple table", () => {
	const mockSelect = jest.fn();
	const { container } = renderIntoDocument(
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

/**
 Fail Cases
 **/

test("throw invalid simple table error", async () => {
	mockConsole();
	expect(() => renderIntoDocument(<SimpleTable columns={columns} />)).toThrowError();
	expect(console.error).toHaveBeenCalled();
});

test("throw invalid columns error", () => {
	mockConsole();
	expect(() => renderIntoDocument(<SimpleTable
		columns={invalidColumns}
		data={data} />)).toThrowError();
	expect(console.error).toHaveBeenCalled();
});

test("throw invalid sortOptions error", () => {
	mockConsole();
	expect(() => renderIntoDocument(<SimpleTable
		columns={columns}
		data={data}
		onSort={() => {}} />)).toThrowError();
	expect(console.error).toHaveBeenCalled();
});

test("throw invalid selectedRows error", () => {
	mockConsole();
	expect(() => renderIntoDocument(<SimpleTable
		columns={columns}
		data={data}
		onSelect={() => {}} />)).toThrowError();
	expect(console.error).toHaveBeenCalled();
});
