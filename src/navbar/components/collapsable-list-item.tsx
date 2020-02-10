import ListItemText, {
  ListItemTextProps,
} from "@material-ui/core/ListItemText";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Collapse, List, ListItem, ListItemIcon } from "@material-ui/core";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { getListItemDataTestId } from "../util";

type Props = {
  /** Defines the text of the main item. */
  headerText: ReactNode;
  /** Defines props passed into main item's `ListItemText` component. */
  headerTextProps?: Partial<ListItemTextProps>;
  /** Defines props passed into main item's `ListItem` component. */
  headerItemProps?: Record<string, any>[];
  /** Defines icon to be placed to the left of main item text. */
  headerIcon?: ReactElement;
  /** Overrides initial state (default: false) */
  isOpen?: boolean;
  /** Overrides the internal toggleList function */
  toggleList?: () => any;
};

export const CollapsableListItem: React.FC<Props> = props => {
  const {
    headerText,
    headerTextProps,
    headerItemProps,
    headerIcon,
    children,
    isOpen,
  } = props;

  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(!!isOpen);
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsCurrentlyOpen(!!isOpen);
    }
  }, [isOpen]);

  const toggleList = (): void => {
    setIsCurrentlyOpen(isOpen => !isOpen);
  };

  const handleToggleList = props.toggleList || toggleList;
  const dataTestId = getListItemDataTestId(headerText);
  return (
    <>
      <ListItem
        button
        disableRipple
        data-testid={dataTestId}
        onClick={event => {
          handleToggleList();
          event.stopPropagation();
        }}
        {...headerItemProps}
      >
        {headerIcon && <ListItemIcon>{headerIcon}</ListItemIcon>}
        <ListItemText
          data-testid={`${dataTestId}-text`}
          primary={headerText}
          {...headerTextProps}
        />
        {isCurrentlyOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isCurrentlyOpen} timeout={0} unmountOnExit>
        <List>{children}</List>
      </Collapse>
    </>
  );
};
