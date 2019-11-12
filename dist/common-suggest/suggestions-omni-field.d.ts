import React from "react";
import { SearchFieldProps } from "@grailbio/lib";
declare type Props = {
    suggestions: string[];
    loadSuggestions: () => void;
} & SearchFieldProps;
export declare const SuggestionsOmniField: React.FC<Props>;
export {};
