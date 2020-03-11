/// <reference types="react" />
import { SearchFieldProps } from "@grailbio/lib";
declare type Props = {
    suggestions: string[];
    loadSuggestions: () => void;
} & SearchFieldProps;
export declare const SuggestionsOmniField: (props: Props) => JSX.Element;
export {};
