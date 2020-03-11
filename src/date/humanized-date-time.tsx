import React from "react";
import classNames from "classnames";
import styles from "./humanized-date-time.module.scss";
import { DateTimeValue } from "./date-time-value";
import { formatDistance } from "date-fns";
import { parseDate } from "@grailbio/lib";

export type HumanizedDateTimeClasses = {
  dateTime?: string;
  humanizedText?: string;
};

export type Props = {
  /** id passed to span element wrapping date value */
  id?: string;
  /** The date value rendered */
  value?: string;
  /**
   * Provides classNames to the HumanizedDateTime component. Options include:
   *
   *  - `dateTime` (applied to date-time value)
   *
   *  - `humanizedField` (applied to humanized text)
   */
  classes?: HumanizedDateTimeClasses;
} & React.ComponentProps<typeof DateTimeValue>;

/** HumanizedDateTime formats a datetime value along with an expression describing the distance from the datetime
 * value and now. */
export const HumanizedDateTime = (props: Props) => {
  const { classes = {}, id, ...otherProps } = props;
  const date = parseDate(props.value);
  return (
    <div data-testid="humanized-date-time" id={id}>
      <DateTimeValue className={classes.dateTime} {...otherProps} />
      <div
        data-testid="humanized"
        className={classNames(styles.humanized, classes.humanizedText)}
      >
        {date ? formatDistance(date, new Date()) : "-"}
      </div>
    </div>
  );
};
