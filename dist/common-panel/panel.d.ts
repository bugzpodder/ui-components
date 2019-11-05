import React, { ReactNode } from "react";
import { CommonPanelClasses } from "../types/panel";
declare type Props = {
    /** Title of the panel */
    title: string;
    /** Body of the panel */
    children: ReactNode;
    /** The object used to apply classes to the panel's subcomponents. Options include:
     *
     *  - root: the component's root element
     *
     *  - title: the component's title
     *
     *  - body: the component's content wrapper
     */
    classes?: CommonPanelClasses;
    /** DEPRECATED: DO NOT USE */
    className?: string;
    /** Determines the color of the panel header. Options include:
     *
     * - default: colorless,
     *
     * - primary: primary purple GRAIL color
     *
     */
    color?: string;
    /** Variant for the title. (See `Typography`'s `variant`) */
    variant?: string;
};
/** Provides a styled section with a title and body. */
export declare const CommonPanel: React.FC<Props>;
export {};
