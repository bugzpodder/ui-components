import React from "react";
import { KeyboardDatePickerProps } from "@material-ui/pickers";
declare type Props = {
    /** When `true`, displays a read only input field using `ReadOnlyTextField` */
    readOnly?: boolean;
    /** Used for read only input field, see ReadOnlyTextField. */
    showEmptyValue?: boolean;
    /** Determines value used for the input. Takes a `moment` object */
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
export declare const DateInput: React.FC<Props>;
export {};
