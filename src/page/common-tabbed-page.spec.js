// @flow
import "jest-dom/extend-expect";
import React from "react";
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
  {
    label: "Tab",
    key: "tab",
    id: "tab",
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
      >
        <div data-testid="test">Test</div>
      </CommonTabbedPage>
    </TestWrapper>,
  );
  expect(getByTestId("alert")).toHaveTextContent("Tab One!");
  expect(getByTestId("tab-one")).toHaveAttribute("aria-selected", "true");
  expect(getByTestId("alert")).not.toHaveTextContent("Tab Two!");
  expect(getByTestId("tab-two")).toHaveAttribute("aria-selected", "false");
  fireEvent.click(getByTestId("tab-two"));
  expect(mockOnChange.mock.results[0].value).toEqual("two");
  expect(container).toMatchSnapshot();
  expect(getByTestId("spinner-overlay")).toHaveAttribute("data-is-active", "false");
  expect(getByTestId("test")).toBeInTheDocument();
});

test("display loading tabbed page", () => {
  mockConsole();
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonTabbedPage
        pageConfigs={[
          {
            label: "Tab",
            key: "tab",
            id: "tab",
            Component: Alert,
          },
        ]}
        activeTab="tab"
        onChangeActiveTab={() => {}}
        isLoading
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("alert")).toHaveTextContent("");
  expect(getByTestId("spinner-overlay")).toHaveAttribute("data-is-active", "true");
});

test("render empty common tabbed page", () => {
  mockConsole();
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
  expect(console.error).toHaveBeenCalled();
});

test("require pageConfigs is defined", () => {
  mockConsole();
  expect(() =>
    render(
      <TestWrapper>
        <CommonTabbedPage
          activeTab=""
          onChangeActiveTab={() => {}}
        />
      </TestWrapper>,
    ),
  ).toThrowError();
});
