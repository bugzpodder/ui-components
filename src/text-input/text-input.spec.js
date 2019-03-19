// @flow
import React from "react";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

import "jest-dom/extend-expect";
import { TextInput } from ".";

afterEach(cleanup);

test("render text field wrapper", async () => {
  const testValue = "test value";
  const testPlaceholder = "Test Placeholder";
  const { container, getByPlaceholderText } = render(
    <TestWrapper>
      <TextInput
        placeholder={testPlaceholder}
        id="operator"
        onChange={() => {}}
        value={testValue}
      />
    </TestWrapper>,
  );
  expect(getByPlaceholderText(testPlaceholder)).toHaveAttribute("value", testValue);
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with readonly as true", async () => {
  const testValue = "test value";
  const { container, getByTestId } = render(
    <TestWrapper>
      <TextInput
        id="operator"
        readOnly
        onChange={() => {}}
        value={testValue}
      />
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testValue);
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with readonly as true showing - for empty value", async () => {
  const testValue = "";
  const { container, getByTestId } = render(
    <TestWrapper>
      <TextInput
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
      />
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with readonly as true with showing empty value", async () => {
  const testValue = "";
  const { container, getByTestId } = render(
    <TestWrapper>
      <TextInput
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
        showEmptyValue
      />
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent("");
  expect(container).toMatchSnapshot();
});

test("render text field wrapper with readonly as true with a ReadOnlyComponent", async () => {
  const testValue = "used custom readonly component";
  const testId = "custom-readonly-text";
  const id = "test-readonly-component-id";
  const { container, getByTestId } = render(
    <TestWrapper>
      <TextInput
        id="operator"
        onChange={() => {}}
        value={testValue}
        readOnly
        ReadOnlyComponent="div"
        readOnlyComponentProps={{
          "data-testid": testId,
          id,
        }}
        showEmptyValue
      />
    </TestWrapper>,
  );
  expect(getByTestId(testId)).toHaveTextContent(testValue);
  expect(getByTestId(testId)).toHaveAttribute("id", id);
  expect(container).toMatchSnapshot();
});
