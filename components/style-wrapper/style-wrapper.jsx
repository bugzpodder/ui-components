// @flow
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { type Node } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grailGrayLightest, grailPurpleDark, grailPurpleMed, grailRed, grailTan, white } from "@grail/lib/constants";

type Props = {
	children: Node,
};

// See https://material-ui-next.com/customization/default-theme/
const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: grailPurpleDark,
			light: grailPurpleMed,
			contrastText: white,
		},
		secondary: {
			main: grailTan,
			contrastText: grailGrayLightest,
		},
		error: {
			main: grailRed,
			contrastText: grailGrayLightest,
		},
	},
	overrides: {
		// https://github.com/mui-org/material-ui/issues/10735
		MuiTooltip: {
			popper: {
				pointerEvents: "none",
				"&$open": {
					pointerEvents: "none",
				},
			},
		},
	},
});

export function StyleWrapper(props: Props) {
	const { children } = props;

	return (
		<MuiThemeProvider theme={customTheme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
