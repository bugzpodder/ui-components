// @flow
import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "@grail/components/src/utils";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";
import { DateInput } from "./index";

const DateInputContainer = wrapPickerUtilProvider(DateInput);

test("render date input", async () => {
	const testDate = "2017-03-07 16:20:00";
	const mockCallback = jest.fn();
	const { container, getByPlaceholderText } = render(
		<TestWrapper>
			<DateInputContainer
				placeholder="Test Date Input"
				onChange={mockCallback}
				value={testDate} />
		</TestWrapper>,
	);
	expect(getByPlaceholderText("Test Date Input")).toHaveAttribute("value", "2017-03-07");
	expect(container).toMatchSnapshot();
});

test("render date input when readOnly is true", async () => {
	const testDate = "2017-03-07 16:20:00";
	const mockCallback = jest.fn();
	const { container, getByTestId } = render(
		<TestWrapper>
			<DateInputContainer
				placeholder="Test Date Input"
				onChange={mockCallback}
				value={testDate}
				readOnly={true} />
		</TestWrapper>,
	);
	expect(getByTestId("readonly-text-field")).toHaveTextContent("2017-03-07");
	expect(container).toMatchSnapshot();
});

test("render date input when readOnly is true showing - as empty value", async () => {
	const testDate = "";
	const mockCallback = jest.fn();
	const { container, getByTestId } = render(
		<TestWrapper>
			<DateInputContainer
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
			<DateInputContainer
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
