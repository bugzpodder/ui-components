// @flow
import React from "react";
import { render, Simulate } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "@grail/components/src/utils";
import { CommonTypeahead } from "./index";

test("render typeahead", () => {
	const { container, getByPlaceholderText } = render(
		<TestWrapper>
			<CommonTypeahead
				placeholder="Test Typeahead"
				className="test"
				suggestions={["This", "is", "a", "test"]} />
		</TestWrapper>,
	);
	const inputField = getByPlaceholderText("Test Typeahead");
	const keyboardT = { eventType: "T" };
	const keyboardTab = { eventType: "Tab" };
	Simulate.keyDown(inputField, keyboardT);
	Simulate.keyDown(inputField, keyboardTab);
	expect(container).toMatchSnapshot();
});
