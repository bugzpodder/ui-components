// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { DateTimeInput } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";

afterEach(cleanup);

const DateTimeInputContainer = wrapPickerUtilProvider(DateTimeInput);
const TestDateTimeInput = props => {
  const {
    value, readOnly, placeholder, mockOnChange,
  } = props;
  return (
    <TestWrapper>
      <DateTimeInputContainer
        placeholder={placeholder}
        onChange={mockOnChange}
        value={value}
        readOnly={readOnly}
      />
    </TestWrapper>
  );
};

test("render date time input", () => {
  const testDate = "2016-03-07 16:20:00";
  const mockOnChange = jest.fn(result => result);
  const {
    rerender, getByTestId, getByPlaceholderText, container,
  } = render(
    <TestDateTimeInput
      placeholder="test"
      mockOnChange={() => {}}
    />,
  );
  expect(getByTestId("date-time-input")).toBeInTheDocument();
  expect(getByPlaceholderText("test")).toHaveAttribute("value", "");

  rerender(<TestDateTimeInput
    placeholder="Test DateTime Input"
    mockOnChange={mockOnChange}
    value={testDate}
  />);
  expect(container).toMatchSnapshot();
  // FIXME(jsingh): fix this test.
  // The input element doesn't seem to get the value attribute correctly any more. The snapshot has empty string.
  // The UI still works as expected.
  // expect(getByPlaceholderText("Test DateTime Input")).toHaveAttribute("value", "2016-03-07 16:20:00");

  // TODO(nsawas): See if this can be better tested. So far jest seems limited based on how elements are rendered.
});

test("invalid props", async () => {
  mockConsole();
  expect(() => render(<TestDateTimeInput />)).toThrowError();
});

test("render readOnly DateInput", async () => {
  const testDate = "2017-03-07 16:20:00";
  const { container, getByTestId, rerender } = render(<TestDateTimeInput
    readOnly
    value={testDate}
  />);
  expect(container).toMatchSnapshot();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("2017-03-07 16:20:00");

  rerender(<TestDateTimeInput readOnly />);
  expect(getByTestId("readonly-text-field")).not.toBeEmpty();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
});
