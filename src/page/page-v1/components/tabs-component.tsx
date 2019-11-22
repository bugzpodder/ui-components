import React from "react";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classNames from "classnames";
import styles from "../common-tabbed-page.module.scss";
import { PageConfig } from "../../../types/card";

type Props = {
  onChangeActiveTab: (x0: string) => any;
  activeTab: string | false;
  className?: string;
  tabProps?: {
    [x: string]: any;
  };
  pageConfigs: PageConfig[];
};

export const TabsComponent: React.FC<Props> = props => {
  const {
    activeTab,
    onChangeActiveTab,
    className,
    tabProps,
    pageConfigs,
  } = props;
  return (
    <Tabs
      data-testid="card-tabs"
      textColor="primary"
      indicatorColor="primary"
      value={activeTab}
      onChange={(_, value) => onChangeActiveTab(value)}
      classes={{
        root: classNames(className, styles.tabs),
      }}
    >
      {pageConfigs.map(tab => {
        const { key, label, id, tabClasses = {} } = tab;
        return (
          <Tab
            key={key}
            value={key}
            label={label}
            id={id}
            data-testid={id}
            classes={{
              ...tabClasses,
              root: classNames(tabClasses.root, styles.tab, "tabbed-page-tab"),
            }}
            {...tabProps}
          />
        );
      })}
    </Tabs>
  );
};