// @flow
import React from "react";
import classNames from "classnames";
import moment from "moment";
import styles from "./humanized-date-time.module.scss";
import { DateTimeValue } from "./date-time-value";

export type Props = {
  /** id passed to span element wrapping date value */
  id?: string,
  /** The date value rendered */
  value?: string,
  /**
   * Provides classNames to the HumanizedDateTime component. Options include:
   *
   *  - `dateTime` (applied to date-time value)
   *
   *  - `humanizedField` (applied to humanized text)
   */
  classes?: HumanizedDateTimeClasses,
};

/** HumanizedDateTime formats a datetime value along with an expression describing the distance from the datetime
 * value and now. */
export const HumanizedDateTime = (props: Props) => {
  const { classes = {}, id, ...otherProps } = props;

  return (
    <div id={id}>
      <DateTimeValue
        className={classes.dateTime}
        {...otherProps}
      />
      <div className={classNames(styles.humanized, classes.humanizedText)}>
        {moment(props.value).fromNow()}
      </div>
    </div>
  );
};
