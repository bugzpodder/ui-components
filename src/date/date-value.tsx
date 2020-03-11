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

/** DateValue formats a date value. */
export const DateValue = (props: Props) => {
  const { defaultDateFormat } = useDateFormat();
  const { format = defaultDateFormat } = props;

  return (
    <FormattedDateTime data-testid="date-value" format={format} {...props} />
  );
};
