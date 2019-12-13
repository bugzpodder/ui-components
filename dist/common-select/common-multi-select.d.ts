import React, { ComponentProps, ReactNode } from "react";
import { CommonSelectClasses, CommonSelectOption } from "../types/select";
import { CommonSelectComponent } from "./common-select-component";
declare type CommonMultiSelectProps = {
    /**
     * The function used to retrieve the values set by the select component.
     */
    onChange: (x0: CommonSelectOption[]) => any;
    /**
     * Tells the select which options to use as its values.
     * Strings should match the `value` properties of some objects in the options.
     */
    values: CommonSelectOption[];
    /**
     *
     * When `selectType="async"`, provides a list of initial options to display when no
     * results have been fetched.
     *
     */
    initialOptions?: CommonSelectOption[];
    /** Renders the input at its full width */
    isFullWidth?: boolean;
    /** Label for the select. */
    label?: string;
    /** Variant styles for the select component - "standard", "filled", "outlined" */
    variant?: "standard" | "filled" | "outlined";
    /** Margin types for the select component - "none", "dense", "normal". Default is "none" */
    margin?: "none" | "dense" | "normal";
    /** Text displayed directly under the input */
    helperText?: string;
    /**
     * Provides classNames to table sub-components. Options include:
     *
     *  - `root`: card root div element
     *
     *  - `input`: input component
     *
     *  - `label`: input label component
     *
     *  - `options`: option dropdown items
     */
    classes?: CommonSelectClasses;
    /** Provides an id to the component */
    id?: string;
    /** Provides a name to the component */
    name?: string;
    /** The initial message to display when `selectType` is `async` and no initial options are provided */
    initialMessage?: string;
    /** Disables the select from being used */
    isDisabled?: boolean;
    /** Renders a LinearProgress bar beneath the common select input */
    isLoading?: boolean;
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
    /**
     * CommonSelectOption objects for select.
     *
     * Each object must at least include a `label` and `value` key.
     * Required for `simple`, `creatable`
     * Optional initial options for `async`
     */
    options?: CommonSelectOption[];
    /** The content do display in the option menu item. Allows for customization of options to display
     * information from the data object. When null will default to the `label` provided in the option object.
     */
    formatOption?: (x0: CommonSelectOption) => ReactNode;
    /**
     * The function used to retrieve options asynchronously based on the user's input.
     *
     * Each object must at least include a `label` and `value` key
     */
    loadOptions?: (x0: string) => Promise<any>;
    /**
     * Whether the new input is valid.
     */
    isValidNewOption?: (input: string) => boolean;
} & Omit<ComponentProps<typeof CommonSelectComponent>, "defaultOptions" | "value" | "onChange">;
export declare const CommonMultiSelect: React.FC<CommonMultiSelectProps>;
export {};
