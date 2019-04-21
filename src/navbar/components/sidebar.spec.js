// @flow
import "jest-dom/extend-expect";
import React from "react";
import { EDC, LIMS, PIPELINE } from "@grail/lib";
import { Link, MemoryRouter } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { TestWrapper } from "../../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render Sidebar", () => {
  const toggle = jest.fn();
  const { container } = render(
    <TestWrapper>
      <MemoryRouter>
        <Sidebar
          isOpen
          toggle={toggle}
          domain={LIMS}
          currentPath="/automation/program-runs"
          InternalLinkComponent={Link}
          drawerVariant="temporary"
          externalDomains={new Map()
            .set(EDC, "https://edc-client-staging.eng.aws.grail.com")
            .set(PIPELINE, "https://proxy.ti-apps.aws.grail.com/pipeline-analyse-ui")}
          footer={<span>Footer</span>}
        />
      </MemoryRouter>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();

  // const sampleManagementDropdown = getByTestId("list");
  // expect(sampleManagementDropdown).toBeInTheDocument();
  // expect(getByTestId("automation")).toBeInTheDocument();
  // expect(getByText("Footer")).toBeInTheDocument();
  // expect(getByText("Footer")).toBeInTheDocument();

  // expect(getByText("Footer")).toBeInTheDocument();
  // const programRuns = getByText("Program Runs");
  // // expect(getByText("Batches")).not.toBeInTheDocument();
  // expect(programRuns).toBeInTheDocument();
  // fireEvent.click(sampleManagementDropdown);
  // const batches = getByText("Batches");
  // expect(batches).toBeInTheDocument();
  // fireEvent.click(sampleManagementDropdown);
  // // expect(getByText("Batches")).not.toBeInTheDocument();
  // expect(toggle.mock.calls.length).toBe(0);
  // const instruments = getByText("Instruments");
  // expect(instruments).toBeInTheDocument();
  // fireEvent.click(instruments);
  // expect(toggle.mock.calls.length).toBe(1);
  // fireEvent.click(getByTestId("collapse-all-sidebar-items"));
});
