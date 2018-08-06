// @flow
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import React from "react";

export function wrapPickerUtilProvider<P>(WrappedComponent: React$ComponentType<P>): React$ComponentType<P> {
  return (props: P) => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <WrappedComponent {...props} />
      </MuiPickersUtilsProvider>
    );
  };
}
