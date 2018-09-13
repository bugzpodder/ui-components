// @flow
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import keycode from "keycode";
import styles from "../omni.module.scss";
import { OMNI_KEY } from "@grail/lib";

type Props = {
  omniText: string,
  onChange: (string, any) => any,
  onSearch: () => any,
  onClear: () => void,
  error: string,
  setDropdownIsOpen: boolean => any,
  isOpen?: boolean,
  defaultField?: string,
};

type State = {
  isSelected: boolean,
};

export class OmniField extends React.Component<Props, State> {
  state: State = {
    isSelected: false,
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ isSelected: this.props.isOpen });
    }
  };

  activateOmniField = () => {
    this.setState({ isSelected: true });
    this.props.setDropdownIsOpen(true);
  };

  deactivateOmniField = () => {
    this.setState({ isSelected: false });
    this.props.setDropdownIsOpen(false);
  };

  render = () => {
    const {
      omniText, onChange, onSearch, onClear, error, isOpen = false, setDropdownIsOpen,
    } = this.props;
    const omniChange = (event: InputEvent) => {
      const {
        currentTarget: { id, value: text },
      } = event;
      onChange(id, text);
    };
    const isActive = isOpen || this.state.isSelected || omniText !== "";
    const textClass = isActive ? styles.textHighlight : styles.text;
    return (
      <div className={styles.omniField}>
        <TextField
          value={omniText}
          className={classNames(styles.placeholder, textClass, isActive ? styles.fieldHighlight : styles.field)}
          onChange={omniChange}
          onKeyDown={event => {
            switch (event.keyCode) {
              case keycode("Enter"):
                return onSearch();
              case keycode("Down"):
                this.activateOmniField();
                event.preventDefault();
                break;
              case keycode("Up"):
                this.deactivateOmniField();
                event.preventDefault();
                break;
              default:
            }
          }}
          onFocus={this.activateOmniField}
          onBlur={this.deactivateOmniField}
          fullWidth
          error={!!error}
          helperText={error}
          FormHelperTextProps={{ error: true }}
          id={OMNI_KEY}
          placeholder="Search here or use dropdown"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  id={`${OMNI_KEY}-search`}
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
                {omniText !== undefined &&
                  omniText !== "" && (
                    <IconButton
                      id={`${OMNI_KEY}-clear`}
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
                  id={`${OMNI_KEY}-menu`}
                  data-testid="search-options-expander"
                  label="menu"
                  color="inherit"
                  title="Search options"
                  className={classNames(styles.iconButton, textClass)}
                  disableRipple
                  aria-label="Expand search options"
                  onClick={setDropdownIsOpen.bind(this, !this.props.isOpen)}
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
}
