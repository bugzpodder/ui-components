import React from "react";
import { OmniSearchCommand, SearchOptionV2 } from "@grailbio/lib";
declare type Props = {
    /** Search Options. */
    searchOptions: SearchOptionV2[];
    /** Function to set searchOptions */
    addOmniSearchCommand?: (x0: OmniSearchCommand) => any;
};
export declare const OmniChips: React.FC<Props>;
export {};
