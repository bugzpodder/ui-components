// @flow
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { type Node } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  grailGrayLighter, grailPurpleDark, grailPurpleMed, grailRed, grailTan, white,
} from "@grailbio/lib";

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
  overrides: {
    MuiButton: {
      root: {
        // Set the default color.
        color: grailPurpleDark,
      },
    },
  },
  typography: {
    button: {
      fontWeight: 800,
    },
  },
});

export const StyleWrapper = (props: Props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
