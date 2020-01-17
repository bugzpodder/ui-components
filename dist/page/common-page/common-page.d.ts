import React, { ReactNode } from "react";
import { CommonPageClasses, HeaderAction, MenuItem } from "../../types/card";
declare type Props = {
    /** Provides the page's Title */
    title?: ReactNode;
    /** Provides for action components to be rendered in the top right corner */
    headerActions?: HeaderAction[];
    /** Provides a subtitle under the `title` */
    subtitle?: ReactNode;
    /**
     * Provides classNames to the page and its sub-components. Options include:
     *
     *  - `root`
     *
     *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and side menu
     *     button)
     *
     *  - `headerActions` (applied to headerActions container)
     *
     *  - `title`
     *
     *  - `subtitle`
     *
     *  - `contentAndMenu` - container around content and side menu.
     *
     *  - `content` - a container inside of contentAndMenu but still around content. This exists to stop the content
     *     from being considered part of a flexbox with the side menu.
     *
     *  - `sideMenu`
     */
    classes?: CommonPageClasses;
    /** Takes a `node` that goes beneath the header. For example, page tabs. */
    subheader?: ReactNode;
    /** Takes a `node` to show on the page */
    children?: ReactNode;
    /** Displays a spinner when `isLoading` is true */
    isLoading?: boolean;
    /** Defines the list of items in the menu. The menu is hidden by default but can be revealed by clicking a hamburger
     *  button to the left of the page. Clicking on each item will scroll to the element with an id matching the key.
     *  If empty, no hamburger icon will appear. */
    menuContents?: MenuItem[];
};
/**
 * `CommonPage` provides a component for a page with a flush card header and an
 * optional side menu. Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `LimsPage` component as an example.
 */
export declare const CommonPage: React.FC<Props>;
export {};
