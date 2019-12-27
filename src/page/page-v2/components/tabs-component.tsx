import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";
import { CommonTabbedPageV2Classes, PageConfigV2 } from "../../../types/card";

type Props = {
  onChangeActiveTab: (x0: string) => any;
  activeTab: string | false;
  tabProps: Record<string, any>;
  pageConfigs: PageConfigV2[];
  wrapTabLabels: boolean;
  classes: CommonTabbedPageV2Classes;
};

export const TabsComponent: React.FC<Props> = props => {
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
