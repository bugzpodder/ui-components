import React from "react";
import styles from "../notification.module.scss";
import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { DATE_TIME_UNICODE_FORMAT } from "@grailbio/lib";
import { NotificationTypeIcon } from "./notification-type-icon";
import { format } from "date-fns";

type Props = {
  message: string;
  time: string;
  type: string;
  notificationIndex: number;
  removeNotification: (x0: number) => any;
};

export const NotificationCard: React.FC<Props> = props => {
  const { notificationIndex, message, time, type, removeNotification } = props;
  return (
    <Card
      data-testid={`notification-${time}`}
      className={styles.notificationCard}
    >
      <CardContent
        classes={{
          root: styles.notificationCardContent,
        }}
      >
        <NotificationTypeIcon type={type} />

        <IconButton
          data-testid={`close-notification-${time}`}
          disableRipple
          color="inherit"
          classes={{
            root: styles.notificationClose,
          }}
          onClick={() => removeNotification(notificationIndex)}
        >
          <CloseIcon />
        </IconButton>

        <Typography data-testid={`message-${time}`}>{message}</Typography>
        <Typography data-testid={`time-${time}`} variant="caption">
          {format(new Date(time), DATE_TIME_UNICODE_FORMAT)}
        </Typography>
      </CardContent>
    </Card>
  );
};
