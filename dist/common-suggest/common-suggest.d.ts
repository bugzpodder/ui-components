import React, { ComponentProps, ReactNode } from "react";
import { Autocomplete } from "@material-ui/lab";
declare type Props = {
    /** The input id */
    id?: string;
    /** Placeholder */
    placeholder?: string;
    /** Array of suggestion strings */
    suggestions: string[];
    /** Currently entered value as shown in the input field. Could include commas, indicating an array */
    value: string;
    /** Called to set the new value */
    onChange: (value: string) => void;
    /** Called to set the new input value.  If onInputChange is not provided, onChange is called. */
    onInputChange?: (value: string) => void;
    /** Called when user hits enter */
    onEnter?: () => any;
    /** Additional actions at the bottom of the suggestion Popper */
    actions?: ReactNode;
} & Omit<ComponentProps<typeof Autocomplete>, "renderInput" | "onChange" | "onInputChange">;
export declare const CommonSuggest: React.FC<Props>;
export {};
