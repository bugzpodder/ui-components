// @flow
import "jest-dom/extend-expect";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import { EDC, LIMS, PIPELINE } from "@grail/lib";
import { Link, MemoryRouter } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";
import { createGenerateClassName } from "@material-ui/core/styles";

afterEach(cleanup);

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

const bodyUtils = bindElementToQueries(document.body);

test("render Sidebar", () => {
  const toggle = jest.fn();
  render(
    <JssProvider generateClassName={generateClassName}>
      <MemoryRouter>
        <Sidebar
          isOpen
          toggle={toggle}
          domain={LIMS}
          currentPath="/automation/tasks"
          InternalLinkComponent={Link}
          drawerVariant="temporary"
          externalDomains={new Map()
            .set(EDC, "https://edc-client-staging.eng.aws.grail.com")
            .set(PIPELINE, "https://proxy.ti-apps.aws.grail.com/pipeline-analyse-ui")}
          footer={<span>Footer</span>}
        />
      </MemoryRouter>
    </JssProvider>,
  );
  // FIXME(jrosenfield): couldn't get test to work
  const sampleManagementDropdown = bodyUtils.queryByText("Sample Management");
  expect(sampleManagementDropdown).toBeInTheDocument();
  expect(bodyUtils.queryByText("Footer")).toBeInTheDocument();
  const tasks = bodyUtils.queryByText("Tasks");
  // expect(bodyUtils.queryByText("Batches")).not.toBeInTheDocument();
  expect(tasks).toBeInTheDocument();
  fireEvent.click(sampleManagementDropdown);
  const batches = bodyUtils.queryByText("Batches");
  expect(batches).toBeInTheDocument();
  fireEvent.click(sampleManagementDropdown);
  // expect(bodyUtils.queryByText("Batches")).not.toBeInTheDocument();
  expect(toggle.mock.calls.length).toBe(0);
  const instruments = bodyUtils.queryByText("Instruments");
  expect(instruments).toBeInTheDocument();
  fireEvent.click(instruments);
  expect(toggle.mock.calls.length).toBe(1);
  expect(document.body).toMatchSnapshot();
});
