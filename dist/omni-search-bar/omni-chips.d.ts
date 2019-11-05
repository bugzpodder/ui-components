import React from "react";
import { OmniSearchCommand, SearchOptionsV2 } from "../types/api";
declare type Props = {
    /** Search Options. */
    searchOptions: SearchOptionsV2;
    /** Function to set searchOptions */
    addOmniSearchCommand?: (x0: OmniSearchCommand) => any;
};
export declare const OmniChips: React.FC<Props>;
export {};
