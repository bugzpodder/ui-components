import React, { ComponentProps, ReactNode, RefObject } from "react";
import { Autocomplete } from "@material-ui/lab";
import { CommonSelectOption } from "../types/select";
declare type Props = {
    /** The current value of common select, or an array of options for common multi-select */
    value?: CommonSelectOption | CommonSelectOption[] | null;
    /** Renders the input at its full width */
    isFullWidth?: boolean;
    /** Renders the input at its full width */
    helperText?: string;
    /** Provides an id to the component */
    id?: string;
    /** Provides a name to the component */
    name?: string;
    /** Provides a data-testid to the component */
    "data-testid"?: string;
    /** The initial message to display when no initial options are provided */
    initialMessage?: string;
    /** When false, removes the button provided to clear the selected option in the input field */
    isClearable?: boolean;
    /** Disables the select from being used */
    isDisabled?: boolean;
    /** automatically opens menu */
    menuIsOpen?: boolean;
    /** Called to set the new value */
    onChange: (value: any) => void;
    /** Label for the select. */
    label?: string;
    /** Variant styles for the select component - "standard", "filled", "outlined" */
    variant?: "standard" | "filled" | "outlined";
    /** Margin types for the select component - "none", "dense", "normal". Default is "none" */
    margin?: "none" | "dense" | "normal";
    /** The text displayed in the input before the user begins typing */
    placeholder?: string;
    /**
     * default (`simple`): synchronous - user is forced to choose an option from the options
     * (requires `options` prop).
     *
     * `creatable`: allows user to create new entries that are not in the options list (requires `options` prop).
     *
     * `async`: allows for asynchronous retrieval of options based on the user's input
     *  (requires `loadOptions` prop).
     */
    selectType?: "simple" | "async" | "creatable";
    /** Displays the input in an error state */
    showError?: boolean;
    /** Renders a LinearProgress bar beneath the common select input */
    isLoading?: boolean;
    /** The content do display in the option menu item. Allows for customization of options to display
     * information from the data object. When null will default to the `label` provided in the option object.
     */
    formatOption?: (x0: CommonSelectOption) => ReactNode;
    /** Provides the ability to support multiple selections */
    isMulti?: boolean;
    /** Options for the common select, or the initial options for async select */
    options?: CommonSelectOption[];
    /**
     * The function used to retrieve options asynchronously based on the user's input.
     *
     * Each object must at least include a `label` and `value` key
     */
    loadOptions?: (x0: string) => Promise<any>;
    /** Ref passed to the input element */
    inputRef?: RefObject<HTMLElement>;
} & Omit<ComponentProps<typeof Autocomplete>, "onChange" | "renderInput">;
export declare const CommonSelectComponent: React.FC<Props>;
export {};
