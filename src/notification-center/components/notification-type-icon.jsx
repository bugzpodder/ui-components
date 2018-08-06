// @flow
import Error from "@material-ui/icons/Error";
import Info from "@material-ui/icons/Info";
import React from "react";
import Warning from "@material-ui/icons/Warning";

import { NotificationTypes } from "@grail/lib";

type Props = {
  type: string,
};

export const NotificationTypeIcon = (props: Props) => {
  const { type } = props;
  let IconComponent = Info;
  switch (type) {
    case NotificationTypes.ERROR: {
      IconComponent = Error;
      break;
    }
    case NotificationTypes.WARNING: {
      IconComponent = Warning;
      break;
    }
    case NotificationTypes.INFO: {
      IconComponent = Info;
      break;
    }
    default:
  }
  return (
    <div>
      <IconComponent color={type} />
    </div>
  );
};
