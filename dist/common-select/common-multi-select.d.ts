import React, { ComponentProps } from "react";
import { CommonSelectComponent } from "./common-select-component";
import { CommonSelectOption } from "../types/select";
declare type CommonMultiSelectProps = {
    /**
     * The function used to retrieve the values set by the select component.
     */
    onChange: (x0: CommonSelectOption[]) => void;
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
    /**
     * Whether the new input is valid.
     */
    isValidNewOption?: (input: string) => boolean;
    /** displays component as read only */
    readOnly?: boolean;
} & Omit<ComponentProps<typeof CommonSelectComponent>, "onChange">;
export declare const CommonMultiSelect: React.FC<CommonMultiSelectProps>;
export {};
