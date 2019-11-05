import React from "react";
import { TestWrapper } from "../../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { TextInputV2 } from "./text-input";

afterEach(cleanup);

test("render text field wrapper", async () => {
  const testValue = "test value";
  const testPlaceholder = "Test Placeholder";
  const { container, getByPlaceholderText } = render(
    <TestWrapper>
      <TextInputV2
        placeholder={testPlaceholder}
        id="operator"
        onChange={() => {}}
        value={testValue}
      />
    </TestWrapper>,
  );
  expect(getByPlaceholderText(testPlaceholder)).toHaveAttribute(
    "value",
    testValue,
  );
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with label, helperText, and readonly", async () => {
  const testValue = "test value";
  const testLabel = "test label";
  const testHelperText = "test helper text";
  const { container, getByTestId, getByDisplayValue } = render(
    <TestWrapper>
      <TextInputV2
        label={testLabel}
        id="operator"
        readOnly
        onChange={() => {}}
        value={testValue}
        helperText={testHelperText}
      />
    </TestWrapper>,
  );
  // This will error out if test value doesn't show up.
  expect(getByDisplayValue(testValue)).toBeDisabled();
  expect(getByTestId("readonly-text-input")).toHaveTextContent(testLabel);
  expect(getByTestId("readonly-text-input")).toHaveTextContent(testHelperText);
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with readonly as true show default value", async () => {
  const testValue = "";
  const { container, getByDisplayValue } = render(
    <TestWrapper>
      <TextInputV2
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
      />
    </TestWrapper>,
  );
  // This will error out if test value doesn't show up.
  expect(getByDisplayValue("-")).toBeDisabled();
  expect(container).toMatchSnapshot();
});

test("text field wrapper with readonly as true shows custom default value", async () => {
  const testValue = "";
  const readOnlyDefaultValue = "blahhh";
  const { container, getByDisplayValue } = render(
    <TestWrapper>
      <TextInputV2
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
        readOnlyDefaultValue={readOnlyDefaultValue}
      />
    </TestWrapper>,
  );
  // This will error out if test value doesn't show up.
  expect(getByDisplayValue(readOnlyDefaultValue)).toBeDisabled();
  expect(container).toMatchSnapshot();
});

test("text field wrapper with readonly as true shows custom default value", async () => {
  const testValue = "";
  const readOnlyDefaultValue = "";
  const { container, getByDisplayValue } = render(
    <TestWrapper>
      <TextInputV2
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
        readOnlyDefaultValue={readOnlyDefaultValue}
        placeholder="this won't show"
      />
    </TestWrapper>,
  );
  // This will error out if test value doesn't show up.
  expect(getByDisplayValue(testValue)).toBeDisabled();
  expect(() => getByDisplayValue("this won't show")).toThrow();
  expect(container).toMatchSnapshot();
});

test("passed down onBlur and onFocus are called", async () => {
  const testValue = "hi";
  const mockBlur = jest.fn(() => {});
  const mockFocus = jest.fn(() => {});
  const { container, getByDisplayValue } = render(
    <TestWrapper>
      <TextInputV2
        id="operator"
        onChange={() => {}}
        onBlur={mockBlur}
        onFocus={mockFocus}
        value={testValue}
      />
    </TestWrapper>,
  );
  fireEvent.focus(getByDisplayValue(testValue));
  expect(mockFocus.mock.calls.length).toBe(1);
  fireEvent.blur(getByDisplayValue(testValue));
  expect(mockBlur.mock.calls.length).toBe(1);
  expect(container).toMatchSnapshot();
});
