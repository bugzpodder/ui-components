// @flow
import "jest-dom/extend-expect";
import React from "react";
import { ReadOnlyTextField } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render readonly text field", async () => {
  const testText = "readOnly text";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ReadOnlyTextField>{testText}</ReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(container).toMatchSnapshot();
});

test("render readonly text field with empty children shown as -", async () => {
  const testText = "";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ReadOnlyTextField>{testText}</ReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
  expect(container).toMatchSnapshot();
});

test("render readonly text field with empty children", async () => {
  const testText = "";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ReadOnlyTextField showEmptyValue>{testText}</ReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent("");
  expect(container).toMatchSnapshot();
});

test("render readonly text field with an icon", async () => {
  const testText = "Starred";
  const testIcon = "star";
  const { container, getByTestId } = render(
    <TestWrapper>
      <ReadOnlyTextField icon={testIcon}>{testText}</ReadOnlyTextField>
    </TestWrapper>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(getByTestId("icon")).toHaveTextContent(testIcon);
  expect(container).toMatchSnapshot();
});
