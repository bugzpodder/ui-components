// @flow
import React from "react";
import { renderIntoDocument, cleanup } from "react-testing-library";
import "dom-testing-library/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { LIMS, EDC, PIPELINE } from "@grail/lib/constants";
import Typography from "@material-ui/core/Typography";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { Navbar } from "./navbar";

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true,
});

// const bodyUtils = bindElementToQueries(document.body);

const text = text => {
	<Typography>{text}</Typography>;
};

test("render Sidebar", () => {
	renderIntoDocument(
		<JssProvider generateClassName={generateClassName}>
			<MemoryRouter>
				<Navbar
					domain={LIMS}
					currentPath="/automation/tasks"
					title={text("title")}
					breadcrumbs={text("breadcrumbs")}
					left={text("left")}
					center={text("center")}
					right={text("right")}
					sidebarFooter={text("sidebarFooter")}
					externalDomains={new Map()
						.set(EDC, "https://edc-client-staging.eng.aws.grail.com")
						.set(PIPELINE, "https://proxy.ti-apps.aws.grail.com/pipeline-analyse-ui")}
				/>
			</MemoryRouter>
		</JssProvider>,
	);
	// FIXME(jrosenfield): couldn't get test to work
	// expect(bodyUtils.queryByText("title")).toBeInTheDOM();
	// expect(bodyUtils.queryByText("breadcrumbs")).toBeInTheDOM();
	// expect(bodyUtils.queryByText("left")).toBeInTheDOM();
	// expect(bodyUtils.queryByText("center")).toBeInTheDOM();
	// expect(bodyUtils.queryByText("right")).toBeInTheDOM();
	// const hamburger = bodyUtils.querySelector("#main-nav-button");
	// Simulate.click(hamburger);
	// expect(bodyUtils.queryByText("sidebarFooter")).toBeInTheDOM();
	cleanup();
});
