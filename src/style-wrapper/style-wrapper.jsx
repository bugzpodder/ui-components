// @flow
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { type Node } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  grailGrayLighter, grailPurpleDark, grailPurpleMed, grailRed, grailTan, white,
} from "@grail/lib";

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
      contrastText: grailGrayLighter,
    },
    error: {
      main: grailRed,
      contrastText: grailGrayLighter,
    },
  },
  // See https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: {
    useNextVariants: true,
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
