// @flow
import "./common-typeahead.scss";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import React from "react";
import classNames from "classnames";
import {
  ClearIndicator,
  CommonTypeaheadContainer,
  DropdownIndicator,
  MultiValueContainer,
  MultiValueRemove,
  NoOptionsMessage,
  Option,
} from "./components";

type Props = {
  /**
   * The function used to retrieve the values set by the typeahead.
   * When `isMulti` is true, returns an array of objects.
   */
  onChange: Suggestion => any | ((Array<Suggestion>) => any),
  /**
   * Tells the typeahead which suggestion(s) to use as its default value.
   * String(s) should match `value` of an object in a suggestion, or in the array of suggestions
   */
  value?: string | Array<string>,
  /** Renders the input at its full width */
  fullWidth?: boolean,
  /** Text displayed directly under the input */
  helperText?: string,
  /** provides an id to the component */
  id?: string,
  /** Disables the typeahead from being used */
  isDisabled?: boolean,
  /** Allows for the selection of multiple values */
  isMulti?: boolean,
  /** The text displayed in the input before the user begins typing */
  placeholder?: string,
  /**
   * default (`simple`): synchronous - user is forced to choose an option from the suggestions
   * (requires `suggestions` prop).
   *
   * `creatable`: allows user to create new entries that are not in the suggestions list (requires `suggestions` prop).
   *
   * `async`: allows for asynchronous retrieval of suggestions based on the user's input (requires `loadOptions` prop).
   */
  selectType?: "simple" | "async" | "creatable",
  /** Displays the input in an error state */
  showError?: boolean,
  /**
   * Suggestion objects for typeahead.
   *
   * Each object must at least include a `label` and `value` key.
   * Required for `simple`, `creatable`
   * Optional initial suggestions for `async`
   */
  suggestions?: Array<Suggestion>,
  /**
   * The function used to retrieve suggestions asynchronously based on the user's input.
   *
   * Each object must at least include a `label` and `value` key
   */
  updateSuggestions?: string => Promise<*>,
};

export const CommonTypeahead = (props: Props) => {
  const {
    id = "",
    onChange,
    suggestions = [],
    fullWidth = false,
    helperText = "",
    placeholder = "",
    isDisabled = false,
    isMulti = false,
    showError = false,
    value = "",
  } = props;
  const valueSelections = isMulti
    ? // $FlowFixMe: flow thinks `.includes()` can only take string arguments
    suggestions.filter(suggestion => value.includes(suggestion.value))
    : suggestions.find(suggestion => suggestion.value === value);
  return (
    <div className="common-typeahead__root">
      <FormControl fullWidth={fullWidth}>
        <Input
          inputComponent={CommonTypeaheadContainer}
          disabled={isDisabled}
          error={!isDisabled && showError}
          inputProps={{
            ...props,
            classNamePrefix: "common-typeahead",
            isClearable: true,
            onChange: value => {
              if (!isMulti) {
                if (!value || (Array.isArray(value) && value.length === 0)) {
                  onChange({ label: "", value: "" });
                  return;
                }
              }
              onChange(value);
            },
            components: {
              Option,
              DropdownIndicator,
              IndicatorSeparator: null,
              ClearIndicator,
              NoOptionsMessage,
              MultiValueContainer,
              MultiValueRemove,
            },
            value: valueSelections,
            placeholder,
          }}
          classes={{
            root: "common-typeahead__input-root",
          }}
        />
        {helperText && (
          <FormHelperText
            error={showError}
            classes={{
              root: classNames({ [`${id}-helpertext`]: id }, "common-typeahead__helpertext"),
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
