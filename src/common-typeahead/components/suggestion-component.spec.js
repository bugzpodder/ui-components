// @flow
import React from "react";
import { render } from "react-testing-library";

import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { suggestionComponent } from "./suggestion-component";

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true,
});

test("render suggestion component", () => {
	const { container } = render(
		<JssProvider generateClassName={generateClassName}>
			{suggestionComponent("Test", { isHighlighted: false, query: "te" })}
		</JssProvider>,
	);
	expect(container).toMatchSnapshot();
});

test("render highlighted suggestion component", () => {
	const { container } = render(
		<JssProvider generateClassName={generateClassName}>
			{suggestionComponent("Test", { isHighlighted: true, query: "te" })}
		</JssProvider>,
	);
	expect(container).toMatchSnapshot();
});
