// @flow
import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "dom-testing-library/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { LIMS, EDC, PIPELINE } from "@grail/lib";
import Typography from "@material-ui/core/Typography";
import { bindElementToQueries } from "dom-testing-library";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { Navbar } from "./navbar";

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
