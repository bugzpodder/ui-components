import React, {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./common-select.module.scss";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
import { CommonSelectOption } from "../types/select";
import { TextField } from "@material-ui/core";
import { getListboxElement } from "../utils";

type Props = {
  /** The current value of common select, or an array of options for common multi-select */
  value?: CommonSelectOption | CommonSelectOption[] | null;
  /** Renders the input at its full width */
  isFullWidth?: boolean;
  /** Renders the input at its full width */
  helperText?: string;
  /** Provides an id to the component */
  id?: string;
  /** Provides a name to the component */
  name?: string;
  /** Provides a data-testid to the component */
  "data-testid"?: string;
  /** The initial message to display when no initial options are provided */
  initialMessage?: string;
  /** When false, removes the button provided to clear the selected option in the input field */
  isClearable?: boolean;
  /** Disables the select from being used */
  isDisabled?: boolean;
  /** automatically opens menu */
  menuIsOpen?: boolean;
  /** Called to set the new value */
  onChange: (value: any) => void;
  /** Label for the select. */
  label?: string;
  /** Variant styles for the select component - "standard", "filled", "outlined" */
  variant?: "standard" | "filled" | "outlined";
  /** Margin types for the select component - "none", "dense", "normal". Default is "none" */
  margin?: "none" | "dense" | "normal";
  /** The text displayed in the input before the user begins typing */
  placeholder?: string;
  /**
   * default (`simple`): synchronous - user is forced to choose an option from the options
   * (requires `options` prop).
   *
   * `creatable`: allows user to create new entries that are not in the options list (requires `options` prop).
   *
   * `async`: allows for asynchronous retrieval of options based on the user's input
   *  (requires `loadOptions` prop).
   */
  selectType?: "simple" | "async" | "creatable";
  /** Displays the input in an error state */
  showError?: boolean;
  /** Renders a LinearProgress bar beneath the common select input */
  isLoading?: boolean;
  /** The content do display in the option menu item. Allows for customization of options to display
   * information from the data object. When null will default to the `label` provided in the option object.
   */
  formatOption?: (x0: CommonSelectOption) => ReactNode;
  /** Provides the ability to support multiple selections */
  isMulti?: boolean;
  /** Options for the common select, or the initial options for async select */
  options?: CommonSelectOption[];
  /**
   * The function used to retrieve options asynchronously based on the user's input.
   *
   * Each object must at least include a `label` and `value` key
   */
  loadOptions?: (x0: string) => Promise<any>;
  /** Ref passed to the input element */
  inputRef?: RefObject<HTMLElement>;
  /** Additional actions at the bottom of the suggestion Popper */
  actions?: ReactNode;
} & Omit<
  AutocompleteProps<CommonSelectOption>,
  "onChange" | "renderInput" | "options"
>;

export const CommonSelectComponent = (props: Props) => {
  const {
    onChange,
    formatOption,
    menuIsOpen,
    selectType,
    loadOptions,
    isMulti,
    options,
    isFullWidth = false,
    helperText = "",
    id = "",
    name,
    "data-testid": dataTestId,
    initialMessage = "",
    noOptionsText,
    isClearable = true,
    isDisabled = false,
    label = "",
    placeholder = "",
    showError = false,
    variant,
    margin,
    isLoading = false,
    classes = {},
    inputRef,
    actions,
    ...otherProps
  } = props;

  const [inputValue, setInputValue] = useState(otherProps.inputValue);

  useEffect(() => {
    setInputValue(otherProps.inputValue);
  }, [otherProps.inputValue]);
  const [loadedOptions, setLoadedOptions] = useState(options || []);
  useEffect(() => {
    if (selectType === "async") {
      loadOptions(inputValue).then(results => setLoadedOptions(results || []));
    }
  }, [loadOptions, selectType, inputValue]);
  const Listbox = useMemo(() => {
    return getListboxElement(actions);
  }, [actions]);

  return (
    // @ts-ignore
    <Autocomplete
      className={styles.autocomplete}
      classes={{ input: styles.input, inputRoot: styles.inputRoot, ...classes }}
      onChange={(_, value) => onChange(value)}
      options={selectType === "async" ? loadedOptions : options}
      renderOption={(option: CommonSelectOption) => (
        <div data-testid={option.value}>
          {formatOption ? formatOption(option) : option.label}
        </div>
      )}
      // @ts-ignore
      getOptionLabel={(option: CommonSelectOption) => option.label}
      getOptionDisabled={(option: CommonSelectOption) =>
        option.isEnabled === false
      }
      disabled={isDisabled}
      open={menuIsOpen}
      disableClearable={!isClearable}
      onInputChange={(_, value) => setInputValue(value)}
      loading={isLoading}
      renderInput={params => (
        // @ts-ignore variant cannot be assigned.
        <TextField
          {...params}
          name={name}
          data-testid={dataTestId}
          placeholder={inputValue ? placeholder : ""}
          label={label}
          InputLabelProps={{
            ...params.InputLabelProps,
            // @ts-ignore data-testid does not exist on props.
            "data-testid": "common-select-input-label",
          }}
          fullWidth={isFullWidth}
          variant={variant}
          margin={margin}
          helperText={helperText}
          error={!isDisabled && showError}
          id={id}
          FormHelperTextProps={{
            "data-testid": `common-select-helper-text`,
          }}
          inputProps={{
            ...params.inputProps,
            "data-testid": "common-select-input",
            id: `${id && `${id}-`}select-input${isDisabled ? "-disabled" : ""}`,
          }}
          inputRef={inputRef}
        />
      )}
      ListboxComponent={Listbox}
      freeSolo={selectType === "creatable"}
      multiple={isMulti}
      noOptionsText={
        <div data-testid="common-select-no-options-message">
          {inputValue
            ? noOptionsText || "No results found"
            : initialMessage || "Begin Typing..."}
        </div>
      }
      closeIcon={
        <CloseIcon data-testid="common-select-close-icon" fontSize="small" />
      }
      {...otherProps}
    />
  );
};
