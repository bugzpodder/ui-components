import React from "react";
import { KeyboardDateTimePickerProps } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "material-ui-pickers/typings/date";
declare type Props = {
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
export declare const DateTimeInput: React.FC<Props>;
export {};
