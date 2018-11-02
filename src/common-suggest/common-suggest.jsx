// @flow
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Downshift from "downshift";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
// $FlowFixMe Cannot resolve module @material-ui/core/Popper (despite updating flowtypes)
import Popper from "@material-ui/core/Popper";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import fuzzy from "fuzzy";
import keycode from "keycode";

import styles from "./common-suggest.module.scss";

type Props = {
  /** The input id */
  id?: string,
  /** Placeholder */
  placeholder?: string,
  /** Array of suggestion strings */
  suggestions: Array<string>,
  /** Currently entered value as shown in the input field. Could include commas, indicating an array */
  value: string,
  /** Called to set the new value */
  onChange: string => any,
  /** Called when user hits enter */
  onEnter: () => any,
};

/**
 * This is in development.
 * TODO(jsingh) tests + markdown
 */
export const CommonSuggest = (props: Props) => {
  const {
    id, placeholder, suggestions, onChange, onEnter, value,
  } = props;
  let items = suggestions.map(value => ({ value }));
  const valueElements = value.split(",").map(element => element.trim());
  let lastValue = "";
  if (valueElements.length > 0) {
    lastValue = valueElements.pop();
    const fuzzyMatches = fuzzy.filter(lastValue, suggestions);
    items = fuzzyMatches.map(match => ({ value: match.string }));
  }
  const onSelectSuggestion = item => {
    const suggestedValue = item ? item.value : "";
    valueElements.push(suggestedValue);
    onChange(valueElements.join(", "));
  };
  return (
    <div className={styles.commonSuggest}>
      <Downshift
        id="common-suggest"
        inputValue={value}
        onChange={onSelectSuggestion}
        itemToString={item => (item ? item.value : "")}
      >
        {({
          getInputProps, getItemProps, getToggleButtonProps, highlightedIndex, isOpen,
        }) => {
          const toggleButtonProps = getToggleButtonProps({
            id: `${id || ""}-toggle-suggestions`,
            "data-testid": "toggle-suggestions",
            label: "menu",
            color: "inherit",
            title: "Show suggestions",
            disableRipple: true,
            tabIndex: -1,
          });
          const onKeyDown = event => {
            if ((!items.length || !isOpen || highlightedIndex == null) && event.keyCode === keycode("Enter")) {
              onEnter();
            }
          };
          const { InputProps, ref, ...otherInputProps } = getInputProps({
            fullWidth: true,
            onChange: event => onChange(event.target.value),
            placeholder,
            InputProps: {
              "data-testid": "common-suggest-input-container",
              onKeyDown,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton {...toggleButtonProps}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            inputProps: {
              id,
              "data-testid": id,
            },
          });
          return (
            <div className={styles.commonSuggestField}>
              <TextField
                InputProps={{
                  inputRef: ref,
                  ...InputProps,
                }}
                {...otherInputProps}
              />
              <Popper
                id="common-suggest-popover"
                data-testid="common-suggest-popper"
                open={isOpen}
                anchorEl={ref}
                placement="top"
                disablePortal
                className={styles.commonSuggestPopper}
              >
                <Paper
                  square
                  data-testid="items"
                >
                  {items.map((item, index) => {
                    const itemProps = getItemProps({ key: index, index, item });
                    return (
                      <MenuItem
                        {...itemProps}
                        selected={index === highlightedIndex}
                        component="div"
                        className={styles.item}
                      >
                        {item.value}
                      </MenuItem>
                    );
                  })}
                  {!items.length && (
                    <Typography
                      variant="caption"
                      className={styles.noMatches}
                    >
                      No matches
                    </Typography>
                  )}
                </Paper>
              </Popper>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};
