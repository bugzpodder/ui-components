import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import ClearIcon from "@material-ui/icons/Close";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Downshift from "downshift";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

import Popper from "@material-ui/core/Popper";

import React, { ReactNode, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import keycode from "keycode";
import styles from "./common-suggest.module.scss";
import { unquoteString, valueToSuggestions } from "@grailbio/lib";

type Props = {
  /** The input id */
  id?: string;
  /** Placeholder */
  placeholder?: string;
  /** Array of suggestion strings */
  suggestions: string[];
  /** Currently entered value as shown in the input field. Could include commas, indicating an array */
  value: string;
  /** Called to set the new value */
  onChange: (x0: string) => any;
  /** Called when user hits enter */
  onEnter?: () => any;
  /** Additional actions at the bottom of the suggestion Popper */
  actions?: ReactNode;
};

/**
 * This is in development.
 * TODO(jsingh) tests + markdown
 */
export const CommonSuggest: React.FC<Props> = props => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const closePopper = () => {
    setIsPopperOpen(false);
    setIsManuallyOpened(false);
  };

  const {
    id,
    placeholder,
    suggestions,
    onChange,
    onEnter,
    value,
    actions,
  } = props;
  const valueElements = value.split(",").map(element => element.trim());
  let items = suggestions.map(value => ({ value }));
  if (valueElements.length > 0) {
    let lastValue = valueElements.pop();
    lastValue = unquoteString(lastValue);
    if (!isManuallyOpened) {
      items = valueToSuggestions(lastValue, suggestions).map(value => ({
        value,
      }));
    }
  }
  const onSelectSuggestion = item => {
    const suggestedValue = item ? item.value : "";
    const quotedValue = `"${suggestedValue}"`;
    valueElements.push(quotedValue);
    onChange(valueElements.join(", "));
    closePopper();
  };
  return (
    <div className={styles.commonSuggest}>
      <Downshift
        id="common-suggest"
        inputValue={value}
        onChange={onSelectSuggestion}
        itemToString={item => (item ? item.value : "")}
        isOpen={isPopperOpen}
      >
        {({
          getInputProps,
          getItemProps,
          getToggleButtonProps,
          highlightedIndex,
          isOpen,
        }) => {
          const toggleButtonProps = getToggleButtonProps({
            id: `${id || ""}-toggle-suggestions`,
            // @ts-ignore: data-testid does not exist on type
            "data-testid": "toggle-suggestions",
            label: "menu",
            color: "inherit",
            title: "Show suggestions",
            disableRipple: true,
            tabIndex: -1,
            onClick: () => {
              setIsPopperOpen(isPopperOpen => !isPopperOpen);
              setIsManuallyOpened(true);
            },
            onKeyDown: e => {
              if (e.key === "Tab") {
                closePopper();
              }
            },
            classes: { root: styles.commonSuggestButton },
          });
          const onKeyDown = event => {
            if (
              (!items.length || !isOpen || highlightedIndex == null) &&
              event.keyCode === keycode("Enter")
            ) {
              closePopper();
              onEnter && onEnter();
            } else {
              setIsPopperOpen(true);
              setIsManuallyOpened(false);
            }
          };
          const { InputProps, ref, ...otherInputProps } = getInputProps({
            fullWidth: true,
            onChange: event => onChange(event.target.value),
            placeholder,
            ref: null,
            InputProps: {
              "data-testid": "common-suggest-input-container",
              onKeyDown,
              endAdornment: (
                <InputAdornment position="end">
                  {value && (
                    <IconButton
                      data-testid="clear-value"
                      color="inherit"
                      disableRipple
                      tabIndex={-1}
                      onClick={() => onChange("")}
                      classes={{ root: styles.commonSuggestButton }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
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

          const textField = (
            // @ts-ignore: no overload matches this call.
            <TextField
              InputProps={{
                inputRef: ref,
                ...InputProps,
              }}
              {...otherInputProps}
            />
          );
          return (
            <div className={styles.commonSuggestField}>
              {textField}
              <ClickAwayListener onClickAway={closePopper}>
                <Popper
                  id="common-suggest-popover"
                  data-testid="common-suggest-popper"
                  open={isOpen}
                  anchorEl={ref}
                  placement="top"
                  disablePortal
                  className={styles.commonSuggestPopper}
                >
                  <Paper elevation={2} square data-testid="items">
                    {items.map((item, index) => {
                      const itemProps = getItemProps({
                        key: index,
                        index,
                        item,
                      });
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
                        key="no-matches"
                        variant="caption"
                        className={styles.noMatches}
                      >
                        No matches
                      </Typography>
                    )}
                    {actions}
                  </Paper>
                </Popper>
              </ClickAwayListener>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};
