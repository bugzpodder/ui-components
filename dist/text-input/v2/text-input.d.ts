import React from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
declare type Props = {
    /** If true, displays the field as read-only (with label and helper text). */
    readOnly?: boolean;
    /** Custom readOnly default value. Default to "-". It could be set explicitly to empty value, e.g. "". */
    readOnlyDefaultValue?: any;
    /** ID of the element. */
    id?: string;
    /** Classes to pass to the element. */
    className?: string;
    /** Data test id */
    "data-testid"?: string;
} & TextFieldProps;
/** TextInputV2 is a wrapper around the filled variant of Material UI's
TextField that accepts "readOnly" as a property.
*/
export declare const TextInputV2: React.FC<Props>;
export {};
