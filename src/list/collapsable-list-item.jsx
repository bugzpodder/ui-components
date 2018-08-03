// @flow
import React, { Fragment } from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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

type State = {
  isOpen: boolean,
};

export class CollapsableListItem extends React.Component<Props, State> {
  state = {
    isOpen: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const propsOpen = nextProps.isOpen;
    if (propsOpen !== undefined) {
      if (propsOpen !== prevState.isOpen) {
        return { isOpen: propsOpen };
      }
    }
    return null;
  }

  toggleList = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render = () => {
    const {
      headerText, headerTextProps, headerItemProps, headerIcon, children,
    } = this.props;
    const toggleList = this.props.toggleList || this.toggleList;
    return (
      <Fragment>
        <ListItem
          button
          disableRipple
          onClick={event => {
            toggleList();
            event.stopPropagation();
          }}
          {...headerItemProps}
        >
          {headerIcon && <ListItemIcon>{headerIcon}</ListItemIcon>}
          <ListItemText
            primary={headerText}
            {...headerTextProps}
          />
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.isOpen}
          timeout={0}
          unmountOnExit
        >
          <List>{children}</List>
        </Collapse>
      </Fragment>
    );
  };
}
