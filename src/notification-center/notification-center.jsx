// @flow
import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Notifications from "@material-ui/icons/Notifications";
import { NotificationCard } from "./components/notification-card";

type State = {
  isVisible: boolean,
  anchorElement: ?HTMLAnchorElement,
};

type Props = {
  /**
   * The array of notification objects to display in the dropdown. Each object must include:
   *
   * - message: the message to display
   *
   * - time: a moment object displaying when the notification happened
   *
   * - type: `error`, `warning`, or `info`
   *
   */
  notifications: Array<Notification>,
};

export class NotificationCenter extends React.Component<Props, State> {
  state = {
    isVisible: false,
    anchorElement: null,
  };

  handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    const { isVisible } = this.state;
    event.preventDefault();
    this.setState({ anchorElement: event.currentTarget, isVisible: !isVisible });
  };

  handleClose = () => {
    this.setState({ anchorElement: null, isVisible: false });
  };

  componentWillUnmount = () => {
    this.setState({ anchorElement: null });
  };

  render = () => {
    const { notifications } = this.props;
    const { anchorElement, isVisible } = this.state;
    return (
      <Fragment>
        <IconButton
          disableRipple
          color="inherit"
          onClick={this.handleClick}
        >
          <Notifications />
        </IconButton>
        <Popover
          open={isVisible}
          anchorEl={anchorElement}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          onClose={() => this.handleClose()}
          PaperProps={{
            classes: {
              root: "notification-center-popover",
            },
          }}
          TransitionProps={{ timeout: 0 }}
        >
          <List className="notification-center-list">
            {notifications.map(({ message, time, type }, index) => (
              <NotificationCard
                key={index}
                message={message}
                time={time}
                type={type}
              />
            ))}
          </List>
        </Popover>
      </Fragment>
    );
  };
}
