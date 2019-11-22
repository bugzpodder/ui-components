import React from "react";
import { ClickableItem } from "../../../types/dropdown";
import { CommonPageV2Classes, HeaderAction } from "../../../types/card";
declare type Props = {
    primaryActions?: HeaderAction[];
    secondaryActions?: ClickableItem[];
    classes?: CommonPageV2Classes;
};
export declare const HeaderActions: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export {};
