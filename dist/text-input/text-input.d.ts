import React, { ElementType } from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
declare type Props = {
    /** If true, displays the field as read-only (with label and helper text). */
    readOnly?: boolean;
    /** Custom readOnly default value. Default to "-". It could be set explicitly to empty value, e.g. "". */
    readOnlyDefaultValue?: any;
    /** If readOnly is true, display this component rather than the default Material-UI TextField. */
    ReadOnlyComponent?: ElementType;
    /** props passed in to the ReadOnlyComponent */
    readOnlyComponentProps?: Record<string, any>;
    /** ID of the element. */
    id?: string;
    /** Classes to pass to the element. */
    className?: string;
    /** Data test id */
    "data-testid"?: string;
    /** The displayed style of the TextInput component. Defaults to "filled" */
    variant?: "filled" | "standard" | "outlined";
} & TextFieldProps;
/** TextInput is a wrapper around Material UI's TextField component. */
export declare const TextInput: React.FC<Props>;
export {};
