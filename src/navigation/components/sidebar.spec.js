// @flow
import React from "react";
import { renderIntoDocument, cleanup, Simulate } from "react-testing-library";
import "dom-testing-library/extend-expect";
import { Link, MemoryRouter } from "react-router-dom";
import { bindElementToQueries } from "dom-testing-library";
import { LIMS, EDC, PIPELINE } from "@grail/lib/constants";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { Sidebar } from "./sidebar";

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true,
});

const bodyUtils = bindElementToQueries(document.body);

test("render Sidebar", () => {
	const toggle = jest.fn();
	renderIntoDocument(
		<JssProvider generateClassName={generateClassName}>
			<MemoryRouter>
				<Sidebar
					isOpen={true}
					toggle={toggle}
					domain={LIMS}
					currentPath="/automation/tasks"
					InternalLinkComponent={Link}
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
	Simulate.click(sampleManagementDropdown);
	const batches = bodyUtils.queryByText("Batches");
	expect(batches).toBeInTheDOM();
	Simulate.click(sampleManagementDropdown);
	// expect(bodyUtils.queryByText("Batches")).not.toBeInTheDOM();
	expect(toggle.mock.calls.length).toBe(0);
	const storage = bodyUtils.queryByText("Storage");
	expect(storage).toBeInTheDOM();
	Simulate.click(storage);
	expect(toggle.mock.calls.length).toBe(1);
	expect(document.body).toMatchSnapshot();
	cleanup();
});
