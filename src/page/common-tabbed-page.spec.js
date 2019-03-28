// @flow
import "jest-dom/extend-expect";
import React from "react";
import { Alert, CommonSwitch } from "../index";
import { CommonTabbedPage } from "./common-tabbed-page";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

const pageConfigs: Array<PageConfig> = [
  {
    label: "Tab One",
    key: "one",
    id: "tab-one",
    Component: Alert,
    componentProps: {
      color: "success",
      message: "Tab One!",
    },
  },
  {
    label: "Tab Two",
    key: "two",
    id: "tab-two",
    Component: Alert,
    componentProps: {
      color: "warning",
      message: "Tab Two!",
    },
  },
];

const headerActions = [
  {
    content: "Test Action",
  },
  {
    Component: CommonSwitch,
    componentProps: {
      label: "CUSTOM ACTION",
      onChange: () => {},
    },
  },
];

test("render common tabbed page", () => {
  const mockOnChange = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonTabbedPage
        title="Test Card"
        activeTab="one"
        pageConfigs={pageConfigs}
        headerActions={headerActions}
        onChangeActiveTab={mockOnChange}
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

test("render empty common tabbed page", () => {
  const { container } = render(
    <TestWrapper>
      <CommonTabbedPage
        pageConfigs={[]}
        activeTab=""
        onChangeActiveTab={() => {}}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
