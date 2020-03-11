import React from "react";
import { CommonPanel } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const TestCommonPanel = (props: any) => {
  const { color, classes } = props;
  return (
    <TestWrapper>
      <CommonPanel title="panel title" color={color} classes={classes}>
        panel body
      </CommonPanel>
    </TestWrapper>
  );
};

test("render CommonPanel", async () => {
  const { getByTestId } = render(<TestCommonPanel />);
  expect(getByTestId("panel-title")).toHaveTextContent("panel title");
  expect(getByTestId("panel-body")).toHaveTextContent("panel body");
});

test("CommonPanel classes", async () => {
  const { container, getByTestId } = render(
    <TestCommonPanel
      color="primary"
      classes={{
        root: "test-root",
        title: "test-title",
        body: "test-body",
      }}
    />,
  );
  expect(getByTestId("panel")).toHaveClass("test-root");
  expect(getByTestId("panel-title")).toHaveClass("test-title");
  expect(getByTestId("panel-title")).toHaveClass("primary");
  expect(getByTestId("panel-body")).toHaveClass("test-body");
  expect(container).toMatchSnapshot();
});
