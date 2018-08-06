// @flow
import "jest-dom/extend-expect";
import React from "react";
import { Alert } from "../alert/index";
import { TabbedCard } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

const validHeaderTabs = [
  {
    label: "Tab One",
    value: "one",
    id: "tab-one",
    content: <Alert
      color="success"
      message="Tab One!"
    />,
  },
  {
    label: "Tab Two",
    value: "two",
    id: "tab-two",
    content: <Alert
      color="success"
      message="Tab Two!"
    />,
  },
];

const headerActions = [
  {
    content: "Test Action",
  },
];

test("render tabbed card", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <TabbedCard
        title="Test Card"
        value="one"
        headerTabs={validHeaderTabs}
        headerActions={headerActions}
        onChange={() => {}}
      />
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Tab One!");
  expect(getByTestId("tab-one")).toHaveAttribute("aria-selected", "true");
  expect(getByTestId("alert")).not.toHaveTextContent("Tab Two!");
  expect(getByTestId("tab-two")).toHaveAttribute("aria-selected", "false");
  expect(container).toMatchSnapshot();
});
