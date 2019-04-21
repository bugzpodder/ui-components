// @flow
import "jest-dom/extend-expect";
import React from "react";
import { CommonPanel } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render CommonPanel", async () => {
  const testTitle = "panel title";
  const testBody = "panel body";
  const { getByTestId } = render(
    <TestWrapper>
      <CommonPanel title={testTitle}>{testBody}</CommonPanel>
    </TestWrapper>,
  );
  expect(getByTestId("panel-title")).toHaveTextContent(testTitle);
  expect(getByTestId("panel-body")).toHaveTextContent(testBody);
});

test("CommonPanel classes", async () => {
  const testTitle = "panel title";
  const testBody = "panel body";
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonPanel
        title={testTitle}
        color="primary"
        classes={{
          root: "test-root",
          title: "test-title",
          body: "test-body",
        }}
      >
        {testBody}
      </CommonPanel>
    </TestWrapper>,
  );
  expect(getByTestId("panel")).toHaveClass("test-root");
  expect(getByTestId("panel-title")).toHaveClass("test-title");
  expect(getByTestId("panel-title")).toHaveClass("primary");
  expect(getByTestId("panel-body")).toHaveClass("test-body");
  expect(container).toMatchSnapshot();
});
