import React from "react";
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import { NotificationTypes } from "@grailbio/lib";

type Props = {
  type: string;
};

export const NotificationTypeIcon = (props: Props) => {
  const { type } = props;
  let IconComponent = InfoIcon;
  let color = "inherit";
  switch (type) {
    case NotificationTypes.ERROR: {
      IconComponent = ErrorIcon;
      color = "error";
      break;
    }
    case NotificationTypes.WARNING: {
      IconComponent = WarningIcon;
      color = "secondary";
      break;
    }
    // TODO(nsawas): Revisit icons and their definitions. INFO should probably not reference primary.
    case NotificationTypes.INFO: {
      IconComponent = InfoIcon;
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
