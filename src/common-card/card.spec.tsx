import "@testing-library/jest-dom/extend-expect";
import Button from "@material-ui/core/Button";
import React from "react";
import { CommonCard } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

const TestCommonCard: React.FC<any> = props => {
  const { classes, hasMargin } = props;
  return (
    <TestWrapper>
      <CommonCard
        headerActions={[<Button key="0">Test Header Action Button</Button>]}
        secondaryActions={[
          {
            id: "test",
            content: "Test",
            onClick: jest.fn(result => result),
          },
        ]}
        title="Test Card"
        footerActions={<span>test</span>}
        classes={classes}
        hasMargin={hasMargin}
      >
        This is a test
      </CommonCard>
    </TestWrapper>
  );
};

test("render common card", () => {
  const { getByTestId } = render(<TestCommonCard />);
  expect(getByTestId("card-header")).toHaveTextContent("Test Card");
  expect(getByTestId("card-body")).toHaveTextContent("This is a test");
  expect(getByTestId("card-header")).toHaveTextContent(
    "Test Header Action Button",
  );
  expect(getByTestId("card-footer-actions")).toHaveTextContent("test");
});

test("common card classes and margin", () => {
  const { container, getByTestId } = render(
    <TestCommonCard
      classes={{
        root: "test-root",
        header: "test-header",
        title: "test-title",
        subheader: "test-subheader",
        body: "test-body",
        footer: "test-footer",
      }}
      hasMargin
    />,
  );
  expect(getByTestId("card")).toHaveClass("test-root");
  expect(getByTestId("card")).toHaveClass("withMargin");
  expect(getByTestId("card-header")).toHaveClass("test-header");
  expect(getByTestId("card-title")).toHaveClass("test-title");
  expect(getByTestId("card-subheader")).toHaveClass("test-subheader");
  expect(getByTestId("card-body")).toHaveClass("test-body");
  expect(getByTestId("card-footer-actions")).toHaveClass("test-footer");
  expect(container).toMatchSnapshot();
});

test("render common card without title or header actions", () => {
  const { getByTestId, queryByTestId } = render(
    <TestWrapper>
      <CommonCard>Empty Card</CommonCard>
    </TestWrapper>,
  );
  expect(getByTestId("card-body")).toHaveTextContent("Empty Card");
  expect(queryByTestId("card-header")).not.toBeInTheDocument();
  expect(queryByTestId("card-title")).not.toBeInTheDocument();
  expect(queryByTestId("card-subheader")).not.toBeInTheDocument();
  expect(queryByTestId("card-footer-actions")).not.toBeInTheDocument();
});
