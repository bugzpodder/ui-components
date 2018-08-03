// @flow
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { DATE_TIME_FORMAT } from "@grail/lib";
import moment from "moment";
import { NotificationTypeIcon } from "./notification-type-icon";

type Props = {
  message: string,
  time: string,
  type: string,
};

export const NotificationCard = (props: Props) => {
  const {
    message, time, type, ...remainingProps
  } = props;
  return (
    <Card
      className="margin-left-10 margin-right-10 margin-bottom-10"
      {...remainingProps}
    >
      <CardContent>
        <NotificationTypeIcon type={type} />

        {message}
        <br />
        <small>{moment(time).format(DATE_TIME_FORMAT)}</small>
      </CardContent>
    </Card>
  );
};
