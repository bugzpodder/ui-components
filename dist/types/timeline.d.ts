import { CommonCardClasses } from "./card";
import { ReactNode } from "react";
export declare type TimelineGraphRow = {
    date: string;
    content: ReactNode;
    user?: string;
    pictureUrl?: string;
};
export declare type TimelineGraphClasses = {
    root?: string;
    content?: string;
    item?: string;
    itemContent?: string;
    username?: string;
};
export declare type TimelineCardClasses = TimelineGraphClasses & {
    commonCard?: CommonCardClasses;
};
