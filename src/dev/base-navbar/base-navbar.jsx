// @flow
import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { GrailLogo } from "../../grail-logo";
import { Sidebar } from "../../navbar/components/sidebar";
import styles from "./base-navbar.module.scss";

type Props = {
  /** Determines whether to put warning banner above the navigation bar. */
  isProduction?: boolean,
  /** Defines the title of the page to display. */
  title?: string,
  /** Defines the breadcrumbs to go underneath the navbar. */
  breadcrumbs?: React$Node,
  /** Defines the content aligned left on the navbar to the right of menu button. */
  left?: React$Node,
  /** Defines the content centered in the navbar to the right of menu button. */
  center?: React$Node,
  /** Defines the content aligned right in the navbar to the right of menu button. */
  right?: React$Node,
  /** Defines domain in which links should be routed. */
  domain: Symbol,
  /** Defines links to use for external domains. */
  externalDomains: Map<Symbol, string>,
  /** Overrieds lib/constants with items to populate the sidebar. */
  sidebarContent?: (SidebarItem | ParentSidebarItem)[],
  /** Defines the footer of the sidebar. */
  sidebarFooter?: React$Node,
  /** Defines the component to handle routing to internal links. */
  InternalLinkComponent?: React$ElementType,
  /** Defines the pathname. */
  currentPath: string,
  /** Determines what kind of sidebar to use. */
  drawerVariant?: "permanent" | "persistent" | "temporary",
  /**
   * Provides classNames to the navbar's sub-components. Options include:
   *
   *  - `appBar`: AppBar
   *
   *  - `sideBar`: Outmost Drawer for Sidebar
   *
   *  - `drawer`: div for List inside Sidebar
   */
  classes?: BaseNavbarClasses,
  /** Determines whether to open sidebar by default. */
  isSidebarOpen: boolean,
  /** Function to call when user clicks some button to open/close sidebar.  */
  toggleSidebar: Function,
};

export const BaseNavbar = (props: Props) => {
  const {
    isProduction = false,
    title,
    breadcrumbs,
    left,
    center,
    right,
    sidebarFooter,
    isSidebarOpen,
    toggleSidebar,
    ...otherProps
  } = props;
  const { classes = {} } = props;
  return (
    <Fragment>
      <AppBar
        position="sticky"
        className={classNames(classes.appBar, styles.appBar)}
      >
        {!isProduction && (
          <Typography
            className={styles.nonProductionWarning}
            variant="title"
          >
            THIS IS A STAGING SERVER. DO NOT ENTER REAL DATA.
          </Typography>
        )}
        <Toolbar
          className={styles.toolbar}
          disableGutters
        >
          <div className={styles.left}>
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
                color="inherit"
                variant="title"
              >
                {title}
              </Typography>
            )}
            {left}
          </div>
          <div className={styles.center}>{center}</div>
          <div className={styles.right}>
            <div className={styles.brand}>
              <GrailLogo />
            </div>
            {right}
          </div>
        </Toolbar>
        {breadcrumbs}
      </AppBar>
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={toggleSidebar}
        footer={sidebarFooter}
        {...otherProps}
      />
    </Fragment>
  );
};
