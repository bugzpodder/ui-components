import React, { ReactNode } from "react";
import { CommonCardClasses, HeaderAction } from "../types/card";
export declare type CommonCardProps = {
    /** Provides the card's Title */
    title?: ReactNode;
    /** An avatar for the card */
    avatar?: ReactNode;
    /** Provides for action components to be rendered at the bottom of `CommonCard` */
    footerActions?: ReactNode;
    /** Provides for action components to be rendered in the top right corner */
    headerActions?: ReactNode;
    /** Provides secondary actions */
    secondaryActions?: HeaderAction[] | null;
    /** Provides a subheader under the `title` */
    subheader?: ReactNode;
    /** Provides built-in margins for the card */
    hasMargin?: boolean;
    /** Provides id for the card */
    id?: string;
    /** Provides className for the card */
    className?: string;
    /**
     * Provides classNames to the card and its sub-components. Options include:
     *  - `root`
     *
     *  - `header`
     *
     *  - `headerActions` (applied to headerActions container)
     *
     *  - `title`
     *
     *  - `subheader`
     *
     *  - `body` (for card's contents)
     *
     *  - `footer`
     *
     *  - `footerActions` (applied to footerActions container)
     */
    classes?: CommonCardClasses;
    /** Shadow depth, corresponds to dp in the spec. It's accepting values between 0 and 24 inclusive. */
    elevation?: number;
};
/**
 * `CommonCard` provides a component to create basic Material-UI Cards.
 * This was made in order to standardize how we implement cards across UIs.
 */
export declare const CommonCard: React.FC<CommonCardProps>;
