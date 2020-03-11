import React from "react";
import { useFormattedDateForDisplay } from "../picker-util-provider-hoc";

type FormatProps = {
  format: string;
  id?: string;
  value?: string;
  className?: string;
};

export const FormattedDateTime = (props: FormatProps) => {
  const { id, value, format, className = "", ...otherProps } = props;
  const formattedDate = useFormattedDateForDisplay(value, format);
  return (
    <span id={id} className={className} {...otherProps}>
      {formattedDate || "-"}
    </span>
  );
};
