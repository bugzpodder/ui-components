import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import keycode from "keycode";
import styles from "../omni.module.scss";
import { OMNI_KEY } from "@grailbio/lib";

export const OMNI_INPUT_FIELD_ID = `${OMNI_KEY}-input-field-id`;

type Props = {
  omniText: string;
  onChange: (x0: string, x1: any) => any;
  onSearch: () => any;
  onClear: () => any;
  error: string;
  setOmniIsOpen: (x0: boolean) => any;
  isOpen?: boolean;
  defaultField?: string;
};

export const OmniField: React.FC<Props> = props => {
  const {
    omniText,
    onChange,
    onSearch,
    onClear,
    error,
    isOpen = false,
    setOmniIsOpen,
  } = props;
  const [isSelected, setIsSelected] = useState(isOpen);

  useEffect(() => {
    setIsSelected(isOpen);
  }, [isOpen]);

  const activateOmniField = () => {
    setIsSelected(true);
  };

  const deactivateOmniField = () => {
    setIsSelected(false);
  };

  const setOmniVisibility = (isVisible: boolean) => {
    setOmniIsOpen(isVisible);
  };

  const toggleOmniVisibility = () => {
    setOmniIsOpen(!isOpen);
  };

  const omniChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id, value: text },
    } = event;
    onChange(id, text);
  };
  const isActive = isOpen || isSelected || omniText !== "";
  const textClass = isActive ? styles.textHighlight : styles.text;
  return (
    <div className={styles.omniField}>
      <TextField
        value={omniText}
        className={classNames(
          styles.placeholder,
          textClass,
          isActive ? styles.fieldHighlight : styles.field,
        )}
        onChange={omniChange}
        onKeyDown={event => {
          switch (event.keyCode) {
            case keycode("Enter"):
              return onSearch();
            case keycode("Down"):
              setOmniVisibility(true);
              event.preventDefault();
              break;
            case keycode("Up"):
              setOmniVisibility(false);
              event.preventDefault();
              break;
            default:
          }
        }}
        onFocus={activateOmniField}
        onBlur={deactivateOmniField}
        fullWidth
        error={!!error}
        helperText={error}
        FormHelperTextProps={{ error: true }}
        id={OMNI_INPUT_FIELD_ID}
        placeholder="Search here or use dropdown"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                id={`${OMNI_INPUT_FIELD_ID}-search`}
                title="Search"
                color="inherit"
                onClick={onSearch}
                className={classNames(styles.iconButton, textClass)}
                aria-label="Clear entered search values"
                disableRipple
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {omniText !== undefined && omniText !== "" && (
                <IconButton
                  id={`${OMNI_INPUT_FIELD_ID}-clear`}
                  data-testid="clear-omni-field"
                  title="Clear"
                  color="inherit"
                  onClick={async () => {
                    await onClear();
                    onSearch();
                  }}
                  className={classNames(styles.iconButton, textClass)}
                  aria-label="Clear entered search values"
                  disableRipple
                >
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton
                id={`${OMNI_INPUT_FIELD_ID}-menu`}
                data-testid="search-options-expander"
                color="inherit"
                title="Search options"
                className={classNames(styles.iconButton, textClass)}
                disableRipple
                aria-label="Expand search options"
                onClick={toggleOmniVisibility}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
