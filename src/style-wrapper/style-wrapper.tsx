import CssBaseline from "@material-ui/core/CssBaseline";
import React, { ReactNode } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
  grailGrayLighter,
  grailPurpleDark,
  grailPurpleMed,
  grailRed,
  grailTan,
  white,
} from "@grailbio/lib";

type Props = {
  children: ReactNode;
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

export const StyleWrapper: React.FC<Props> = props => {
  const { children } = props;

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
