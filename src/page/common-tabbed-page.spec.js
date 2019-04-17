// @flow
import "jest-dom/extend-expect";
import React, { useState } from "react";
import mockConsole from "jest-mock-console";
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
      "data-testid": "alert-one",
      message: "Tab One!",
    },
    tabClasses: {
      root: "test-tab-root",
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

const TestCommonTabbedPage = props => {
  const { mockOnChange, ...otherProps } = props;

  const [activeTab, setActiveTab] = useState("one");
  const setChange = value => {
    mockOnChange(value);
    setActiveTab(value);
  };

  return (
    <TestWrapper>
      <CommonTabbedPage
        title="Test Card"
        activeTab={activeTab}
        pageConfigs={pageConfigs}
        headerActions={headerActions}
        {...otherProps}
        onChangeActiveTab={setChange}
      >
        <div data-testid="test">Test</div>
      </CommonTabbedPage>
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
  const { getByTestId } = render(<TestCommonTabbedPage classes={{ tabs: "test-tabs" }} />);
  expect(getByTestId("card-tabs")).toHaveClass("test-tabs");
  expect(getByTestId("tab-one")).toHaveClass("test-tab-root");
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
        <CommonTabbedPage />
      </TestWrapper>,
    ),
  ).toThrowError();
});

test("activeTab must match at least one page config", () => {
  mockConsole();
  render(<TestCommonTabbedPage activeTab="" />);
  // TODO(nsawas): expect error message.
  expect(console.error).toHaveBeenCalled();
});
