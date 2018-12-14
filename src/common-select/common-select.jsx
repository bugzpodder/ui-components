// @flow
import React from "react";
import isEmpty from "lodash/isEmpty";
import { CommonSelectComponent } from "./common-select-component";
import { ReadOnlyTextField } from "../index";

type CommonSelectProps = {
  /**
   * The function used to retrieve the value set by the select component.
   */
  onChange: (CommonSelectOption | Object) => any,
  /**
   * Tells the select which option to use as its value.
   * String should match the `value` property of an object in a option.
   */
  value?: CommonSelectOption,
  /**
   *
   * When `selectType="async"`, provides a list of initial options to display when no
   * results have been fetched.
   *
   */
  initialOptions?: Array<CommonSelectOption>,
  /** Renders the input at its full width */
  isFullWidth?: boolean,
  /** Text displayed directly under the input */
  helperText?: string,
  /**
   * Provides classNames to table sub-components. Options include:
   *
   *  - `root`: card root div element
   *
   *  - `input`: input component
   *
   *  - `options`: option dropdown items
   */
  classes?: CommonSelectClasses,
  /** Provides an id to the component */
  id?: string,
  /** The initial message to display when `selectType` is `async` and no initial options are provided */
  initialMessage?: string,
  /** When false, removes the button provided to clear the selected option in the input field */
  isClearable?: boolean,
  /** Disables the select from being used */
  isDisabled?: boolean,
  /** The text displayed in the input before the user begins typing */
  placeholder?: string,
  /**
   * default (`simple`): synchronous - user is forced to choose an option from the options
   * (requires `options` prop).
   *
   * `creatable`: allows user to create new entries that are not in the options list (requires `options` prop).
   *
   * `async`: allows for asynchronous retrieval of options based on the user's input
   *  (requires `loadOptions` prop).
   */
  selectType?: "simple" | "async" | "creatable",
  /** Displays the input in an error state */
  showError?: boolean,
  /**
   * CommonSelectOption objects for select.
   *
   * Each object must at least include a `label` and `value` key.
   * Required for `simple`, `creatable`
   * Optional initial options for `async`
   */
  options?: Array<CommonSelectOption>,
  /** The content do display in the option menu item. Allows for customization of options to display
   * information from the data object. When null will default to the `label` provided in the options object.
   */
  formatOption?: CommonSelectOption => Node,
  /**
   * The function used to retrieve options asynchronously based on the user's input.
   *
   * Each object must at least include a `label` and `value` key
   */
  loadOptions?: string => Promise<*>,
  /** displays component as read only */
  readOnly?: boolean,
};

export class CommonSelect extends React.Component<CommonSelectProps> {
  componentDidMount = () => {
    const { selectType, options, loadOptions } = this.props;
    switch (selectType) {
      case "async":
        if (!loadOptions) {
          throw new Error("Must provide `loadOptions` prop for async select type");
        }
        break;
      case "creatable":
        break;
      default:
        if (!options) {
          throw new Error("Must provide `options` prop");
        }
    }
  };

  render = () => {
    const {
      onChange, readOnly, initialOptions, value, options, selectType = "simple", ...otherProps
    } = this.props;
    if (readOnly) {
      const label = value && value.label ? value.label : " - ";
      return <ReadOnlyTextField>{label}</ReadOnlyTextField>;
    }
    const isAsyncSelect = selectType === "async";
    return (
      <CommonSelectComponent
        selectType={selectType}
        onChange={value => {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            onChange({});
            return;
          }
          onChange(value);
        }}
        options={isAsyncSelect ? initialOptions : options}
        value={!isEmpty(value) && value.value ? value : null}
        {...otherProps}
        isMulti={false}
      />
    );
  };
}
