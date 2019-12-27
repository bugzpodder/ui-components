import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { ReadOnlyTextField } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const TestReadOnlyTextField: React.FC<React.ComponentProps<
  typeof ReadOnlyTextField
>> = props => {
  const { children, ...otherProps } = props;
  return (
    <TestWrapper>
      <ReadOnlyTextField {...otherProps}>{children}</ReadOnlyTextField>
    </TestWrapper>
  );
};

test("render readonly text field", async () => {
  const testText = "readOnly text";
  const { container, getByTestId, rerender } = render(
    <TestReadOnlyTextField>{testText}</TestReadOnlyTextField>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);

  // Default empty children.
  rerender(<TestReadOnlyTextField />);
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");

  // Override empty children.
  rerender(<TestReadOnlyTextField showEmptyValue />);
  expect(getByTestId("readonly-text-field")).toHaveTextContent("");

  // With icon.
  rerender(<TestReadOnlyTextField icon="star">Starred</TestReadOnlyTextField>);
  expect(getByTestId("icon")).toHaveTextContent("star");
});
