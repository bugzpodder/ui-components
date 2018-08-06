// @flow
import "jest-dom/extend-expect";
import React from "react";
import { DateInput } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";

afterEach(cleanup);

const DateInputContainer = wrapPickerUtilProvider(DateInput);
test("render date input", async () => {
  const testDate = "2017-03-07 16:20:00";
  const mockCallback = jest.fn();
  const { container, getByPlaceholderText } = render(
    <TestWrapper>
      <DateInputContainer
        placeholder="Test Date Input"
        onChange={mockCallback}
        value={testDate}
      />
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
        readOnly
      />
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
        readOnly
      />
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
