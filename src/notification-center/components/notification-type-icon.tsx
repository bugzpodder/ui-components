import Error from "@material-ui/icons/Error";

import Info from "@material-ui/icons/Info";
import React from "react";
import Warning from "@material-ui/icons/Warning";
import { NotificationTypes } from "@grailbio/lib";

type Props = {
  type: string;
};

export const NotificationTypeIcon: React.FC<Props> = props => {
  const { type } = props;
  let IconComponent = Info;
  let color = "inherit";
  switch (type) {
    case NotificationTypes.ERROR: {
      IconComponent = Error;
      color = "error";
      break;
    }
    case NotificationTypes.WARNING: {
      IconComponent = Warning;
      color = "secondary";
      break;
    }
    // TODO(nsawas): Revisit icons and their definitions. INFO should probably not reference primary.
    case NotificationTypes.INFO: {
      IconComponent = Info;
      color = "primary";
      break;
    }
    default:
      return null;
  }
  return (
    <div>
      <IconComponent
        data-testid={`notification-type-${type}`}
        // @ts-ignore: string is not assignable.
        color={color}
      />
    </div>
  );
};
