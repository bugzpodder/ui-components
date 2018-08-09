// @flow
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import React, { type Node } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import classNames from "classnames";
import styles from "./tabbed-card.module.scss";

type Props = {
  /** The array of objects used to define the tabs displayed in the header */
  headerTabs: Array<HeaderTab>,
  /** Takes the handler used to switch between tabs, based on the tab's value */
  onChange: string => any,
  /** The value of the tab header. Used to define which tab is open */
  value: string,
  /** Provides the card's Title */
  title?: Node,
  /** Provides for action components to be rendered in the top right corner */
  headerActions?: Array<HeaderAction>,
  /** Provides a subheader under the `title` */
  subheader?: Node,
  /**
   * Provides classNames to the card and its sub-components. Options include:
   *
   *  - `header`
   *
   *  - `headerActions` (applied to headerActions container)
   *
   *  - `tabs` (applied to the container of the tab buttons)
   *
   *  - `root`
   *
   *  - `subheader`
   *
   *  - `title`
   */
  classes?: TabbedCardClasses,
  /** props applied to the `Tabs` container */
  tabProps?: Object,
};

/**
 * `TabbedCard` provides a component for a page with a flush card header.
 */
export const TabbedCard = (props: Props) => {
  const {
    classes = {},
    headerActions = [],
    headerTabs = [],
    onChange,
    value,
    subheader = "",
    title = "",
    tabProps = {},
    ...cardProps
  } = props;
  const mappedHeaderActions = headerActions.map((action, index) => {
    const {
      content, color, id, onClick, ...buttonProps
    } = action;
    return (
      <Button
        key={`header-action-${index}`}
        color={color}
        id={id}
        data-testid={id}
        onClick={onClick}
        {...buttonProps}
      >
        {content}
      </Button>
    );
  });
  const selectedTab = headerTabs.find(tab => tab.value === value) || {};
  return (
    <div className={classes.root}>
      <Card
        className={classNames(styles.pageHeader)}
        {...cardProps}
      >
        <CardHeader
          title={title}
          classes={{
            root: classNames(styles.cardHeader, classes.header),
            action: classNames(styles.headerActions, classes.headerActions),
            title: classNames("header-title", classes.title),
            subheader: classes.subheader,
          }}
          action={<div className={styles.headerActions}>{mappedHeaderActions}</div>}
          subheader={subheader}
        />
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={(event, value) => onChange(value)}
          classes={{
            root: classes.tabs,
          }}
          {...tabProps}
        >
          {headerTabs.map(tab => {
            const {
              id, className, value, label, content: __content, ...tabProps
            } = tab;
            return (
              <Tab
                key={value}
                classes={{
                  root: classNames(styles.headerTab, className),
                }}
                value={value}
                label={label}
                id={id}
                data-testid={id}
                {...tabProps}
              />
            );
          })}
        </Tabs>
      </Card>
      {selectedTab.content}
    </div>
  );
};
