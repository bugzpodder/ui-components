// @flow
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  /** Defines the text of the main item. */
  headerText: React$Node,
  /** Defines props passed into main item's `ListItemText` component. */
  headerTextProps?: Object,
  /** Defines props passed into main item's `ListItem` component. */
  headerItemProps?: Object,
  /** Defines icon to be placed to the left of main item text. */
  headerIcon?: React$Element<any>,
  /** Defines the items to be collapsed (wrapped in a `List` component). */
  children: React$Node,
  /** Overrides initial state (default: false) */
  isOpen?: boolean,
  /** Overrides the internal toggleList function */
  toggleList?: () => any,
};

export const CollapsableListItem = (props: Props) => {
  const {
    headerText, headerTextProps, headerItemProps, headerIcon, children, isOpen,
  } = props;

  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(!!isOpen);
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsCurrentlyOpen(!!isOpen);
    }
  }, [isOpen]);

  const toggleList = () => {
    setIsCurrentlyOpen(isOpen => !isOpen);
  };

  const handleToggleList = props.toggleList || toggleList;
  const formattedHeaderText = typeof headerText === "string" ? headerText.toLowerCase().replace(" ", "-") : "";
  return (
    <Fragment>
      <ListItem
        button
        disableRipple
        data-testid={`list-item${formattedHeaderText ? `-${formattedHeaderText}` : ""}`}
        onClick={event => {
          handleToggleList();
          event.stopPropagation();
        }}
        {...headerItemProps}
      >
        {headerIcon && <ListItemIcon>{headerIcon}</ListItemIcon>}
        <ListItemText
          data-testid={formattedHeaderText}
          primary={headerText}
          {...headerTextProps}
        />
        {isCurrentlyOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={isCurrentlyOpen}
        timeout={0}
        unmountOnExit
      >
        <List>{children}</List>
      </Collapse>
    </Fragment>
  );
};
