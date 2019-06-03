// @flow
import MomentUtils from "@date-io/moment";
import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

export function wrapPickerUtilProvider<P>(WrappedComponent: React$ComponentType<P>) {
  return (props: P) => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <WrappedComponent {...props} />
      </MuiPickersUtilsProvider>
    );
  };
}
