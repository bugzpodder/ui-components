import React from "react";
import { TestWrapper } from "../test-utils";
import { ValidatedReadOnlyTextField } from ".";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const TestValidatedReadOnlyTextField: React.FC<React.ComponentProps<
  typeof ValidatedReadOnlyTextField
>> = props => {
  const { children, ...otherProps } = props;
  return (
    <TestWrapper>
      <ValidatedReadOnlyTextField {...otherProps}>
        {children}
      </ValidatedReadOnlyTextField>
    </TestWrapper>
  );
};

test("render validated readonly text field", async () => {
  const testText = "readOnly text";
  const { rerender, container, queryByTestId, getByTestId } = render(
    <TestValidatedReadOnlyTextField isValid>
      {testText}
    </TestValidatedReadOnlyTextField>,
  );
  expect(getByTestId("readonly-text-field")).toHaveTextContent(testText);
  expect(getByTestId("icon")).toHaveTextContent("done");
  expect(container).toMatchSnapshot();

  rerender(
    <TestValidatedReadOnlyTextField isValid={false}>
      {testText}
    </TestValidatedReadOnlyTextField>,
  );
  expect(getByTestId("icon")).toHaveTextContent("clear");

  rerender(
    <TestValidatedReadOnlyTextField className="test-classname" isValid isNA>
      {testText}
    </TestValidatedReadOnlyTextField>,
  );
  expect(queryByTestId("icon")).not.toBeInTheDocument();
});
