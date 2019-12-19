import React from "react";
import { OmniSearchDef, OmniSearchValues } from "@grailbio/lib";
declare type Props = {
    searchDefs: OmniSearchDef[];
    searchValues: OmniSearchValues;
    onChange: (x0: string, x1: string) => any;
    onClear: () => any;
    onSearch: () => void;
    setIsOpen: (x0: boolean) => any;
};
export declare const OmniDialog: React.FC<Props>;
export {};
