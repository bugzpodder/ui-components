// @flow
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, { type ElementConfig } from "react";
import Select from "@material-ui/core/Select";
import styles from "./selector.module.scss";
import { ReadOnlyTextField } from "../readonly-text-field";

type OptionalSelectorProps = {
  /** Gives the element a persistent label */
  label?: string,
  /** Id of the element */
  id?: string,
  /** Default text to display if it should be read-only and no value. */
  defaultDisplayText?: string,
  /** if `true`, displays the value or default display text as a read-only text. */
  readOnly?: boolean,
  /** Function to be called when user chooses a dropdown option */
  onSelect?: Function,
  /** When `true`, displays selector in error state */
  showError?: boolean,
  /** Helper text displayed under the selector */
  helperText?: string,
};
type SelectorProps = {
  /**
   * Possible options for the selector.
   * Should be an array of Objects in this format: `{ key: string, text: string }`,
   * where `key` is the value for chosen input, and `text` is the display text for the option.
   */
  data: SelectorData,
  /** Name of the selector. */
  name: string,
} & OptionalSelectorProps &
  ElementConfig<typeof Select>;

/** `Selector` is a wrapper around the Material UI `Select` for displaying a selector input. */
export const Selector = (props: SelectorProps) => {
  const {
    onSelect,
    showError = false,
    helperText = "",
    name,
    label = "",
    value = "",
    id = "selector",
    data,
    defaultDisplayText = "Select",
    readOnly,
    ...selectProps
  } = props;
  const menuItems = data.map(({ key = "", text }, index) => {
    return (
      <MenuItem
        disableRipple
        id={`${id}-item-${key.toString().replace(/\s/g, "-")}`}
        className={`${id}-selector-item`}
        key={index}
        value={key}
      >
        {text}
      </MenuItem>
    );
  });
  // Look up display text for the selected key
  const selectedDatum = data.find(datum => datum.key === value);
  const { text: displayText } = selectedDatum || {};

  if (data.length) {
    if (readOnly) {
      return <ReadOnlyTextField>{displayText || defaultDisplayText}</ReadOnlyTextField>;
    }
    return (
      <div className={styles.selectorContainer}>
        <FormControl
          className={styles.selectorForm}
          error={showError}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            displayEmpty
            id={id}
            data-testid={id}
            value={value}
            onChange={onSelect ? event => onSelect(event.target.value) : undefined}
            input={(
              <Input
                data-testid="selector-value"
                name={name}
                id={id}
              />
)}
            SelectDisplayProps={{
              "data-testid": `${id}-button`,
            }}
            {...selectProps}
          >
            {!displayText &&
              !label && (
                <MenuItem
                  disableRipple
                  value=""
                  disabled
                >
                  {defaultDisplayText}
                </MenuItem>
            )}
            {menuItems}
          </Select>
          <FormHelperText
            error={showError}
            id={`${id}-selector-helpertext`}
          >
            {helperText}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }

  return <ReadOnlyTextField>{helperText || "Nothing to select"}</ReadOnlyTextField>;
};
