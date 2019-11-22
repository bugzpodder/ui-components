import MomentUtils from "@date-io/moment";
import React, { ComponentType, useContext } from "react";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_UNICODE_FORMAT,
  DATE_UNICODE_FORMAT,
} from "@grailbio/lib";
import {
  MuiPickersContext,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  MuiPickersContext as OldMuiPickersContext,
  MuiPickersUtilsProvider as OldMuiPickersUtilsProvider,
} from "material-ui-pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

export function wrapPickerUtilProvider<P>(
  WrappedComponent: ComponentType<P>,
  useOldPicker = false,
  utils = MomentUtils,
) {
  return (props: P) => {
    return useOldPicker ? (
      <OldMuiPickersUtilsProvider utils={utils}>
        <WrappedComponent {...props} />
      </OldMuiPickersUtilsProvider>
    ) : (
      <MuiPickersUtilsProvider utils={utils}>
        <WrappedComponent {...props} />
      </MuiPickersUtilsProvider>
    );
  };
}

export const useMuiPickersContext = () => {
  const utils = useContext(MuiPickersContext);
  const oldUtils = useContext(OldMuiPickersContext);

  return utils || oldUtils;
};

export const useDateFormat = () => {
  const dateUtils = useMuiPickersContext();
  if (
    dateUtils &&
    dateUtils.yearFormat &&
    DATE_UNICODE_FORMAT.indexOf(dateUtils.yearFormat) >= 0
  ) {
    return {
      defaultDateFormat: DATE_UNICODE_FORMAT,
      defaultDateTimeFormat: DATE_TIME_UNICODE_FORMAT,
    };
  }

  return {
    defaultDateFormat: DATE_FORMAT,
    defaultDateTimeFormat: DATE_TIME_FORMAT,
  };
};

export const useFormattedDateForDisplay = (
  value: ParsableDate,
  format: string,
): string => {
  const dateUtils = useMuiPickersContext();
  const date = dateUtils ? dateUtils.date(value) : value;
  if (value && dateUtils && dateUtils.isValid(date)) {
    return dateUtils.format(date, format);
  }
  return "";
};
