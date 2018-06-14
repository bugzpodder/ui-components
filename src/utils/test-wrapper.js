// @flow
import React, { type Node } from "react";
// $FlowFixMe: there is no createGenerateClassName export in @material-ui/core/styles
import { createGenerateClassName } from "@material-ui/core/styles";
// $FlowFixMe: Cannot resolve module react-jss/lib/JssProvider
import JssProvider from "react-jss/lib/JssProvider";
import "@grail/lib/src/client-utils/mocks";

type Props = {
	children: Node<*>,
};

const generateClassName = createGenerateClassName({
	dangerouslyUseGlobalCSS: true,
});

export const TestWrapper = (props: Props) => {
	const { children } = props;
	return <JssProvider generateClassName={generateClassName}>{children}</JssProvider>;
};
