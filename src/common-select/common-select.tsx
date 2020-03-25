import React, { ComponentProps } from "react";
import { CommonSelectComponent } from "./common-select-component";
import { CommonSelectOption } from "../types/select";
import { ReadOnlyTextField } from "../readonly-text-field";
import { isEmpty, isNil, isString } from "lodash";

type CommonSelectProps = {
  /**
   * The function used to retrieve the value set by the select component.
   */
  onChange: (x0: CommonSelectOption) => any;
  /**
   * Tells the select which option to use as its value.
   * String should match the `value` property of an object in a option.
   */
  value?: CommonSelectOption;
  /**
   *
   * When `selectType="async"`, provides a list of initial options to display when no
   * results have been fetched.
   *
   */
  initialOptions?: CommonSelectOption[];
  /** displays component as read only */
  readOnly?: boolean;
} & ComponentProps<typeof CommonSelectComponent>;

export const CommonSelect = (props: CommonSelectProps) => {
  const {
    onChange,
    readOnly,
    initialOptions,
    value,
    options,
    selectType = "simple",
    ...otherProps
  } = props;

  switch (selectType) {
    case "async":
      if (!props.loadOptions) {
        throw new Error(
          "Must provide `loadOptions` prop for async select type",
        );
      }
      break;
    case "creatable":
      break;
    default:
      if (!options) {
        throw new Error("Must provide `options` prop");
      }
  }

  if (readOnly) {
    const label = value && value.label ? value.label : " - ";
    if (isString(label)) {
      return <ReadOnlyTextField>{label}</ReadOnlyTextField>;
    }
    return <>{label}</>;
  }
  const isAsyncSelect = selectType === "async";
  return (
    <CommonSelectComponent
      selectType={selectType}
      onChange={(value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          onChange({});
        } else if (selectType === "creatable" && isString(value)) {
          onChange({ label: value, value });
        } else {
          onChange(value);
        }
      }}
      options={isAsyncSelect ? initialOptions : options}
      value={!isEmpty(value) && !isNil(value.value) ? value : null}
      {...otherProps}
      isMulti={false}
    />
  );
};
