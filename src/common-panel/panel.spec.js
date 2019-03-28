// @flow
import "jest-dom/extend-expect";
import React from "react";
import { CommonPanel } from "./index";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render validated readonly text field", async () => {
  const testTitle = "panel title";
  const testBody = "panel body";
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonPanel title={testTitle}>{testBody}</CommonPanel>
    </TestWrapper>,
  );
  expect(getByTestId("panel-title")).toHaveTextContent(testTitle);
  expect(getByTestId("panel-body")).toHaveTextContent(testBody);
  expect(container).toMatchSnapshot();
});
