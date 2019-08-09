// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Alert } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const TestAlert = props => {
  const { classes } = props;
  return (
    <TestWrapper>
      <Alert
        classes={classes}
        message="Default"
      />
    </TestWrapper>
  );
};

test("default alert pane is error", () => {
  const { container, getByTestId } = render(<TestAlert />);
  expect(getByTestId("error-alert-icon")).toBeInTheDocument();
  expect(getByTestId("error-alert-message")).toHaveTextContent("Default");
  expect(container).toMatchSnapshot();
});

test("alert classes", () => {
  const { getByTestId } = render(
    <TestAlert
      classes={{
        root: "test-root",
        content: "test-content",
      }}
    />,
  );
  expect(getByTestId("alert")).toBeInTheDocument();
  expect(getByTestId("alert")).toHaveClass("test-root");
  expect(getByTestId("content")).toBeInTheDocument();
  expect(getByTestId("content")).toHaveClass("test-content");
});

test("alternative alert colors", () => {
  const { getByTestId } = render(
    <TestWrapper>
      <Alert
        color="info"
        message="Test info"
      />
      <Alert
        color="success"
        message="Test success"
      />
      <Alert
        color="warning"
        variant="text"
        message="Test warning"
      />
    </TestWrapper>,
  );
  expect(getByTestId("info-alert-icon")).toBeInTheDocument();
  expect(getByTestId("info-alert-message")).toHaveTextContent("Test info");
  expect(getByTestId("success-alert-icon")).toBeInTheDocument();
  expect(getByTestId("success-alert-message")).toHaveTextContent("Test success");
  expect(getByTestId("warning-alert-icon")).toBeInTheDocument();
  expect(getByTestId("warning-alert-message")).toHaveTextContent("Test warning");
});
