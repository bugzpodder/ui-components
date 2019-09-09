// @flow
import React, { type ElementConfig, useState } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./text-input.module.scss";

const isEmptyValue = value => value == null || value === "";

const getDisplayValue = (
  value,
  readOnly?: boolean,
  hasReadOnlyDefaultValue: boolean,
  readOnlyDefaultValue?: any
) => {
  const defaultValue = hasReadOnlyDefaultValue ? readOnlyDefaultValue : "-";
  return isEmptyValue(value) && readOnly ? defaultValue : value;
};

type Props = {
  /** If true, displays the field as read-only (with label and helper text). */
  readOnly?: boolean,
  /** Custom readOnly default value. Default to "-". It could be set explicitly to empty value, e.g. "". */
  readOnlyDefaultValue?: any,
  /** ID of the element. */
  id?: string,
  /** Classes to pass to the element. */
  className?: string,
} & ElementConfig<typeof TextField>;

/** TextInputV2 is a wrapper around the filled variant of Material UI's
TextField that accepts "readOnly" as a property.
*/
export const TextInputV2 = (props: Props) => {
  const {
    id,
    className,
    value,
    readOnly,
    readOnlyDefaultValue,
    disabled,
    placeholder,
    "data-testid": dataTestId,
    onFocus,
    onBlur,
    ...otherProps
  } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);
  // We check if readOnlyDefaultValue is explicitly set.
  const hasReadOnlyDefaultValue = readOnlyDefaultValue != null;
  const displayValue = getDisplayValue(value, readOnly,
    hasReadOnlyDefaultValue, readOnlyDefaultValue);

  return (
    <TextField
      data-testid={dataTestId || `${readOnly ? "readonly-" : ""}text-input`}
      id={id}
      className={className}
      margin="normal"
      variant="filled"
      value={displayValue}
      disabled={readOnly || disabled}
      placeholder={readOnly && hasReadOnlyDefaultValue ? undefined : placeholder}
      InputProps={{
        classes: {
          root: styles.root,
          disabled: styles.disabled,
        },
        disableUnderline: readOnly,
        readOnly,
        onFocus: event => {
          onFocus && onFocus(event);
          setIsInputFocused(true);
        },
        onBlur: event => {
          onBlur && onBlur(event);
          setIsInputFocused(false);
        },
      }}
      InputLabelProps={{
        shrink: readOnly || !isEmptyValue(value) || isInputFocused,
      }}
      {...otherProps}
    />
  );
};
