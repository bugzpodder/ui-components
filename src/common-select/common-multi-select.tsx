import React, { ComponentProps } from "react";
import { Chip } from "@material-ui/core";
import { CommonSelectComponent } from "./common-select-component";
import { CommonSelectOption } from "../types/select";
import { isString } from "lodash";

type CommonMultiSelectProps = {
  /**
   * The function used to retrieve the values set by the select component.
   */
  onChange: (x0: CommonSelectOption[]) => void;
  /**
   * Tells the select which options to use as its values.
   * Strings should match the `value` properties of some objects in the options.
   */
  values: CommonSelectOption[];
  /**
   *
   * When `selectType="async"`, provides a list of initial options to display when no
   * results have been fetched.
   *
   */
  initialOptions?: CommonSelectOption[];
  /**
   * Whether the new input is valid.
   */
  isValidNewOption?: (input: string) => boolean;
  /** displays component as read only */
  readOnly?: boolean;
} & Omit<ComponentProps<typeof CommonSelectComponent>, "onChange">;

export const CommonMultiSelect = (props: CommonMultiSelectProps) => {
  const {
    onChange,
    isValidNewOption,
    selectType,
    values,
    readOnly,
    ...otherProps
  } = props;

  if (readOnly) {
    if (values.length === 0) {
      return <>-</>;
    }
    return (
      <>
        {values.map(option => (
          <Chip label={option.label} key={option.value} />
        ))}
      </>
    );
  }

  const onValueChange = (values): void => {
    if (!values || values.length === 0 || selectType !== "creatable") {
      onChange(values == null ? [] : values);
      return;
    }

    const oldValues = values.filter(value => !isString(value));
    const newValues = values
      .filter(
        value =>
          isString(value) &&
          ((!isValidNewOption && value) || isValidNewOption(value)),
      )
      .map(value => ({ label: value, value }));

    onChange([...oldValues, ...newValues]);
  };

  return (
    <CommonSelectComponent
      onChange={onValueChange}
      selectType={selectType}
      value={values}
      {...otherProps}
      isMulti
    />
  );
};
