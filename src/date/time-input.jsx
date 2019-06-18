// @flow
import React, { type ElementConfig } from "react";
import styles from "./time-input.module.scss";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { TIME_FORMAT } from "@grail/lib";
import { TimePicker } from "material-ui-pickers";
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
  /** String that specifies the format of the time field. Defaults to `YYYY-MM-DD`. */
  format?: string,
  /** Text to display beneath the time input */
  helperText?: string,
  /** Input Value */
  value?: string,
  useOldPicker?: boolean,
} & ElementConfig<typeof KeyboardTimePicker>;

/** Provides component for common Time picker. */
export const TimeInput = (props: Props) => {
  const {
    readOnly, showEmptyValue = false, value, useOldPicker, onChange, format = TIME_FORMAT,
  } = props;
  if (readOnly) {
    return <ReadOnlyTextField showEmptyValue={showEmptyValue}>{formatDate(value, format)}</ReadOnlyTextField>;
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for TimeInput");
  }
  return useOldPicker ? (
    <div className={styles.timePicker}>
      <TimePicker
        keyboard
        clearable
        InputAdornmentProps={{ className: styles.adornmentWidth }}
        KeyboardButtonProps={{ "data-testid": "time-picker-button" }}
        data-testid="time-input"
        DialogProps={{
          "data-testid": "time-picker-dialog",
        }}
        autoOk
        {...props}
        onAccept={onChange}
        value={value || null}
        format={format}
      />
    </div>
  ) : (
    <div className={styles.timePicker}>
      <KeyboardTimePicker
        clearable
        InputAdornmentProps={{ className: styles.adornmentWidth }}
        KeyboardButtonProps={{ "data-testid": "time-picker-button" }}
        data-testid="time-input"
        DialogProps={{
          "data-testid": "time-picker-dialog",
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
