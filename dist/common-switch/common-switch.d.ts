import React from "react";
import { CommonSwitchClasses } from "../types/switch";
declare type Props = {
    /** Returns the status of the switch, and the value if one exists */
    onChange: (x0: boolean, x1: any) => any;
    /** Determines the color of the switch. Options include "primary" and "secondary" */
    color?: "primary" | "secondary";
    /** The id given to the switch */
    id?: string;
    /** When `true`, displays the switch in an error state */
    showError?: boolean;
    /** Provides a helper text under the switch */
    helperText?: string;
    /** Provides a label to the right of the switch */
    label?: string;
    /** When `false`, disables the switch */
    isEnabled?: boolean;
    /** Allows the programmer to take control of the selected state of the switch */
    isSelected?: boolean;
    /** The value of the switch input if one is provided */
    value?: string;
    /**
     * Provides classNames to the switch's sub-components. Options include:
     *
     *  - `root`: switch's outermost div
     *
     *  - `label`: switch label
     */
    classes?: CommonSwitchClasses;
};
/** `CommonSwitch` renders a Material-UI switch component */
export declare const CommonSwitch: React.FC<Props>;
export {};
