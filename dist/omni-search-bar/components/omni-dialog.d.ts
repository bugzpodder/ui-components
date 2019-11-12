import React, { ReactNode } from "react";
import { OmniSearchDef, OmniSearchValues } from "@grailbio/lib";
declare type Props = {
    searchDefs: OmniSearchDef[];
    searchValues: OmniSearchValues;
    onChange: (x0: string, x1: string) => any;
    onClear: () => any;
    onSearch: () => void;
    setIsOpen: (x0: boolean) => any;
    children?: ReactNode;
};
export declare const OmniDialog: React.FC<Props>;
export {};
