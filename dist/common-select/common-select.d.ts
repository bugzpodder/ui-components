import React, { ComponentProps } from "react";
import { CommonSelectComponent } from "./common-select-component";
import { CommonSelectOption } from "../types/select";
declare type CommonSelectProps = {
    /**
     * The function used to retrieve the value set by the select component.
     */
    onChange: (x0: CommonSelectOption) => any;
    /**
     * Tells the select which option to use as its value.
     * String should match the `value` property of an object in a option.
     */
    value?: CommonSelectOption;
    /**
     *
     * When `selectType="async"`, provides a list of initial options to display when no
     * results have been fetched.
     *
     */
    initialOptions?: CommonSelectOption[];
    /** displays component as read only */
    readOnly?: boolean;
} & ComponentProps<typeof CommonSelectComponent>;
export declare const CommonSelect: React.FC<CommonSelectProps>;
export {};
