import React from "react";
import classNames from "classnames";
import styles from "../slim-page.module.scss";
import { SlimPageConfig, SlimTabbedPageClasses } from "../../../types/card";
import { Tab, Tabs } from "@material-ui/core";

type Props = {
  onChangeActiveTab: (x0: string) => any;
  activeTab: string | false;
  tabProps: Record<string, any>;
  pageConfigs: SlimPageConfig[];
  wrapTabLabels: boolean;
  classes: SlimTabbedPageClasses;
};

export const TabsComponent = (props: Props) => {
  const {
    activeTab,
    onChangeActiveTab,
    tabProps,
    pageConfigs,
    wrapTabLabels,
    classes = {},
  } = props;
  return (
    <Tabs
      variant="scrollable"
      scrollButtons="on"
      data-testid="common-tabbed-page-tabs"
      textColor="primary"
      indicatorColor="primary"
      value={activeTab}
      onChange={(_, value) => onChangeActiveTab(value)}
      classes={{
        root: classNames(classes.tabs, styles.tabsContainer),
        flexContainer: styles.tabs,
        scrollButtons: styles.scrollButton,
      }}
    >
      {pageConfigs
        .filter(({ isVisible = true }) => isVisible)
        .map(tab => {
          const { key, label, id, tabClasses = {}, isDisabled } = tab;
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
              disabled={isDisabled}
              {...tabProps}
            />
          );
        })}
    </Tabs>
  );
};
