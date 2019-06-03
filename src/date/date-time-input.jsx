// @flow
import React, { type ElementConfig } from "react";
import { DATE_TIME_FORMAT } from "@grail/lib";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { formatDate } from "./components/formatted-date-time";

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
} & ElementConfig<typeof KeyboardDateTimePicker>;

export const DateTimeInput = (props: Props) => {
  const {
    readOnly, showEmptyValue = false, value, onChange, format = DATE_TIME_FORMAT,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>{formatDate(props.value, DATE_TIME_FORMAT)}</ReadOnlyTextField>
    );
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for DateTimeInput");
  }
  return (
    <KeyboardDateTimePicker
      ampm={false}
      clearable
      data-testid="date-time-input"
      KeyboardButtonProps={{ "data-testid": "date-time-picker-button" }}
      DialogProps={{
        "data-testid": "date-time-picker-dialog",
      }}
      autoOk
      {...props}
      onAccept={onChange}
      value={value || null}
      format={format}
    />
  );
};
