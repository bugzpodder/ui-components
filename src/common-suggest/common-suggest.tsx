import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { ComponentProps, ReactNode, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import keycode from "keycode";

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
} & Omit<ComponentProps<typeof Autocomplete>, "renderInput" | "onChange">;

const getListboxElement = footer => {
  return React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLElement>>(
    (props, ref) => {
      const { children, ...otherProps } = props;
      return (
        <ul ref={ref} data-testid="items" {...otherProps}>
          {children}
          {footer}
        </ul>
      );
    },
  );
};

export const CommonSuggest: React.FC<Props> = props => {
  const {
    suggestions,
    onChange,
    actions,
    onEnter,
    placeholder,
    value,
    id,
    ...otherProps
  } = props;

  const Listbox = useMemo(() => {
    return getListboxElement(actions);
  }, [actions]);

  const onKeyDown = event => {
    if (event.keyCode === keycode("Enter")) {
      onEnter && onEnter();
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      onInputChange={(_, value) => onChange(value)}
      inputValue={value}
      ListboxComponent={Listbox}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          placeholder={placeholder}
          InputProps={{
            // @ts-ignore data-testid does not exist.
            "data-testid": "common-suggest-input-container",
            ...params.InputProps,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            ...params.inputProps,
            id,
            "data-testid": id,
            onKeyDown,
          }}
        />
      )}
      {...otherProps}
    />
  );
};
