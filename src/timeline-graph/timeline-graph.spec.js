// @flow
import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import moment from "moment-timezone";
import { TestWrapper } from "../utils";
import { TimelineGraph } from "./index";

moment.tz.setDefault("America/Los_Angeles");

test("render timeline graph without date", () => {
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Test column"]],
					},
				]}
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render timeline graph with date", () => {
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Test column"]],
					},
				]}
				dateFormat={"YYYY-MM-DD"}
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render and select timeline graph with multiple rows", () => {
	const onSelectRow = jest.fn();
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Row 0, Column 0, Field 0"]],
					},
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Row 1, Column 0, Field 0"], ["Row 1, Column 1, Field 0", "Row 1, Column 1, Field 1"]],
					},
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Row 2, Column 0, Field 0"]],
					},
				]}
				dateFormat={"YYYY-MM-DD"}
				onSelectRow={onSelectRow}
				selectedRowIndex={2}
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
	[1, 2, 0].forEach(rowIndex => {
		const selectableRow = container.querySelector(`[data-row-index='${rowIndex}'] .card-container`);
		if (selectableRow) {
			onSelectRow.mockReset();
			fireEvent.click(selectableRow);
			expect(onSelectRow).toBeCalledWith(rowIndex);
		} else {
			expect(false).toBeTruthy();
		}
	});
});

test("render timeline graph with multiple columns", () => {
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Column 0, Field 0"], ["Column 1, Field 0", "Column 1, Field 1"]],
					},
				]}
				dateFormat={"YYYY-MM-DD"}
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render timeline graph with narrow cards", () => {
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Test column"]],
					},
				]}
				dateFormat={"YYYY-MM-DD"}
				cardWidth="narrow"
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render timeline graph with tall cards", () => {
	const { container } = render(
		<TestWrapper>
			<TimelineGraph
				rows={[
					{
						date: "2018-04-20T16:20:00Z",
						columns: [["Test column"]],
					},
				]}
				dateFormat={"YYYY-MM-DD"}
				cardHeight="tall"
			/>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});
