// @flow
import React, { type ElementConfig } from "react";
import styles from "./date-input.module.scss";
import { DATE_FORMAT } from "@grail/lib";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { formatDate } from "./components/formatted-date-time";

type Props = {
  /** When `true`, displays a read only input field using `ReadOnlyTextField` */
  readOnly?: boolean,
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean,
  /** Determines value used for the input. Takes a `moment` object */
  input?: string,
  /** Remains above the input field upon choosing a value */
  label?: string,
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD`. */
  format?: string,
  /** Text to display beneath the date input */
  helperText?: string,
} & ElementConfig<typeof KeyboardDatePicker>;

/** Provides component for common Date picker. */
export const DateInput = (props: Props) => {
  const {
    readOnly, showEmptyValue = false, value, onChange, format = DATE_FORMAT,
  } = props;
  if (readOnly) {
    return <ReadOnlyTextField showEmptyValue={showEmptyValue}>{formatDate(value, format)}</ReadOnlyTextField>;
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for DateInput");
  }
  return (
    <div className={styles.datePicker}>
      <KeyboardDatePicker
        clearable
        InputAdornmentProps={{ className: styles.adornmentWidth }}
        KeyboardButtonProps={{ "data-testid": "date-picker-button" }}
        data-testid="date-input"
        DialogProps={{
          "data-testid": "date-picker-dialog",
        }}
        autoOk
        {...props}
        onAccept={onChange}
        value={value || null}
        format={format}
      />
    </div>
  );
};
