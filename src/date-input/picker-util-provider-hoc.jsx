// @flow
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import React from "react";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

export function wrapPickerUtilProvider<P>(WrappedComponent: React$ComponentType<P>): React$ComponentType<P> {
  return (props: P) => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <WrappedComponent {...props} />
      </MuiPickersUtilsProvider>
    );
  };
}
