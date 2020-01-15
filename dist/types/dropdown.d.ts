import { ReactNode } from "react";
export declare type ClickableItem = {
    content?: ReactNode;
    onClick?: Function;
    href?: string;
    isExternal?: boolean;
    [x0: string]: any;
};
