// @flow
import React, { type ElementConfig } from "react";
import moment from "moment";
import styles from "./date-input.module.scss";
import { DATE_FORMAT, DATE_INPUT_MASK } from "@grail/lib";
import { DatePicker } from "material-ui-pickers";
import { ReadOnlyTextField } from "../readonly-text-field";

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
} & ElementConfig<typeof DatePicker>;

/** Provides component for common Date picker. */
export const DateInput = (props: Props) => {
  const {
    readOnly, showEmptyValue = false, value, format = DATE_FORMAT,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {props.value ? moment(props.value).format(DATE_FORMAT) : ""}
      </ReadOnlyTextField>
    );
  }
  return (
    <div className={styles.datePicker}>
      <DatePicker
        keyboard
        clearable
        InputAdornmentProps={{ className: styles.adornmentWidth }}
        data-testid="date-input"
        DialogProps={{
          "data-testid": "date-picker-dialog",
        }}
        autoOk
        mask={DATE_INPUT_MASK}
        {...props}
        value={value || null}
        format={format}
      />
    </div>
  );
};
