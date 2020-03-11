import React, { ComponentType, ReactNode } from "react";
import classNames from "classnames";
import styles from "./base-navbar.module.scss";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { BaseNavbarClasses } from "../../types/base-navbar";
import { BreastCancerRibbon } from "../../logos";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "@grailbio/lib";

type Props = {
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

export const BaseNavbar = (props: Props) => {
  const {
    isProduction = false,
    domain,
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
  const isLims = domain === "lims";
  const isOctober = new Date().getMonth() === 9;
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
            {breadcrumbs}
            {left}
          </div>
          <div data-testid="navbar-center" className={styles.center}>
            {center}
          </div>
          <div data-testid="navbar-right" className={styles.right}>
            {isLims && isOctober && <BreastCancerRibbon />}
            <div className={styles.brand}>{logo}</div>
            {right}
          </div>
        </Toolbar>
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
