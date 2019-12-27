import React, { ComponentType, ReactNode, useState } from "react";
import { BaseNavbar } from "./components/base-navbar";
import { SidebarItem } from "@grailbio/lib";

type Props = {
  /** Determines whether to put warning banner above the navigation bar. */
  isProduction?: boolean;
  /** Defines the title of the page to display. */
  title?: string;
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
  externalDomains: Map<string, string>;
  /** Defines sidebar content. */
  sidebarContent: SidebarItem[];
  /** Defines the footer of the sidebar. */
  sidebarFooter?: ReactNode;
  /** Defines the component to handle routing to internal links. */
  InternalLinkComponent?: ComponentType<any>;
  /** Defines the pathname. */
  currentPath: string;
};

export const Navbar: React.FC<Props> = props => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (): void => {
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
