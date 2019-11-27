import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CancelIcon from "@material-ui/icons/Cancel";
import Chip from "@material-ui/core/Chip";
import ClearIcon from "@material-ui/icons/Clear";
import MenuItem from "@material-ui/core/MenuItem";
import React, { FocusEvent, MouseEvent, ReactNode } from "react";
import classNames from "classnames";
import {
  AdditionalSelectProps,
  CommonSelectClasses,
  CommonSelectOption,
} from "../../types/select";

type Props = {
  children: ReactNode;
  classes: CommonSelectClasses;
  data: CommonSelectOption;
  isFocused: boolean;
  isSelected: boolean;
  onFocus: (x0: FocusEvent) => void;
  selectOption: (x0: CommonSelectOption, x1: MouseEvent<any>) => any;
  formatOption: (x0: CommonSelectOption) => ReactNode;
};

type MultiValueContainerProps = {
  children: ReactNode;
};

type MultiValueRemoveProps = {
  data: CommonSelectOption;
  innerProps: {
    [x: string]: any;
  };
};

type ClearIndicatorProps = {
  innerProps: {
    [x: string]: any;
  };
};

type DropdownProps = {
  selectProps: {
    menuIsOpen?: boolean;
  };
};

type NoOptionsMessageProps = {
  selectProps: AdditionalSelectProps;
  selectType: string;
  getValue: Function;
};

export const DropdownIndicator: React.FC<DropdownProps> = props => {
  const {
    selectProps: { menuIsOpen },
  } = props;
  return (
    <div className="common-select__dropdown-arrow">
      {menuIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  );
};

export const NoOptionsMessage: React.FC<NoOptionsMessageProps> = props => {
  const {
    selectType,
    selectProps: { inputValue, initialMessage },
    getValue,
  } = props;
  let noOptionsMessage = "No results found";
  if (!inputValue && selectType !== "simple") {
    initialMessage
      ? (noOptionsMessage = initialMessage)
      : (noOptionsMessage = "Begin Typing...");
  }

  const matchedChips = getValue().filter(
    ({ label, value }) => inputValue === label || inputValue === value,
  );
  if (inputValue && matchedChips.length > 0) {
    noOptionsMessage = `"${inputValue}" has already been added`;
  }
  return (
    <MenuItem data-testid="no-options-message" selected={false}>
      {noOptionsMessage}
    </MenuItem>
  );
};

export const ClearIndicator: React.FC<ClearIndicatorProps> = props => {
  const { innerProps } = props;
  return (
    <ClearIcon
      data-testid="clear-icon"
      className="common-select__clear-icon"
      {...innerProps}
    />
  );
};

export const MultiValueContainer: React.FC<
  MultiValueContainerProps
> = props => {
  const { children } = props;
  return (
    <Chip
      data-testid="multi-value-chip"
      tabIndex={-1}
      label={children}
      classes={{
        root: "common-select__chip-root",
        label: "common-select__chip-label",
      }}
    />
  );
};

export const MultiValueRemove: React.FC<MultiValueRemoveProps> = props => {
  const { data, innerProps } = props;
  return <CancelIcon data-testid={`remove-${data.value}`} {...innerProps} />;
};

export const Option: React.FC<Props> = props => {
  const {
    classes,
    children,
    data,
    isFocused,
    isSelected,
    onFocus,
    selectOption,
    formatOption,
  } = props;
  const handleClick = event => {
    selectOption(data, event);
  };
  const optionContent = formatOption ? formatOption(data) : children;
  return (
    <MenuItem
      id={data.value}
      data-testid={data.value}
      component="div"
      className={classNames(classes.options, "common-select__menu-item", {
        "is-selected": isSelected,
        "custom-content": formatOption,
      })}
      onFocus={onFocus}
      selected={isFocused}
      onClick={handleClick}
    >
      {optionContent}
    </MenuItem>
  );
};
