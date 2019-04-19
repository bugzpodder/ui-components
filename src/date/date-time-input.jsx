// @flow
import React, { type ElementConfig } from "react";
import moment from "moment";
import { DATE_TIME_FORMAT, DATE_TIME_INPUT_MASK } from "@grail/lib";
import { DateTimePicker } from "material-ui-pickers";
import { ReadOnlyTextField } from "../readonly-text-field";

type Props = {
  /** When `true`, displays a read only input field (ReadOnlyTextField) */
  readOnly?: boolean,
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean,
  /** Determines value used for input, moment object */
  input?: string,
  /** Remains above the input field upon choosing a value */
  label?: string,
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD HH:mm:ss`. */
  format?: string,
} & ElementConfig<typeof DateTimePicker>;

export const DateTimeInput = (props: Props) => {
  const {
    readOnly, showEmptyValue = false, value, format = DATE_TIME_FORMAT,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {props.value ? moment(props.value).format(DATE_TIME_FORMAT) : ""}
      </ReadOnlyTextField>
    );
  }
  return (
    <DateTimePicker
      ampm={false}
      keyboard
      clearable
      data-testid="date-time-input"
      DialogProps={{
        "data-testid": "date-time-picker-dialog",
      }}
      autoOk
      mask={DATE_TIME_INPUT_MASK}
      {...props}
      value={value || null}
      format={format}
    />
  );
};
