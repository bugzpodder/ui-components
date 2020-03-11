import React, { ReactNode } from "react";
import { CommonTabbedPageClasses, HeaderAction, PageConfig } from "../../types/card";
import { TabProps } from "@material-ui/core/Tab";
declare type Props = {
    /**
     * The array of objects used to define the tabs displayed in the header, and their corresponding pages.
     * The `key` property is used to determine which tab is selected.
     */
    pageConfigs: PageConfig[];
    /** Takes the handler used to switch between tabs, based on the tab's value */
    onChangeActiveTab: (x0: string) => any;
    /** The value of the tab header. Used to define which tab is open */
    activeTab: string | false;
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
     *  - `tabs` (applied to the container of the tab buttons)
     *
     *  - `contentContainer`
     *
     *  - `content`
     *
     *  - `sideMenu`
     */
    classes?: CommonTabbedPageClasses;
    /** Props applied to the `Tabs` container */
    tabProps?: Partial<TabProps>;
    /** Displays an uninteractive loading animation over the page content when true */
    isLoading?: boolean;
};
/**
 * `CommonTabbedPage` provides a component for a page with a flush card header,
 * a tab bar, and an optional side menu. Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `TabbedLimsPage` component as an example.
 */
export declare const CommonTabbedPage: React.FC<Props>;
export {};
