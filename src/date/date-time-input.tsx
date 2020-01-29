import React from "react";
import { DATE_TIME_INPUT_MASK } from "@grailbio/lib";
import { DateTimePicker } from "material-ui-pickers";
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "material-ui-pickers/typings/date";
import { ReadOnlyTextField } from "../readonly-text-field";
import {
  useDateFormat,
  useFormattedDateForDisplay,
  useParsedDate,
} from "./picker-util-provider-hoc";

type Props = {
  /** When `true`, displays a read only input field (ReadOnlyTextField) */
  readOnly?: boolean;
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean;
  /** Determines value used for input */
  input?: string;
  /** Remains above the input field upon choosing a value */
  label?: string;
  /** String that specifies the format of the date field. Defaults to `YYYY-MM-DD HH:mm:ss`. */
  format?: string;
  useOldPicker?: boolean;
  /** Callback when the value changed.  Optional for readonly component. */
  onChange?: (x0: MaterialUiPickersDate) => void;
} & Omit<KeyboardDateTimePickerProps, "onChange">;

export const DateTimeInput: React.FC<Props> = props => {
  const { defaultDateTimeFormat } = useDateFormat();
  const {
    readOnly,
    showEmptyValue = false,
    value,
    useOldPicker,
    onChange,
    format = defaultDateTimeFormat,
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
      // @ts-ignore string | (string | RegExp)[] is not assignable to type.
      mask={DATE_TIME_INPUT_MASK}
      {...props}
      value={parsedDate}
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
      value={parsedDate}
      format={format}
    />
  );
};
