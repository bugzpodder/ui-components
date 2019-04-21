// @flow
import "jest-dom/extend-expect";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { EDC, LIMS, PIPELINE } from "@grail/lib";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./navbar";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

const wrapText = text => {
  return <Typography>{text}</Typography>;
};

const TestNavbar = props => {
  const { isProduction } = props;
  return (
    <TestWrapper>
      <MemoryRouter>
        <Navbar
          isProduction={isProduction}
          domain={LIMS}
          currentPath="/automation/tasks"
          title={wrapText("title")}
          breadcrumbs={wrapText("breadcrumbs")}
          left={wrapText("left")}
          center={wrapText("center")}
          right={wrapText("right")}
          sidebarFooter={wrapText("sidebarFooter")}
          externalDomains={new Map()
            .set(EDC, "https://edc-client-staging.eng.aws.grail.com")
            .set(PIPELINE, "https://proxy.ti-apps.aws.grail.com/pipeline-analyse-ui")}
        />
      </MemoryRouter>
    </TestWrapper>
  );
};

test("render Sidebar", () => {
  const { container, rerender, getByTestId } = render(<TestNavbar />);
  const items = {
    navbar: "breadcrumbs",
    "navbar-title": "title",
    "navbar-left": "left",
    "navbar-center": "center",
    "navbar-right": "right",
  };

  // Test DEV warning.
  expect(container).toMatchSnapshot();
  expect(getByTestId("non-production-warning")).toBeInTheDocument();
  expect(getByTestId("non-production-warning")).toHaveClass("nonProductionWarning");

  // Test navbar contents. Sidebar contents tested in sidebar.spec.js.
  Object.keys(items).forEach(key => {
    const content = items[key];
    expect(getByTestId(key)).toBeInTheDocument();
    expect(getByTestId(key)).toHaveTextContent(content);
  });
  fireEvent.click(getByTestId("main-nav-button"));
  expect(getByTestId("navbar-sidebar")).toBeInTheDocument();
  expect(getByTestId("navbar-sidebar")).toHaveTextContent("sidebarFooter");

  // Test default logos.
  expect(getByTestId("grail-logo")).toBeInTheDocument();
  expect(() => getByTestId("breast-cancer-ribbon")).toThrowError();

  // Test production navbar (no DEV warning).
  rerender(<TestNavbar isProduction />);
  expect(container).toMatchSnapshot();
  expect(() => getByTestId("non-production-warning")).toThrowError();
});

test("navbar with breast cancer logo", () => {
  const constantDate = new Date("2017-10-01T04:20:00");
  Date.now = jest.fn(() => constantDate);
  const { getByTestId, container } = render(<TestNavbar />);
  expect(container).toMatchSnapshot();
  expect(getByTestId("breast-cancer-ribbon")).toBeInTheDocument();
});
