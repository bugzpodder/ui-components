// @flow
import React from "react";
import { render } from "react-testing-library";

import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import { suggestionsContainer } from "./suggestions-container";

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true,
});

test("render suggestion component", () => {
	const { container } = render(
		<JssProvider generateClassName={generateClassName}>{suggestionsContainer({})}</JssProvider>,
	);
	expect(container).toMatchSnapshot();
});
