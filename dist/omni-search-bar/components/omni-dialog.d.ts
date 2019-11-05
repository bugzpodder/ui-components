import React, { ReactNode } from "react";
import { OmniSearchDefs, OmniSearchValues } from "../../types/api";
declare type Props = {
    searchDefs: OmniSearchDefs;
    searchValues: OmniSearchValues;
    onChange: (x0: string, x1: string) => any;
    onClear: () => any;
    onSearch: () => void;
    setIsOpen: (x0: boolean) => any;
    children?: ReactNode;
};
export declare const OmniDialog: React.FC<Props>;
export {};
