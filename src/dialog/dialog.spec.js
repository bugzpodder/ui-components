// @flow
import React from "react";
import { renderIntoDocument, cleanup, Simulate } from "react-testing-library";
import { bindElementToQueries } from "dom-testing-library";
import { TestWrapper } from "@grail/components";
import { CommonDialog } from "./index";

const bodyUtils = bindElementToQueries(document.body);

test("render dialog", () => {
	const mockCallback = jest.fn();
	renderIntoDocument(
		<TestWrapper>
			<CommonDialog
				actions={[
					{ id: "action-button", name: "action one", callback: jest.fn() },
					{ name: "action two", callback: jest.fn() },
				]}
				title="test"
				isVisible={true}
				hideModal={mockCallback}
			>
				Test Content
			</CommonDialog>
		</TestWrapper>,
	);
	Simulate.click(bodyUtils.getByText("Close"));
	expect(mockCallback).toBeCalled();
	expect(document.body).toMatchSnapshot();
	cleanup();
});
