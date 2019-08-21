// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { LIMS } from "@grail/lib";
import { MemoryRouter } from "react-router-dom";
import { NavbarV2 } from "./navbar";
import { TEST_EXTERNAL_DOMAINS, TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { getListItemDataTestId } from "./util";

afterEach(cleanup);

const wrapText = text => {
  return <Typography>{text}</Typography>;
};

const TestNavbar = props => {
  const { isProduction, sidebarContent } = props;
  return (
    <TestWrapper>
      <MemoryRouter>
        <NavbarV2
          sidebarContent={sidebarContent}
          isProduction={isProduction}
          domain={LIMS}
          currentPath="/automation/tasks"
          breadcrumbs={wrapText("breadcrumbs")}
          left={wrapText("left")}
          center={wrapText("center")}
          right={wrapText("right")}
          logo={<div data-testid="navbar-spec-logo">Logo</div>}
          sidebarFooter={wrapText("sidebarFooter")}
          externalDomains={TEST_EXTERNAL_DOMAINS}
        />
      </MemoryRouter>
    </TestWrapper>
  );
};

test("render default Sidebar", () => {
  const {
    container, rerender, queryByTestId, getByTestId,
  } = render(<TestNavbar />);
  const items = {
    navbar: "breadcrumbs",
    "navbar-left": "left",
    "navbar-center": "center",
    "navbar-right": "right",
  };

  // Test DEV warning.
  expect(container).toMatchSnapshot();
  expect(getByTestId("non-production-warning")).toBeInTheDocument();
  expect(getByTestId("non-production-warning")).toHaveClass("nonProductionWarning");

  // Test navbar contents. Sidebar contents are tested in sidebar.spec.js.
  Object.keys(items).forEach(key => {
    const content = items[key];
    expect(getByTestId(key)).toBeInTheDocument();
    expect(getByTestId(key)).toHaveTextContent(content);
  });
  fireEvent.click(getByTestId("main-nav-button"));
  expect(getByTestId("navbar-sidebar")).toBeInTheDocument();
  expect(getByTestId("navbar-sidebar")).toHaveTextContent("sidebarFooter");

  // Test default logos.
  expect(getByTestId("navbar-spec-logo")).toBeInTheDocument();
  expect(queryByTestId("breast-cancer-ribbon")).not.toBeInTheDocument();

  // Test production navbar (no DEV warning).
  rerender(<TestNavbar isProduction />);
  expect(container).toMatchSnapshot();
  expect(queryByTestId("non-production-warning")).not.toBeInTheDocument();
});

test("custom Sidebar", () => {
  const testSidebarContent = [
    {
      name: 420,
      domain: LIMS,
      path: "/420",
    },
    {
      domain: LIMS,
      path: "/test",
    },
  ];
  const { getByTestId } = render(<TestNavbar sidebarContent={testSidebarContent} />);
  fireEvent.click(getByTestId("main-nav-button"));
  expect(getByTestId("navbar-sidebar")).toBeInTheDocument();
  testSidebarContent.forEach(item => {
    const parent = getListItemDataTestId(item.name);
    expect(getByTestId(parent)).toBeInTheDocument();
  });
});

test("navbar with breast cancer logo", () => {
  const constantDate = new Date("2017-10-01T04:20:00");
  Date.now = jest.fn(() => constantDate);
  const { getByTestId, container } = render(<TestNavbar />);
  expect(container).toMatchSnapshot();
  expect(getByTestId("breast-cancer-ribbon")).toBeInTheDocument();
});
