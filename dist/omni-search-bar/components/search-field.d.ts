import React from "react";
import { SearchFieldProps } from "@grailbio/lib";
declare type Props = {
    placeholder: string;
    onSearch: () => any;
    searchType: symbol;
} & SearchFieldProps;
export declare const SearchField: React.FC<Props>;
export {};
