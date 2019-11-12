import { ReactNode } from "react";
import { SelectComponentsConfig } from "react-select";
export declare type CommonSelectOption = {
    label: ReactNode;
    value: string;
    [x0: string]: any;
};
export declare type AdditionalSelectProps = SelectComponentsConfig<any> & {
    initialMessage?: string;
    selectType?: string;
    inputValue?: string;
};
export declare type CommonSelectClasses = SelectComponentsConfig<any> & {
    input?: string;
    options?: string;
    root?: string;
    label?: string;
};
export declare type TypeaheadProps = SelectComponentsConfig<any> & {
    initialMessage?: string;
    selectType?: string;
};
export declare type Suggestion = {
    label: string;
    value: string;
    [x0: string]: any;
};
export declare type SelectVariant = "standard" | "filled" | "outlined";
