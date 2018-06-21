// @flow
import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "@grail/components";
import { TwoColumnGrid } from "./index";

test("render two column grid", () => {
	const rows = [
		{
			label: "Test Label 1",
			value: "Test Value 1",
		},
		{
			label: 1,
			value: "Test Value 1",
		},
	];
	const { container, getByTestId } = render(
		<TestWrapper>
			<TwoColumnGrid rows={rows} />
		</TestWrapper>,
	);
	expect(getByTestId("two-column-row-label")).toHaveTextContent("Test Label 1");
	expect(getByTestId("two-column-row-value")).toHaveTextContent("Test Value 1");
	expect(container).toMatchSnapshot();
});
