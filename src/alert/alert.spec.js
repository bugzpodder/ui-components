// @flow
import "jest-dom/extend-expect";
import React from "react";
import { Alert } from "./index";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render success alert pane", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <Alert
          color="success"
          message="Test success"
        />
      </div>
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Test success");
  expect(container).toMatchSnapshot();
});

test("render info alert pane", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <Alert
          color="info"
          message="Test info"
        />
      </div>
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Test info");
  expect(container).toMatchSnapshot();
});

test("render warning alert pane", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <Alert
          color="warning"
          variant="text"
          message="Test warning"
        />
      </div>
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Test warning");
  expect(container).toMatchSnapshot();
});

test("render error alert pane", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <Alert
          variant="text"
          message="Test error"
        />
      </div>
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Test error");
  expect(container).toMatchSnapshot();
});
