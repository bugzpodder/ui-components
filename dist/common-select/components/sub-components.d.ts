import React, { FocusEvent, MouseEvent, ReactNode } from "react";
import { AdditionalSelectProps, CommonSelectClasses, CommonSelectOption } from "../../types/select";
declare type Props = {
    children: ReactNode;
    classes: CommonSelectClasses;
    data: CommonSelectOption;
    isFocused: boolean;
    isSelected: boolean;
    onFocus: (x0: FocusEvent) => void;
    selectOption: (x0: CommonSelectOption, x1: MouseEvent<any>) => any;
    formatOption: (x0: CommonSelectOption) => ReactNode;
};
declare type MultiValueContainerProps = {
    children: ReactNode;
};
declare type MultiValueRemoveProps = {
    data: CommonSelectOption;
    innerProps: {
        [x: string]: any;
    };
};
declare type ClearIndicatorProps = {
    innerProps: {
        [x: string]: any;
    };
};
declare type DropdownProps = {
    selectProps: {
        menuIsOpen?: boolean;
    };
};
declare type NoOptionsMessageProps = {
    selectProps: AdditionalSelectProps;
    selectType: string;
    getValue: Function;
};
export declare const DropdownIndicator: React.FC<DropdownProps>;
export declare const NoOptionsMessage: React.FC<NoOptionsMessageProps>;
export declare const ClearIndicator: React.FC<ClearIndicatorProps>;
export declare const MultiValueContainer: React.FC<MultiValueContainerProps>;
export declare const MultiValueRemove: React.FC<MultiValueRemoveProps>;
export declare const Option: React.FC<Props>;
export {};
