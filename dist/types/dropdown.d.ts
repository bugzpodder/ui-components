import { ReactNode } from "react";
export declare type ClickableItem = {
    content?: ReactNode;
    onClick?: Function;
    href?: string;
    isExternal?: boolean;
    isEnabled?: boolean;
    [x0: string]: any;
};
