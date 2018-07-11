// @flow
import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "../utils";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
import { DateTimeInput } from "./index";

const DateTimeInputContainer = wrapPickerUtilProvider(DateTimeInput);

test("render date time input", () => {
	const testDate = "2016-03-07 16:20:00";
	const mockCallback = jest.fn();
	const { container, getByPlaceholderText } = render(
		<TestWrapper>
			<DateTimeInputContainer
				placeholder="Test DateTime Input"
				onChange={mockCallback}
				value={testDate} />
		</TestWrapper>,
	);
	expect(getByPlaceholderText("Test DateTime Input")).toHaveAttribute("value", "2016-03-07 16:20:00");
	expect(container).toMatchSnapshot();
});

test("render date input when readOnly is true", async () => {
	const testDate = "2017-03-07 16:20:00";
	const mockCallback = jest.fn();
	const { container, getByTestId } = render(
		<TestWrapper>
			<DateTimeInputContainer
				placeholder="Test Date Input"
				onChange={mockCallback}
				value={testDate}
				readOnly={true} />
		</TestWrapper>,
	);
	expect(getByTestId("readonly-text-field")).toHaveTextContent("2017-03-07 16:20:00");
	expect(container).toMatchSnapshot();
});

test("render date input when readOnly is true showing - for empty value", async () => {
	const testDate = "";
	const mockCallback = jest.fn();
	const { container, getByTestId } = render(
		<TestWrapper>
			<DateTimeInputContainer
				placeholder="Test Date Input"
				onChange={mockCallback}
				value={testDate}
				readOnly />
		</TestWrapper>,
	);
	expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
	expect(container).toMatchSnapshot();
});

test("render date input when readOnly is true showing empty value", async () => {
	const testDate = "";
	const mockCallback = jest.fn();
	const { container, getByTestId } = render(
		<TestWrapper>
			<DateTimeInputContainer
				placeholder="Test Date Input"
				onChange={mockCallback}
				value={testDate}
				readOnly
				showEmptyValue
			/>
		</TestWrapper>,
	);
	expect(getByTestId("readonly-text-field")).toHaveTextContent("");
	expect(container).toMatchSnapshot();
});
