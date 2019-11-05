import React from "react";

import moment from "moment";

type FormatProps = {
  format: string;
  id?: string;
  value?: string;
  className?: string;
};

export const formatDate = (value: any, format: string) => {
  return value ? moment(value).format(format) : "-";
};

export const FormattedDateTime: React.FC<FormatProps> = props => {
  const { id, value, format, className = "", ...otherProps } = props;

  return (
    <span id={id} className={className} {...otherProps}>
      {formatDate(value, format)}
    </span>
  );
};
