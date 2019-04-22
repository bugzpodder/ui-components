// @flow
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import classNames from "classnames";
import styles from "./side-menu.module.scss";

type Props = {
  isExpanded: boolean,
  menuContents: Array<MenuItem>,
  className?: string,
};

export const SideMenu = (props: Props) => {
  const {
    isExpanded, menuContents, className, ...otherProps
  } = props;
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isExpanded}
      className={classNames(styles.sideMenu, className, {
        [styles.contentShift]: isExpanded,
        [styles.content]: !isExpanded,
      })}
      classes={{
        paper: styles.sideMenuPaper,
      }}
      {...otherProps}
    >
      <List>
        {menuContents.map(({ key, label }) => (
          <ListItem
            button
            component="a"
            id={`side-menu-item-${key}`}
            data-testid={`side-menu-item-${key}`}
            key={key}
            href={`#${key}`}
          >
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
