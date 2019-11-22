import React from "react";
import { KeyboardTimePickerProps } from "@material-ui/pickers";
declare type Props = {
    /** When `true`, displays a read only input field using `ReadOnlyTextField` */
    readOnly?: boolean;
    /** Used for read only input field, see ReadOnlyTextField. */
    showEmptyValue?: boolean;
    /** Determines value used for the input. */
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
export declare const TimeInput: React.FC<Props>;
export {};
