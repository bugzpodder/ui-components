// @flow
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./common-tabbed-page.module.scss";
import { CommonPage } from "./common-page";
import { SpinnerOverlay } from "../../spinner-overlay";
import { TabsComponent } from "./components/tabs-component";

type Props = {
  /**
   * The array of objects used to define the tabs displayed in the header, and their corresponding pages.
   * The `key` property is used to determine which tab is selected.
   */
  pageConfigs: Array<PageConfig>,
  /** Takes the handler used to switch between tabs, based on the tab's value */
  onChangeActiveTab: string => any,
  /** The value of the tab header. Used to define which tab is open */
  activeTab: string | false,
  /** Provides the page's Title */
  title?: Node,
  /** Provides for action components to be rendered in the top right corner */
  headerActions?: Array<HeaderAction>,
  /** Provides a subtitle under the `title` */
  subtitle?: Node,
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
  classes?: CommonTabbedPageClasses,
  /** Props applied to the `Tabs` container */
  tabProps?: Object,
  /** Components to be shared between all pages */
  children?: React$Node,
  /** Displays an uninteractive loading animation over the page content when true */
  isLoading?: boolean,
};

/**
 * `CommonTabbedPage` provides a component for a page with a flush card header,
 * a tab bar, and an optional side menu. Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `TabbedLimsPage` component as an example.
 */
export const CommonTabbedPage = (props: Props) => {
  const {
    classes = {},
    headerActions = [],
    subtitle = "",
    title = "",
    activeTab,
    onChangeActiveTab,
    pageConfigs,
    tabProps,
    children,
    isLoading = false,
  } = props;
  const { contentContainer, ...commonPageClasses } = classes;
  if (!isLoading && !pageConfigs) {
    throw new Error("pageConfigs is required");
  }
  const selectedTab = pageConfigs.find(tab => tab.key === activeTab);
  if (!isLoading && !selectedTab) {
    console.error("no pageConfig keys match the provided activeTab");
  }
  let PageContent = null;
  let selectedMenuContents = [];
  if (selectedTab && selectedTab.Component) {
    const SelectedComponent = selectedTab.Component;
    selectedMenuContents = selectedTab.menuContents || [];
    PageContent = (
      <div className={classNames(styles.contentContainer, contentContainer)}>
        <SelectedComponent {...selectedTab.componentProps || {}} />
      </div>
    );
  }
  return (
    <CommonPage
      classes={{ ...commonPageClasses }}
      headerActions={headerActions}
      subtitle={subtitle}
      title={title}
      menuContents={selectedMenuContents}
      subheader={(
        <TabsComponent
          activeTab={!isLoading && activeTab}
          onChangeActiveTab={onChangeActiveTab}
          className={classes.tabs}
          pageConfigs={pageConfigs}
          tabProps={tabProps}
        />
)}
    >
      {PageContent}
      {children}
      <SpinnerOverlay isActive={isLoading} />
    </CommonPage>
  );
};
