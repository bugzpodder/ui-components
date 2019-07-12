// @flow
import React, { useState } from "react";
import { BaseNavbar } from "./components/base-navbar";

type Props = {
  /** Determines whether to put warning banner above the navigation bar. */
  isProduction?: boolean,
  /** Defines the breadcrumbs to go underneath the navbar. */
  breadcrumbs?: React$Node,
  /** Defines the content aligned left on the navbar to the right of menu button. */
  left?: React$Node,
  /** Defines the content centered in the navbar to the right of menu button. */
  center?: React$Node,
  /** Defines the content aligned right in the navbar to the right of menu button. */
  right?: React$Node,
  /** Defines domain in which links should be routed. */
  domain: string,
  /** Defines links to use for external domains. */
  externalDomains?: Map<string, string>,
  /** Overrieds lib/constants with items to populate the sidebar. */
  sidebarContent?: (SidebarItemLink | SidebarItemParent)[],
  /** Defines the footer of the sidebar. */
  sidebarFooter?: React$Node,
  /** Defines the component to handle routing to internal links. */
  InternalLinkComponent?: React$ElementType,
  /** Defines the pathname. */
  currentPath: string,
};

export const NavbarV2 = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);
  };

  return (
    <BaseNavbar
      drawerVariant="temporary"
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      {...props}
    />
  );
};
