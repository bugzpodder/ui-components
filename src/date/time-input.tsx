import React from "react";

import classNames from "classnames";
import styles from "./time-input.module.scss";
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { TIME_FORMAT } from "@grailbio/lib";
import { TimePicker } from "material-ui-pickers";
import { formatDate } from "./components/formatted-date-time";

type Props = {
  /** When `true`, displays a read only input field using `ReadOnlyTextField` */
  readOnly?: boolean;
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean;
  /** Determines value used for the input. Takes a `moment` object */
  input?: string;
  /** Remains above the input field upon choosing a value */
  label?: string;
  /** String that specifies the format of the time field. Defaults to `YYYY-MM-DD`. */
  format?: string;
  /** Text to display beneath the time input */
  helperText?: string;
  /** Input Value */
  value?: string;
  useOldPicker?: boolean;
} & KeyboardTimePickerProps;

/** Provides component for common Time picker. */
export const TimeInput: React.FC<Props> = props => {
  const {
    readOnly,
    showEmptyValue = false,
    value,
    useOldPicker,
    onChange,
    format = TIME_FORMAT,
    className,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {formatDate(value, format)}
      </ReadOnlyTextField>
    );
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for TimeInput");
  }
  return useOldPicker ? (
    // @ts-ignore TimePicker and KeyboardTimePicker has slighty different props.
    <TimePicker
      keyboard
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "time-picker-button",
      }}
      data-testid="time-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "time-picker-dialog",
      }}
      autoOk
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      value={value || null}
      format={format}
    />
  ) : (
    <KeyboardTimePicker
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "time-picker-button",
      }}
      data-testid="time-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "time-picker-dialog",
      }}
      autoOk
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      onAccept={onChange}
      value={value || null}
      format={format}
    />
  );
};
