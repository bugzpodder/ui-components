/// <reference types="react" />
import { OmniSearchCommand, SearchOption } from "@grailbio/lib";
declare type Props = {
    /** Search Options. */
    searchOptions: SearchOption[];
    /** Function to set searchOptions */
    addOmniSearchCommand?: (x0: OmniSearchCommand) => any;
};
export declare const OmniChips: (props: Props) => JSX.Element;
export {};
