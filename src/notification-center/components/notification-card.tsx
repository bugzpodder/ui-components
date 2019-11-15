import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import styles from "../notification.module.scss";
import { DATE_TIME_FORMAT } from "@grailbio/lib";
import { NotificationTypeIcon } from "./notification-type-icon";

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
          <Close />
        </IconButton>

        <Typography data-testid={`message-${time}`}>{message}</Typography>
        <Typography data-testid={`time-${time}`} variant="caption">
          {moment(time).format(DATE_TIME_FORMAT)}
        </Typography>
      </CardContent>
    </Card>
  );
};
