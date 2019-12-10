import React, { ReactNode } from "react";
declare type AlertClasses = {
    root?: string;
    content?: string;
};
declare type Props = {
    /** The message to display in the alert */
    message: ReactNode;
    /** Classname applied to the alert component */
    className?: string;
    /**
     * Provides classNames to the alert and its sub-components. Options include:
     *  - `root`
     *
     *  - `content`
     */
    classes?: AlertClasses;
    /** The color styling of the alert. Defaults to `error` */
    color?: string;
    /** When "center", aligns the Alert's messages horizontally */
    textAlign?: string;
    /** When "text", changes the styling of the alert */
    variant?: string;
    /** Provides the id of the component */
    id?: string;
};
/**
 * `Alert is a styled alert pane for UI components`
 */
export declare const Alert: React.FC<Props>;
export {};
