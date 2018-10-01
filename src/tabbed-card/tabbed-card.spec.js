// @flow
import "jest-dom/extend-expect";
import React from "react";
import { Alert } from "../alert/index";
import { TabbedCard } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

const validTabConfigs = [
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
  const mockOnChange = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <TabbedCard
        title="Test Card"
        value="one"
        tabConfigs={validTabConfigs}
        headerActions={headerActions}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Tab One!");
  expect(getByTestId("tab-one")).toHaveAttribute("aria-selected", "true");
  expect(getByTestId("alert")).not.toHaveTextContent("Tab Two!");
  expect(getByTestId("tab-two")).toHaveAttribute("aria-selected", "false");
  fireEvent.click(getByTestId("tab-two"));
  expect(mockOnChange.mock.results[0].value).toEqual("two");
  expect(container).toMatchSnapshot();
});

test("render empty tabbed card", () => {
  const { container } = render(
    <TestWrapper>
      <TabbedCard />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
