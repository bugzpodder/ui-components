import React from "react";

import { DATE_TIME_FORMAT, DATE_TIME_INPUT_MASK } from "@grailbio/lib";
import { DateTimePicker } from "material-ui-pickers";
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from "@material-ui/pickers";
import { ReadOnlyTextField } from "../readonly-text-field";
import { formatDate } from "./components/formatted-date-time";

type Props = {
  /** When `true`, displays a read only input field (ReadOnlyTextField) */
  readOnly?: boolean;
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean;
  /** Determines value used for input, moment object */
  input?: string;
  /** Remains above the input field upon choosing a value */
  label?: string;
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD HH:mm:ss`. */
  format?: string;
  useOldPicker?: boolean;
} & KeyboardDateTimePickerProps;

export const DateTimeInput: React.FC<Props> = props => {
  const {
    readOnly,
    showEmptyValue = false,
    value,
    useOldPicker,
    onChange,
    format = DATE_TIME_FORMAT,
  } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {formatDate(props.value, DATE_TIME_FORMAT)}
      </ReadOnlyTextField>
    );
  }
  if (!props.onChange) {
    throw new Error("onChange must be defined for DateTimeInput");
  }

  return useOldPicker ? (
    // @ts-ignore KeyboardDateTimePicker and DateTimePicker has slightly different props
    <DateTimePicker
      ampm={false}
      keyboard
      clearable
      data-testid="date-time-input"
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-time-picker-button",
      }}
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-time-picker-dialog",
      }}
      autoOk
      mask={DATE_TIME_INPUT_MASK}
      {...props}
      value={value || null}
      format={format}
    />
  ) : (
    <KeyboardDateTimePicker
      ampm={false}
      clearable
      data-testid="date-time-input"
      KeyboardButtonProps={{
        // @ts-ignore: data-testid is not assignable.
        "data-testid": "date-time-picker-button",
      }}
      DialogProps={{
        // @ts-ignore: data-testid is not assignable.
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
