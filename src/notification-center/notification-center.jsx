// @flow
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Notifications from "@material-ui/icons/Notifications";
import Popover from "@material-ui/core/Popover";
import React, { Fragment, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./notification.module.scss";
import { NotificationCard } from "./components/notification-card";

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
  /**
   * Function to clear all notifications.
   */
  removeAllNotifications: () => any,
  /**
   * Function to clear a specific notification, it should take in the index of the notification
   * to be removed.
   */
  removeNotification: number => any,
};

export const NotificationCenter = (props: Props) => {
  const anchorEl = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    anchorEl.current = event.currentTarget;
    setIsVisible(isVisible => !isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const {
    notifications = [], removeAllNotifications, removeNotification, ...iconProps
  } = props;

  return (
    <Fragment>
      <IconButton
        data-testid="notifications-button"
        disableRipple
        color="inherit"
        onClick={handleClick}
        {...iconProps}
      >
        <Notifications />
      </IconButton>
      <Popover
        open={isVisible}
        anchorEl={anchorEl.current}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={handleClose}
        PaperProps={{
          classes: {
            root: styles.notificationCenterPopover,
          },
        }}
        TransitionProps={{ timeout: 0 }}
      >
        <List className={styles.notificationCenterList}>
          <Button
            data-testid="notifications-clear-all"
            variant="text"
            color="primary"
            onClick={removeAllNotifications}
            disabled={!notifications.length}
            className={styles.clearButton}
          >
            <b>Clear All</b>
          </Button>
          {!notifications.length && (
            <Typography
              variant="subtitle1"
              align="center"
              className={styles.emptyText}
            >
              You have no notifications.
            </Typography>
          )}
          {notifications.map(({ message, time, type }, index) => (
            <NotificationCard
              key={index}
              message={message}
              time={time}
              type={type}
              notificationIndex={index}
              removeNotification={removeNotification}
            />
          ))}
        </List>
      </Popover>
    </Fragment>
  );
};
