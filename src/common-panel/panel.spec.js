// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import { TestWrapper } from "../utils";
import { CommonPanel } from "./index";
import "jest-dom/extend-expect";

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
