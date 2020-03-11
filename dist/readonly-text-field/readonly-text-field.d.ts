import React from "react";
declare type Props = {
    /** Id of the element. */
    id?: string;
    /** classname applied to the textfield */
    className?: string;
    /** When specified, displays the chosen material-ui icon as a Font Icon. */
    icon?: string;
    /** Displays the text as a disabled Material-UI TextField */
    isDisabled?: boolean;
    /** When `true`, displays the empty value as is. Otherwise displays "-" in place of the empty value. */
    showEmptyValue?: boolean;
};
/** Provides a styled component for displaying read-only input fields. */
export declare const ReadOnlyTextField: React.FC<Props>;
export {};
