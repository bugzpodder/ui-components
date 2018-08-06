// @flow
import React, { type ElementConfig } from "react";
import moment from "moment";
import { DATE_TIME_FORMAT } from "@grail/lib";
import { DateTimePicker } from "material-ui-pickers";
import { ReadOnlyTextField } from "../readonly-text-field";

type Props = {
  /** When `true`, displays a read only input field (ReadOnlyTextField) */
  readOnly?: boolean,
  /** Used for read only input field, see ReadOnlyTextField. */
  showEmptyValue?: boolean,
  /** Determines value used for input, moment object */
  input?: string,
  /** Remains above the input field upon choosing a value */
  label?: string,
} & ElementConfig<typeof DateTimePicker>;

export const DateTimeInput = (props: Props) => {
  const { readOnly, showEmptyValue = false, value } = props;
  if (readOnly) {
    return (
      <ReadOnlyTextField showEmptyValue={showEmptyValue}>
        {props.value ? moment(props.value).format(DATE_TIME_FORMAT) : ""}
      </ReadOnlyTextField>
    );
  }
  return (
    <DateTimePicker
      ampm={false}
      format={DATE_TIME_FORMAT}
      keyboard
      clearable
      {...props}
      value={value || null}
    />
  );
};
