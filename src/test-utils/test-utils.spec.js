// @flow
import "jest-dom/extend-expect";
import React from "react";
import { ExampleBlock } from "./example-block";
import { TestWrapper } from "./test-wrapper";
import { render } from "react-testing-library";

test("render example block", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExampleBlock
        strongHeader="State "
        content={{
          test: "one",
        }}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("example")).toBeInTheDocument();
  expect(getByTestId("example")).toHaveTextContent('State = { "test": "one" }');
});
