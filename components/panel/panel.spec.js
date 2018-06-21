// @flow
import React from "react";
import { render } from "react-testing-library";
import { TestWrapper } from "@grail/components/components";
import { CommonPanel } from "./index";
import "jest-dom/extend-expect";

test("render validated readonly text field", async () => {
	const testTitle = "panel title";
	const testBody = "panel body";
	const { container, getByTestId } = render(
		<TestWrapper>
			<CommonPanel title={testTitle}>{testBody}</CommonPanel>
		</TestWrapper>,
	);
	expect(getByTestId("panel-title")).toHaveTextContent(testTitle);
	expect(getByTestId("panel-body")).toHaveTextContent(testBody);
	expect(container).toMatchSnapshot();
});
