// @flow
import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import { Link, MemoryRouter } from "react-router-dom";
import { bindElementToQueries } from "dom-testing-library";
import { LIMS, EDC, PIPELINE } from "@grail/lib";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { Sidebar } from "./sidebar";

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
  expect(sampleManagementDropdown).toBeInTheDOM();
  expect(bodyUtils.queryByText("Footer")).toBeInTheDOM();
  const tasks = bodyUtils.queryByText("Tasks");
  // expect(bodyUtils.queryByText("Batches")).not.toBeInTheDOM();
  expect(tasks).toBeInTheDOM();
  fireEvent.click(sampleManagementDropdown);
  const batches = bodyUtils.queryByText("Batches");
  expect(batches).toBeInTheDOM();
  fireEvent.click(sampleManagementDropdown);
  // expect(bodyUtils.queryByText("Batches")).not.toBeInTheDOM();
  expect(toggle.mock.calls.length).toBe(0);
  const storage = bodyUtils.queryByText("Storage");
  expect(storage).toBeInTheDOM();
  fireEvent.click(storage);
  expect(toggle.mock.calls.length).toBe(1);
  expect(document.body).toMatchSnapshot();
});
