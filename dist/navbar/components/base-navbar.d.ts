import { ComponentType, ReactNode } from "react";
import { BaseNavbarClasses } from "../../types/base-navbar";
import { SidebarItem } from "@grailbio/lib";
declare type Props = {
    /** Determines whether to put warning banner above the navigation bar. */
    isProduction?: boolean;
    /** Defines the breadcrumbs to go underneath the navbar. */
    breadcrumbs?: ReactNode;
    /** Defines the content aligned left on the navbar to the right of menu button. */
    left?: ReactNode;
    /** Defines the content centered in the navbar to the right of menu button. */
    center?: ReactNode;
    /** Defines the content aligned right in the navbar to the right of menu button. */
    right?: ReactNode;
    /**
      The logo.
      Suggestion:
      `import { GrailLogo } from "@grail/common-private";`
      and set `logo` prop:
      `logo={<GrailLogo />}`
    */
    logo: ReactNode;
    /** Defines domain in which links should be routed. */
    domain: string;
    /** Defines links to use for external domains. */
    externalDomains?: Map<string, string>;
    /** Dfines sidebar content. */
    sidebarContent: SidebarItem[];
    /** Defines the footer of the sidebar. */
    sidebarFooter?: ReactNode;
    /** Defines the component to handle routing to internal links. */
    InternalLinkComponent?: ComponentType<any>;
    /** Defines the pathname. */
    currentPath: string;
    /** Determines what kind of sidebar to use. */
    drawerVariant?: "permanent" | "persistent" | "temporary";
    /**
     * Provides classNames to the navbar's sub-components. Options include:
     *
     *  - `appBar`: AppBar
     *
     *  - `sideBar`: Outmost Drawer for Sidebar
     *
     *  - `drawer`: div for List inside Sidebar
     */
    classes?: BaseNavbarClasses;
    /** Determines whether to open sidebar by default. */
    isSidebarOpen: boolean;
    /** Function to call when user clicks some button to open/close sidebar.  */
    toggleSidebar: () => void;
};
export declare const BaseNavbar: (props: Props) => JSX.Element;
export {};
