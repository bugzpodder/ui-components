// @flow
import "jest-dom/extend-expect";
import React from "react";
import { Alert, CommonSwitch } from "../index";
import { CommonPage } from "./common-page";
import { TestWrapper } from "../utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

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

test("render common page", () => {
  const { container } = render(
    <TestWrapper>
      <CommonPage
        title="Test Card"
        value="one"
        headerActions={headerActions}
      >
        <h3>Page Content</h3>
      </CommonPage>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render empty common page", () => {
  const { container } = render(
    <TestWrapper>
      <CommonPage />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render common page with subheader and content", () => {
  const { container } = render(
    <TestWrapper>
      <CommonPage
        headerActions={headerActions}
        subtitle="This is a subtitle"
        title="This is a title"
        subheader={(
          <Alert
            message="Some alert message"
            color="success"
          />
)}
      >
        Some content here.
      </CommonPage>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render common page with menu", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonPage
        headerActions={headerActions}
        subtitle="This is a subtitle"
        title="This is a title"
        menuContents={[
          {
            label: "Menu item one",
            key: "one",
          },
          {
            label: "Menu item two",
            key: "two",
          },
        ]}
      >
        <Alert
          message="Alert one"
          color="success"
          id="one"
        />
        <Alert
          message="Alert two"
          color="success"
          id="two"
        />
      </CommonPage>
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("toggle-side-menu"));
  expect(getByTestId("side-menu-item-one")).toBeInTheDocument();
  expect(getByTestId("side-menu-item-one")).toHaveAttribute("href", "#one");
  expect(container).toMatchSnapshot();
});
