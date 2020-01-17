import React, { ReactNode } from "react";
import { ClickableItem } from "../../types/dropdown";
import { SlimPageClasses, HeaderAction } from "../../types/card";
declare type Props = {
    /** Page title */
    title?: ReactNode;
    /** Subtitle shown under the `title` */
    subtitle?: ReactNode;
    /**
     *
     * ClassNames for the page and its sub-components. Options include:
     *
     *  - `root`
     *
     *  - `centerHeader`
     *
     *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and special actions)
     *
     *  - `headerActions` (applied to the container around the header actions)
     *
     *  - `primaryActions`
     *
     *  - `secondaryActions`
     *
     *  - `titleContainer` (applied to the container around the title and subtitle)
     *
     *  - `title`
     *
     *  - `subtitle`
     *
     *  - `content` - (applied to the container around the content)
     */
    classes?: SlimPageClasses;
    /** `Node` displayed in the center of the header. For example, page tabs. */
    centerHeader?: ReactNode;
    /** Takes a `node` to show on the page */
    children?: ReactNode;
    /** Displays a non-interactive loading animation */
    isLoading?: boolean;
    /** Primary actions to display on the header */
    primaryActions?: HeaderAction[];
    /** Secondary actions to display in the secondary actions menu */
    secondaryActions?: ClickableItem[];
};
/**
 * `SlimPage` provides a component for a page with a flush card header.
 * Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `LimsPageV2` component as an example.
 */
export declare const SlimPage: React.FC<Props>;
export {};
