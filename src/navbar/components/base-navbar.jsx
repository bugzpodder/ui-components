// @flow
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import moment from "moment";
import styles from "./base-navbar.module.scss";
import { BreastCancerRibbon } from "../../logos";
import { LIMS } from "@grail/lib";
import { Sidebar } from "./sidebar";

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
  /**
    The logo.
    Suggestion:
    `import { GrailLogo } from "@grail/common-private";`
    and set `logo` prop:
    `logo={<GrailLogo />}`
  */
  logo: Node<>,
  /** Defines domain in which links should be routed. */
  domain: string,
  /** Defines links to use for external domains. */
  externalDomains?: ExternalDomains,
  /** Overrieds lib/constants with items to populate the sidebar. */
  sidebarContent?: SidebarItem[],
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
  const isLims = domain === LIMS;
  const isOctober = moment().month() === 9;
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
        <Toolbar
          className={styles.toolbar}
          disableGutters
        >
          <div
            data-testid="navbar-left"
            className={styles.left}
          >
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
          <div
            data-testid="navbar-center"
            className={styles.center}
          >
            {center}
          </div>
          <div
            data-testid="navbar-right"
            className={styles.right}
          >
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
