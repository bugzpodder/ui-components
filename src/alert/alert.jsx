// @flow
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import React, { type Node } from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";
import styles from "./alert.module.scss";

type Props = {
  /** The message to display in the alert */
  message: Node,
  /** Classname applied to the alert component */
  className?: string,
  /** The color styling of the alert. Defaults to `error` */
  color?: AlertColor,
  /** When "center", aligns the Alert's messages horizontally */
  textAlign?: string,
  /** When "flat", changes the styling of the alert */
  variant?: string,
};

const colorIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

/**
 * `Alert is a styled alert pane for UI components`
 */
export const Alert = (props: Props) => {
  const {
    textAlign = "", className = "", color = "error", message, variant = "",
  } = props;
  const Icon = colorIcon[color];
  return (
    <div
      data-testid="alert"
      className={styles.alertContainer}
    >
      <SnackbarContent
        className={classNames(styles[color], styles[variant], `alert-${color}`, className)}
        classes={{
          message: styles[textAlign],
        }}
        message={(
          <span>
            <Icon className={styles.alertIcon} />
            {message}
          </span>
)}
      />
    </div>
  );
};
