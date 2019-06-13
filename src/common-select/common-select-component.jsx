// @flow
import "./common-select.scss";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useState } from "react";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import {
  ClearIndicator,
  CommonSelectContainer,
  DropdownIndicator,
  MultiValueContainer,
  MultiValueRemove,
  NoOptionsMessage,
  Option,
} from "./components";

type Props = {
  value?: CommonSelectOption | Array<CommonSelectOption> | null,
  classes?: CommonSelectClasses,
  isFullWidth?: boolean,
  helperText?: string,
  id?: string,
  "data-testid"?: string,
  initialMessage?: string,
  isClearable?: boolean,
  isDisabled?: boolean,
  menuIsOpen?: boolean,
  onChange: Function,
  label?: string,
  placeholder?: string,
  selectType?: "simple" | "async" | "creatable",
  showError?: boolean,
  formatOption?: CommonSelectOption => Node,
};

export const CommonSelectComponent = (props: Props) => {
  const {
    onChange,
    formatOption,
    menuIsOpen,
    classes = {},
    isFullWidth = false,
    helperText = "",
    id = "",
    "data-testid": dataTestId,
    initialMessage = "",
    isClearable = true,
    isDisabled = false,
    label = "",
    placeholder = "",
    showError = false,
    ...otherProps
  } = props;
  const { value } = otherProps;
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div
      data-testid="common-select"
      className={classNames("common-select__root", classes.root)}
    >
      <FormControl fullWidth={isFullWidth}>
        {label && (
          <InputLabel
            data-testid="common-select-input-label"
            classes={{ formControl: classNames("common-select__input-label", classes.label) }}
            htmlFor={id}
            shrink={isInputFocused || !isEmpty(value)}
          >
            {label}
          </InputLabel>
        )}
        <Input
          inputComponent={CommonSelectContainer}
          disabled={isDisabled}
          error={!isDisabled && showError}
          data-testid={dataTestId}
          inputProps={{
            ...otherProps,
            id,
            inputId: `${id && `${id}-`}select-input${isDisabled ? "-disabled" : ""}`,
            initialMessage,
            isDisabled,
            placeholder,
            menuIsOpen: isDisabled ? false : menuIsOpen,
            classNamePrefix: "common-select",
            isClearable,
            onChange: value => onChange(value),
            components: {
              Option: selectProps => (
                <Option
                  {...selectProps}
                  classes={classes}
                  formatOption={formatOption}
                />
              ),
              DropdownIndicator,
              IndicatorSeparator: null,
              ClearIndicator,
              NoOptionsMessage,
              MultiValueContainer,
              MultiValueRemove,
            },
          }}
          onFocus={setIsInputFocused.bind(this, true)}
          onBlur={setIsInputFocused.bind(this, false)}
          classes={{
            root: classNames("common-select__input-root", classes.input),
          }}
        />
        {helperText && (
          <FormHelperText
            error={showError}
            data-testid={`${id ? `${id}-` : ""}select-helper-text`}
            classes={{
              root: classNames({ [`${id}-helpertext`]: id }, "common-select__helpertext"),
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
