import React, { ReactNode } from "react";
import { SlimPageClasses } from "../../../types/card";
declare type Props = {
    title?: ReactNode;
    subtitle?: ReactNode;
    classes?: SlimPageClasses;
};
export declare const TitleComponent: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export {};
