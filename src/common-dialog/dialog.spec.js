// @flow
import React from "react";
import { renderIntoDocument, cleanup, Simulate } from "react-testing-library";
import { bindElementToQueries } from "dom-testing-library";
import { TestWrapper } from "@grail/components/src/utils";
import { CommonDialog, CommonMultiPageDialog } from "./index";

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

test("render multi page dialog", () => {
	const mockCallback = jest.fn();
	renderIntoDocument(
		<TestWrapper>
			<CommonMultiPageDialog
				actions={[
					{ id: "action-button", name: "action one", callback: jest.fn(), pages: [0] },
					{ id: "action-button", name: "action two", callback: jest.fn(), pages: [1] },
				]}
				title="test"
				isVisible={true}
				hideModal={jest.fn()}
				pages={[
					<div
						key="0"
						data-testid="page">
						Page 1
					</div>,
					<div
						key="1"
						data-testid="page">
						Page 2
					</div>,
				]}
				pageIndex={1}
				setPage={mockCallback}
			>
				Test Content
			</CommonMultiPageDialog>
		</TestWrapper>,
	);
	Simulate.click(bodyUtils.getByText("Back"));
	expect(mockCallback).toBeCalled();
	expect(document.body).toMatchSnapshot();
	cleanup();
});
