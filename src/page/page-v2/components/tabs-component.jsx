// @flow
import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";

type Props = {
  onChangeActiveTab: string => any,
  activeTab: string | false,
  tabProps: Object,
  pageConfigs: Array<PageConfigV2>,
  wrapTabLabels: boolean,
  classes: CommonTabbedPageV2Classes,
};

export const TabsComponent = (props: Props) => {
  const {
    activeTab, onChangeActiveTab, tabProps, pageConfigs, wrapTabLabels, classes = {},
  } = props;
  return (
    <Tabs
      variant="scrollable"
      data-testid="common-tabbed-page-tabs"
      textColor="primary"
      indicatorColor="primary"
      value={activeTab}
      onChange={(event, value) => onChangeActiveTab(value)}
      classes={{
        root: classNames(classes.tabs, styles.tabsContainer),
        flexContainer: styles.tabs,
        scrollButtons: styles.scrollButton,
      }}
    >
      {pageConfigs.map(tab => {
        const {
          key, label, id, tabClasses = {},
        } = tab;
        return (
          <Tab
            wrapped={!wrapTabLabels}
            key={key}
            value={key}
            label={label}
            id={id}
            data-testid={id}
            classes={{
              ...tabClasses,
              root: classNames(classes.tab, styles.tab, "tabbed-page-tab"),
            }}
            {...tabProps}
          />
        );
      })}
    </Tabs>
  );
};
