// @flow
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CancelIcon from "@material-ui/icons/Cancel";
import Chip from "@material-ui/core/Chip";
import ClearIcon from "@material-ui/icons/Clear";
import MenuItem from "@material-ui/core/MenuItem";
import React, { type Node } from "react";
import classNames from "classnames";

type Props = {
  children: Node,
  classes: CommonSelectClasses,
  data: CommonSelectOption,
  isFocused: boolean,
  isSelected: boolean,
  onFocus: Function,
  selectOption: (CommonSelectOption, SyntheticEvent<*>) => any,
  formatOption: CommonSelectOption => Node,
};

type MultiValueContainerProps = {
  children: Node,
};

type MultiValueRemoveProps = {
  innerProps: Object,
};

type ClearIndicatorProps = {
  innerProps: Object,
};

type DropdownProps = {
  selectProps: SelectProps,
};

type NoOptionsMessageProps = {
  selectProps: AdditionalSelectProps,
  selectType: string,
};

export const DropdownIndicator = (props: DropdownProps) => {
  const {
    selectProps: { menuIsOpen },
  } = props;
  return (
    <div className="common-select__dropdown-arrow">{menuIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
  );
};

export const NoOptionsMessage = (props: NoOptionsMessageProps) => {
  const {
    selectType,
    selectProps: { inputValue, initialMessage },
  } = props;
  let message = "No results found";
  if (!inputValue && selectType !== "simple") {
    initialMessage ? (message = initialMessage) : (message = "Begin Typing...");
  }
  return <MenuItem selected={false}>{message}</MenuItem>;
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  const { innerProps } = props;
  return (
    <ClearIcon
      className="common-select__clear-icon"
      {...innerProps}
    />
  );
};

export const MultiValueContainer = (props: MultiValueContainerProps) => {
  const { children } = props;
  return (
    <Chip
      tabIndex={-1}
      label={children}
      classes={{
        root: "common-select__chip-root",
        label: "common-select__chip-label",
      }}
    />
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  const { innerProps } = props;
  return <CancelIcon {...innerProps} />;
};

export const Option = (props: Props) => {
  const {
    classes = {}, children, data, isFocused, isSelected, onFocus, selectOption, formatOption,
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
