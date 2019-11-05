import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { ComponentType, MouseEvent, ReactNode } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./base-navbar.module.scss";

import { BaseNavbarClasses } from "../../../types/base-navbar";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "../../../types/nav";

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
  /** Overrieds lib/constants with items to populate the sidebar. */
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
  toggleSidebar: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const BaseNavbar: React.FC<Props> = props => {
  const {
    isProduction = false,
    domain,
    title,
    breadcrumbs,
    left,
    center,
    right,
    logo,
    sidebarFooter,
    isSidebarOpen,
    toggleSidebar,
    ...otherProps
  } = props;
  const { classes = {} } = props;
  return (
    <>
      <AppBar
        data-testid="navbar"
        position="sticky"
        className={classNames(classes.appBar, styles.appBar, "lims-navbar")}
      >
        {!isProduction && (
          <Typography
            data-testid="non-production-warning"
            className={styles.nonProductionWarning}
            variant="h6"
          >
            THIS IS A STAGING SERVER. DO NOT ENTER REAL DATA.
          </Typography>
        )}
        <Toolbar className={styles.toolbar} disableGutters>
          <div data-testid="navbar-left" className={styles.left}>
            <IconButton
              id="main-nav-button"
              data-testid="main-nav-button"
              onClick={toggleSidebar}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            {title && (
              <Typography
                data-testid="navbar-title"
                color="inherit"
                variant="h6"
              >
                {title}
              </Typography>
            )}
            {left}
          </div>
          <div data-testid="navbar-center" className={styles.center}>
            {center}
          </div>
          <div data-testid="navbar-right" className={styles.right}>
            <div className={styles.brand}>{logo && logo}</div>
            {right}
          </div>
        </Toolbar>
        {breadcrumbs}
      </AppBar>
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={toggleSidebar}
        footer={sidebarFooter}
        domain={domain}
        {...otherProps}
      />
    </>
  );
};
