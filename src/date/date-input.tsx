import React from "react";
import classNames from "classnames";
import styles from "./date-input.module.scss";
import { DATE_INPUT_MASK } from "@grailbio/lib";
import { DatePicker } from "material-ui-pickers";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import {
  useDateFormat,
  useFormattedDateForDisplay,
  useParsedDate,
} from "./picker-util-provider-hoc";

type Props = {
  /** When `true`, displays a read only input field using `ReadOnlyTextField` */
  readOnly?: boolean;
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean;
  /** Determines value used for the input. */
  input?: string;
  /** Remains above the input field upon choosing a value */
  label?: string;
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD`. */
  format?: string;
  /** Text to display beneath the date input */
  helperText?: string;
  useOldPicker?: boolean;
} & KeyboardDatePickerProps;

/** Provides component for common Date picker. */
export const DateInput = (props: Props) => {
  const { defaultDateFormat } = useDateFormat();
  const {
    readOnly,
    showEmptyValue = false,
    value,
    useOldPicker,
    onChange,
    format = defaultDateFormat,
    className,
  } = props;

  const parsedDate = useParsedDate(value);
  const formattedDate = useFormattedDateForDisplay(value, format);

  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {formattedDate || value}
      </ReadOnlyTextField>
    );
  }

  if (!onChange) {
    throw new Error("onChange must be defined for DateInput");
  }

  return useOldPicker ? (
    // @ts-ignore: DatePicker and KeyboardDatePicker has slightly different props.
    <DatePicker
      keyboard
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-button",
      }}
      data-testid="date-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-dialog",
      }}
      autoOk
      // @ts-ignore string | (string | RegExp)[] is not assignable to type.
      mask={DATE_INPUT_MASK}
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      value={parsedDate}
      format={format}
    />
  ) : (
    <KeyboardDatePicker
      clearable
      InputAdornmentProps={{ className: styles.adornmentWidth }}
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-button",
      }}
      data-testid="date-input"
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-picker-dialog",
      }}
      autoOk
      {...props}
      className={classNames(className, styles.textFieldWidth)}
      onAccept={onChange}
      value={parsedDate}
      format={format}
    />
  );
};
