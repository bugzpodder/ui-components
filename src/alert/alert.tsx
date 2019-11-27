import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import React, { ReactNode } from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";
import styles from "./alert.module.scss";

type AlertClasses = {
  root?: string;
  content?: string;
};

type Props = {
  /** The message to display in the alert */
  message: ReactNode;
  /** Classname applied to the alert component */
  className?: string;
  /**
   * Provides classNames to the alert and its sub-components. Options include:
   *  - `root`
   *
   *  - `content`
   */
  classes?: AlertClasses;
  /** The color styling of the alert. Defaults to `error` */
  color?: string;
  /** When "center", aligns the Alert's messages horizontally */
  textAlign?: string;
  /** When "text", changes the styling of the alert */
  variant?: string;
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
export const Alert: React.FC<Props> = props => {
  const {
    textAlign = "",
    className = "",
    classes = {},
    color = "error",
    message,
    variant = "",
    ...alertProps
  } = props;
  const Icon = colorIcon[color];
  return (
    <div
      data-testid="alert"
      className={classNames(styles.alertContainer, classes.root)}
    >
      <SnackbarContent
        data-testid="content"
        className={classNames(
          styles[color],
          styles[variant],
          `alert-${color}`,
          className,
          classes.content,
        )}
        classes={{
          message: styles[textAlign],
        }}
        message={
          <span data-testid={`${color}-alert-message`}>
            <Icon
              data-testid={`${color}-alert-icon`}
              className={styles.alertIcon}
            />
            {message}
          </span>
        }
        {...alertProps}
      />
    </div>
  );
};
