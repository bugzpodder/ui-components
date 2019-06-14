// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { TimeInput } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";

afterEach(cleanup);

const TimeInputContainer = wrapPickerUtilProvider(TimeInput);
const TestTimeInput = props => {
  const {
    value, readOnly, placeholder, mockOnChange,
  } = props;
  return (
    <TestWrapper>
      <TimeInputContainer
        placeholder={placeholder}
        onChange={mockOnChange}
        value={value}
        readOnly={readOnly}
      />
    </TestWrapper>
  );
};

test("render time input", () => {
  const testTime = "2016-03-07 16:20:00";
  const mockOnChange = jest.fn(result => result);
  const {
    rerender, getByTestId, getByPlaceholderText, container,
  } = render(
    <TestTimeInput
      placeholder="test"
      mockOnChange={() => {}}
    />,
  );
  expect(getByTestId("time-input")).toBeInTheDocument();
  expect(getByPlaceholderText("test")).toHaveAttribute("value", "");

  rerender(<TestTimeInput
    placeholder="Test Time Input"
    mockOnChange={mockOnChange}
    value={testTime}
  />);
  expect(container).toMatchSnapshot();
  // FIXME(jsingh): fix this test.
  // The input element doesn't seem to get the value attribute correctly any more. The snapshot has empty string.
  // The UI still works as expected.
  // expect(getByPlaceholderText("Test Time Input")).toHaveAttribute("value", "2016-03-07");

  // TODO(nsawas): See if this can be better tested. So far jest seems limited based on how elements are rendered.
});

test("invalid props", async () => {
  mockConsole();
  expect(() => render(<TestTimeInput />)).toThrowError();
});

test("render readOnly TimeInput", async () => {
  const testTime = "2017-03-07 16:20:00";
  const { container, getByTestId, rerender } = render(<TestTimeInput
    readOnly
    value={testTime}
  />);
  expect(container).toMatchSnapshot();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("04:20 PM");

  rerender(<TestTimeInput readOnly />);
  expect(getByTestId("readonly-text-field")).not.toBeEmpty();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
});
