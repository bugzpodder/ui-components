import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  grailBlue,
  grailGold,
  grailGrayLighter,
  grailGreen,
  grailPurpleDark,
  grailPurpleMed,
  grailRed,
  grailTan,
  white,
} from "@grailbio/lib";

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
    success: {
      main: grailGreen,
    },
    info: {
      main: grailBlue,
    },
    warning: {
      main: grailGold,
    },
  },
  overrides: {
    MuiTableRow: {
      head: {
        height: "50px",
      },
    },
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

export const StyleWrapper: React.FC = props => {
  const { children } = props;

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
