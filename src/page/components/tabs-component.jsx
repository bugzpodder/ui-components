// @flow
import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

type Props = {
  onChangeActiveTab: string => any,
  activeTab: string,
  className?: string,
  tabProps?: Object,
  pageConfigs: Array<PageConfig>,
};

export const TabsComponent = (props: Props) => {
  const {
    activeTab, onChangeActiveTab, className, tabProps, pageConfigs,
  } = props;
  return (
    <Tabs
      data-testid="card-tabs"
      textColor="primary"
      indicatorColor="primary"
      value={activeTab}
      onChange={(event, value) => onChangeActiveTab(value)}
      classes={{
        root: className,
      }}
    >
      {pageConfigs.map(tab => {
        const {
          key, label, id, tabClasses = {},
        } = tab;
        return (
          <Tab
            key={key}
            value={key}
            label={label}
            id={id}
            data-testid={id}
            classes={tabClasses}
            {...tabProps}
          />
        );
      })}
    </Tabs>
  );
};
