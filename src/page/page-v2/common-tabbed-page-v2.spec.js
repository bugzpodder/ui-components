// @flow
import "jest-dom/extend-expect";
import React, { useState } from "react";
import mockConsole from "jest-mock-console";
import { Alert, CommonSwitch } from "../../index";
import { CommonTabbedPageV2 } from "./common-tabbed-page-v2";
import { TestWrapper } from "../../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const pageConfigs: Array<PageConfig> = [
  {
    label: "Tab One",
    key: "one",
    id: "tab-one",
    Component: Alert,
    componentProps: {
      "data-testid": "alert-one",
      message: "Tab One!",
    },
  },
  {
    label: "Tab Two",
    key: "two",
    id: "tab-two",
    Component: Alert,
    componentProps: {
      "data-testid": "alert-two",
      message: "Tab Two!",
    },
  },
  {
    label: "Tab Three",
    key: "three",
    id: "tab-three",
    Component: Alert,
  },
];

const TestCommonTabbedPage = props => {
  const { mockOnChange, ...otherProps } = props;

  const [activeTab, setActiveTab] = useState("one");
  const setChange = value => {
    mockOnChange(value);
    setActiveTab(value);
  };

  return (
    <TestWrapper>
      <CommonTabbedPageV2
        title="Test Card"
        activeTab={activeTab}
        pageConfigs={pageConfigs}
        primaryActions={[
          {
            content: "Test Action",
          },
        ]}
        secondaryActions={[
          {
            Component: CommonSwitch,
            componentProps: {
              label: "CUSTOM ACTION",
              onChange: () => {},
            },
          },
        ]}
        {...otherProps}
        onChangeActiveTab={setChange}
      >
        <div data-testid="test">Test</div>
      </CommonTabbedPageV2>
    </TestWrapper>
  );
};

test("render common tabbed page", () => {
  const mockOnChange = jest.fn(result => result);
  const { container, queryByTestId, getByTestId } = render(<TestCommonTabbedPage mockOnChange={mockOnChange} />);
  expect(container).toMatchSnapshot();
  expect(getByTestId("alert-one")).toHaveTextContent("Tab One!");
  expect(getByTestId("tab-one")).toHaveAttribute("aria-selected", "true");
  expect(queryByTestId("alert-two")).not.toBeInTheDocument();
  expect(getByTestId("tab-two")).toHaveAttribute("aria-selected", "false");
  expect(getByTestId("spinner-overlay")).toHaveAttribute("data-is-active", "false");
  expect(getByTestId("test")).toBeInTheDocument();

  // Select a new tab
  fireEvent.click(getByTestId("tab-two"));
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange.mock.results[0].value).toEqual("two");
  expect(getByTestId("tab-one")).toHaveAttribute("aria-selected", "false");
  expect(getByTestId("tab-two")).toHaveAttribute("aria-selected", "true");
  expect(queryByTestId("alert-one")).not.toBeInTheDocument();
  expect(queryByTestId("alert-two")).toBeInTheDocument();
  expect(getByTestId("test")).toBeInTheDocument();
  fireEvent.click(getByTestId("tab-three"));
});

test("CommonTabbedPage classes", () => {
  const { getByTestId } = render(<TestCommonTabbedPage classes={{ tabs: "test-tabs", tab: "test-tab" }} />);
  expect(getByTestId("common-tabbed-page-tabs")).toHaveClass("test-tabs");
  expect(getByTestId("tab-one")).toHaveClass("test-tab");
});

test("display loading tabbed page", () => {
  mockConsole();
  const { getByTestId } = render(<TestCommonTabbedPage
    title=""
    isLoading
  />);
  expect(getByTestId("spinner-overlay")).toHaveAttribute("data-is-active", "true");
});

test("require pageConfigs is defined", () => {
  mockConsole();
  expect(() =>
    render(
      <TestWrapper>
        <CommonTabbedPageV2 />
      </TestWrapper>,
    ),
  ).toThrowError();
});

test("activeTab must match at least one page config", () => {
  mockConsole();
  render(<TestCommonTabbedPage activeTab="hi" />);
  // TODO(nsawas): expect error message.
  expect(console.error).toHaveBeenCalled();
});
