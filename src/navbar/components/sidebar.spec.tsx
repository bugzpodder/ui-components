import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Link, MemoryRouter } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "../../types/nav";
import { TEST_EXTERNAL_DOMAINS, TestWrapper } from "../../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { getListItemDataTestId } from "../util";

afterEach(cleanup);

const testSidebarItems: SidebarItem[] = [
  {
    name: "Metrics",
    children: [
      {
        name: "Dashboards",
        domain: "EXTERNAL",
        path: "https://path-to-dashboard",
      },
      {
        name: "Reports",
        domain: "INTERNAL",
        path: "/path-to-reports",
      },
    ],
  },
];

const TestSidebar = props => {
  const { mockToggle, drawerVariant } = props;
  return (
    <TestWrapper>
      <MemoryRouter>
        <Sidebar
          isOpen
          toggle={mockToggle}
          sidebarContent={testSidebarItems}
          domain="LIMS"
          currentPath="/automation/program-runs"
          InternalLinkComponent={Link}
          drawerVariant={drawerVariant}
          externalDomains={TEST_EXTERNAL_DOMAINS}
          footer={<span>Footer</span>}
        />
      </MemoryRouter>
    </TestWrapper>
  );
};

test("render temporary Sidebar", () => {
  const mockToggle = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestSidebar drawerVariant="temporary" mockToggle={mockToggle} />,
  );
  expect(container).toMatchSnapshot();
  const sampleManagementDropdown = getByTestId("navbar-sidebar");
  expect(sampleManagementDropdown).toBeInTheDocument();
  expect(getByTestId("navbar-sidebar-footer")).toBeInTheDocument();
  expect(getByTestId("collapse-all-sidebar-items")).toBeInTheDocument();
  expect(getByTestId("navbar-sidebar-footer")).toHaveTextContent("Footer");

  // Verify testSidebarItems are displayed in the sidebar.
  testSidebarItems.forEach(item => {
    const parent = getListItemDataTestId(item.name);
    expect(getByTestId(parent)).toBeInTheDocument();

    // If list is collapsable, test children.
    if (item.children && item.children.length) {
      fireEvent.click(getByTestId(parent));
      item.children.forEach(child => {
        const testId = getListItemDataTestId(child.name);
        expect(getByTestId(testId)).toBeInTheDocument();
        expect(getByTestId(`${testId}-text`)).toBeInTheDocument();
        expect(getByTestId(`${testId}-text`)).toHaveTextContent(child.name);
        const domain = TEST_EXTERNAL_DOMAINS.get(child.domain) || "";
        expect(getByTestId(testId)).toHaveAttribute(
          "href",
          `${domain}${child.path}`,
        );
      });
      // Else just test the item
    } else {
      expect(getByTestId(`${parent}-text`)).toHaveTextContent(item.name);
      const domain = TEST_EXTERNAL_DOMAINS.get(item.domain) || "";
      expect(getByTestId(parent)).toHaveAttribute(
        "href",
        `${domain}${item.path}`,
      );
    }
  });

  // Test toggle callback.
  expect(mockToggle).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("navbar-sidebar-close"));
  expect(mockToggle).toHaveBeenCalledTimes(1);
});

test("persistent Sidebar", () => {
  const mockToggle = jest.fn(result => result);
  const { queryByTestId } = render(
    <TestSidebar drawerVariant="persistent" mockToggle={mockToggle} />,
  );
  expect(queryByTestId("navbar-sidebar-close")).not.toBeInTheDocument();
});
