import React from "react";
import { ClickableItem } from "../../../types/dropdown";
import { HeaderAction, SlimPageClasses } from "../../../types/card";
declare type Props = {
    primaryActions?: HeaderAction[];
    secondaryActions?: ClickableItem[];
    classes?: SlimPageClasses;
};
export declare const HeaderActions: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export {};
