import React, { ComponentProps } from "react";
import isString from "lodash/isString";
import { CommonSelectComponent } from "./common-select-component";
import { CommonSelectOption } from "../types/select";

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
} & Omit<ComponentProps<typeof CommonSelectComponent>, "onChange">;

export const CommonMultiSelect: React.FC<CommonMultiSelectProps> = props => {
  const {
    onChange,
    isValidNewOption,
    selectType,
    values,
    ...otherProps
  } = props;

  const onValueChange = values => {
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
