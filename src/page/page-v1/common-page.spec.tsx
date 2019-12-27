import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Alert, CommonSwitch } from "../..";
import { CommonPage } from "./common-page";
import { TestWrapper } from "../../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestCommonPage: React.FC<any> = props => {
  return (
    <TestWrapper>
      <CommonPage
        {...props}
        subheader={<Alert message="Some alert message" color="success" />}
        value="one"
      >
        Some content here.
      </CommonPage>
    </TestWrapper>
  );
};

test("renders common page", () => {
  const { rerender, container } = render(<TestCommonPage />);
  rerender(
    <TestCommonPage
      title="Test Card"
      subtitle="This is a subtitle"
      headerActions={[
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
      ]}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("displays a side menu", () => {
  const menuContents = [
    {
      label: "Menu item one",
      key: "one",
    },
    {
      label: "Menu item two",
      key: "two",
    },
  ];

  const { getByTestId } = render(
    <TestCommonPage menuContents={menuContents} />,
  );
  fireEvent.click(getByTestId("toggle-side-menu"));
  expect(getByTestId("side-menu-item-one")).toBeInTheDocument();
  expect(getByTestId("side-menu-item-one")).toHaveAttribute("href", "#one");
});

test("common page classes", () => {
  const { getByTestId } = render(
    <TestCommonPage
      menuContents={[{ key: "test", label: "test" }]}
      classes={{
        root: "test-root",
        header: "test-header",
        headerActions: "test-actions",
        title: "test-title",
        subtitle: "test-subtitle",
        contentAndMenu: "test-container",
        content: "test-content",
        sideMenu: "test-side-menu",
      }}
    />,
  );
  const classes = {
    "common-page": "test-root",
    "common-page-header": "test-header",
    // test headerActions
    "common-page-title": "test-title",
    "common-page-subtitle": "test-subtitle",
    "common-page-content-and-menu": "test-container",
    "common-page-content": "test-content",
    "common-page-side-menu": "test-side-menu",
  };
  Object.keys(classes).forEach(key => {
    expect(getByTestId(key)).toBeInTheDocument();
    expect(getByTestId(key)).toHaveClass(classes[key]);
  });
});
