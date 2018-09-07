// @flow
import "./common-select.scss";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import React from "react";
import classNames from "classnames";
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
  classes?: CommonSelectClasses,
  isFullWidth?: boolean,
  helperText?: string,
  id?: string,
  initialMessage?: string,
  isDisabled?: boolean,
  menuIsOpen?: boolean,
  onChange: Function,
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
    initialMessage = "",
    isDisabled = false,
    placeholder = "",
    showError = false,
    ...otherProps
  } = props;
  return (
    <div className={classNames("common-select__root", classes.root)}>
      <FormControl fullWidth={isFullWidth}>
        <Input
          inputComponent={CommonSelectContainer}
          disabled={isDisabled}
          error={!isDisabled && showError}
          inputProps={{
            ...otherProps,
            id,
            initialMessage,
            isDisabled,
            placeholder,
            menuIsOpen: isDisabled ? false : menuIsOpen,
            classNamePrefix: "common-select",
            isClearable: true,
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
