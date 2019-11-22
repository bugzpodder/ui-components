import React from "react";
import { FormattedDateTime } from "./components/formatted-date-time";
import { useDateFormat } from "./picker-util-provider-hoc";

export type Props = {
  /** id passed to span element wrapping date value */
  id?: string;
  /** The date value rendered */
  value?: string;
  /** classname applied to span wrapping date value */
  className?: string;
  /** format (defaults to YYYY-MM-DD) */
  format?: string;
};

/** DateTimeValue formats a datetime value. */
export const DateTimeValue: React.FC<Props> = props => {
  const { defaultDateTimeFormat } = useDateFormat();
  const { format = defaultDateTimeFormat } = props;

  return (
    <FormattedDateTime
      data-testid="date-time-value"
      format={format}
      {...props}
    />
  );
};
