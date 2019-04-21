// @flow
import "jest-dom/extend-expect";
import Button from "@material-ui/core/Button";
import React from "react";
import { CommonCard } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render common card", () => {
  const { getByTestId } = render(
    <TestWrapper>
      <CommonCard
        headerActions={[<Button key="0">Test Header Action Button</Button>]}
        title="Test Card"
        footerActions={<span>test</span>}
      >
        This is a test
      </CommonCard>
    </TestWrapper>,
  );
  expect(getByTestId("card-header")).toHaveTextContent("Test Card");
  expect(getByTestId("card-body")).toHaveTextContent("This is a test");
  expect(getByTestId("card-header")).toHaveTextContent("Test Header Action Button");
});

test("common card classes and margin", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonCard
        title="Test Card"
        classes={{
          root: "test-root",
          header: "test-header",
          title: "test-title",
          subheader: "test-subheader",
          body: "test-body",
          footer: "test-footer",
        }}
        footerActions={<span>test</span>}
        hasMargin
      >
        This is a test
      </CommonCard>
    </TestWrapper>,
  );
  expect(getByTestId("card")).toHaveClass("test-root");
  expect(getByTestId("card-header")).toHaveClass("test-header");
  expect(getByTestId("card-title")).toHaveClass("test-title");
  expect(getByTestId("card-subheader")).toHaveClass("test-subheader");
  expect(getByTestId("card-body")).toHaveClass("test-body");
  expect(getByTestId("card-footer-actions")).toHaveClass("test-footer");
  expect(getByTestId("card-footer-actions")).toHaveTextContent("test");
  expect(container).toMatchSnapshot();
});

test("render common card without title or header actions", () => {
  const { getByTestId } = render(
    <TestWrapper>
      <CommonCard>This is a test</CommonCard>
    </TestWrapper>,
  );
  // TODO(nsawas): prove that undefined elements do not exist in DOM.
  expect(getByTestId("card-body")).toHaveTextContent("This is a test");
});
