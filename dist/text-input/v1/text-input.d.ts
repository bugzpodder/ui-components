import React, { ElementType } from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
declare type Props = {
    /** If true, displays a read-only input field (`ReadOnlyTextField`). */
    readOnly?: boolean;
    /** If readOnly is true, display this component rather than ReadOnlyTextField. */
    ReadOnlyComponent?: ElementType;
    /** props for the ReadOnlyComponent */
    readOnlyComponentProps?: {
        [x: string]: any;
    };
    /** Used for read only input field, see `ReadOnlyTextField`. */
    showEmptyValue?: boolean;
    /** Id of the element. */
    id?: string;
    /** Classes to pass to the element. */
    className?: string;
} & TextFieldProps;
/** `TextInput` is a wrapper around Material UI's `TextField` which allows `readOnly` as a property. */
export declare const TextInput: React.FC<Props>;
export {};
