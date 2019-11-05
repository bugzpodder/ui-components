import React from "react";
import { SearchFieldProps } from "../types/api";
declare type Props = {
    suggestions: string[];
    loadSuggestions: () => void;
} & SearchFieldProps;
export declare const SuggestionsOmniField: React.FC<Props>;
export {};
