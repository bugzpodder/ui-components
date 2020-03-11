/// <reference types="react" />
export declare const OMNI_INPUT_FIELD_ID: string;
declare type Props = {
    omniText: string;
    onChange: (x0: string, x1: any) => any;
    onSearch: () => any;
    onClear: () => any;
    error: string;
    setOmniIsOpen: (x0: boolean) => any;
    isOpen?: boolean;
    defaultField?: string;
};
export declare const OmniField: (props: Props) => JSX.Element;
export {};
