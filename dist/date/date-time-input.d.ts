import React from "react";
import { KeyboardDateTimePickerProps } from "@material-ui/pickers";
declare type Props = {
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
export declare const DateTimeInput: React.FC<Props>;
export {};
