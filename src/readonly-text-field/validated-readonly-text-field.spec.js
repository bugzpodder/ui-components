// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import { TestWrapper } from "../utils";
import { ValidatedReadOnlyTextField } from "./index";
import "jest-dom/extend-expect";

afterEach(cleanup);

test("render validated readonly text field", async () => {
  const testText = "readOnly text";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ValidatedReadOnlyTextField isValid>{testText}</ValidatedReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(getByTestId("icon")).toHaveTextContent("done");
  expect(container).toMatchSnapshot();
});

test("render validated readonly text field with false `isValid`", async () => {
  const testText = "readOnly text";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ValidatedReadOnlyTextField isValid={false}>{testText}</ValidatedReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(getByTestId("icon")).toHaveTextContent("clear");
  expect(container).toMatchSnapshot();
});

test("render validated readonly text field with `isNA`", async () => {
  const testText = "readOnly text";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ValidatedReadOnlyTextField
        className="test-classname"
        isValid
        isNA
      >
        {testText}
      </ValidatedReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(container).toMatchSnapshot();
});
