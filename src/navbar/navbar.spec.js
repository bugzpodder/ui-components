// @flow
import "jest-dom/extend-expect";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { EDC, LIMS, PIPELINE } from "@grail/lib";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./navbar";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";
import { createGenerateClassName } from "@material-ui/core/styles";

afterEach(cleanup);

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

const bodyUtils = bindElementToQueries(document.body);

const wrapText = text => {
  return <Typography>{text}</Typography>;
};

test("render Sidebar", () => {
  render(
    <JssProvider generateClassName={generateClassName}>
      <MemoryRouter>
        <Navbar
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
    </JssProvider>,
  );
  expect(bodyUtils.queryByText("title")).toBeInTheDOM();
  expect(bodyUtils.queryByText("breadcrumbs")).toBeInTheDOM();
  expect(bodyUtils.queryByText("left")).toBeInTheDOM();
  expect(bodyUtils.queryByText("center")).toBeInTheDOM();
  expect(bodyUtils.queryByText("right")).toBeInTheDOM();
  const hamburger = bodyUtils.queryByTestId("main-nav-button");
  fireEvent.click(hamburger);
  expect(bodyUtils.queryByText("sidebarFooter")).toBeInTheDOM();
});
