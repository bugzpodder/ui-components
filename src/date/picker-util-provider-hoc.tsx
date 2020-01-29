import React, { ComponentType, useContext } from "react";
import isString from "lodash/isString";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_UNICODE_FORMAT,
  DATE_UNICODE_FORMAT,
  parseDate,
} from "@grailbio/lib";
import { IUtils } from "@date-io/core/IUtils";
import { MaterialUiPickersDate } from "material-ui-pickers/typings/date";
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
  utils,
  useOldPicker = false,
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

export const useMuiPickersContext = (): IUtils<any> => {
  const utils = useContext(MuiPickersContext);
  const oldUtils = useContext(OldMuiPickersContext);

  return utils || oldUtils;
};

export const useDateFormat = (): {
  defaultDateFormat: string;
  defaultDateTimeFormat: string;
} => {
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

export const useParsedDate = (value: ParsableDate): MaterialUiPickersDate => {
  const { defaultDateFormat } = useDateFormat();
  const dateUtils = useMuiPickersContext();
  if (!dateUtils || !value || !dateUtils.isValid(value)) {
    return null;
  }

  const parsedDate =
    defaultDateFormat === DATE_UNICODE_FORMAT && isString(value)
      ? parseDate(value)
      : dateUtils.date(value);

  return dateUtils.isValid(parsedDate) ? parsedDate : null;
};

export const useFormattedDateForDisplay = (
  value: ParsableDate,
  format: string,
): string => {
  const dateUtils = useMuiPickersContext();
  const parsedDate = useParsedDate(value);
  return dateUtils && parsedDate ? dateUtils.format(parsedDate, format) : "";
};
