// @flow
import MomentUtils from "@date-io/moment";
import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiPickersUtilsProvider as OldMuiPickersUtilsProvider } from "material-ui-pickers";

export function wrapPickerUtilProvider<P>(WrappedComponent: React$ComponentType<P>, useOldPicker?: boolean) {
  return (props: P) => {
    return useOldPicker ? (
      <OldMuiPickersUtilsProvider utils={MomentUtils}>
        <WrappedComponent {...props} />
      </OldMuiPickersUtilsProvider>
    ) : (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <WrappedComponent {...props} />
      </MuiPickersUtilsProvider>
    );
  };
}
