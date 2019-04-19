// @flow
import React from "react";
import { DATE_FORMAT } from "@grail/lib";
import { FormattedDateTime } from "./components/formatted-date-time";

export type Props = {
  /** id passed to span element wrapping date value */
  id?: string,
  /** The date value rendered */
  value?: string,
  /** classname applied to span wrapping date value */
  className?: string,
  /** format (defaults to YYYY-MM-DD) */
  format?: string,
};

/** DateValue formats a date value. */
export const DateValue = (props: Props) => {
  const { format = DATE_FORMAT } = props;

  return (
    <FormattedDateTime
      data-testid="date-value"
      format={format}
      {...props}
    />
  );
};
