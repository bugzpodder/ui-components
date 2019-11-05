// Suggestion object must include the following keys, but may also include others.
import { ReactNode } from "react";
import { SelectComponentsConfig } from "react-select";

export type CommonSelectOption = {
  label: ReactNode;
  value: string;
  [x0: string]: any;
};

export type AdditionalSelectProps = SelectComponentsConfig<any> & {
  initialMessage?: string;
  selectType?: string;
  inputValue?: string;
};

export type CommonSelectClasses = SelectComponentsConfig<any> & {
  input?: string;
  options?: string;
  root?: string;
  label?: string;
};

// TODO(nsawas): deprecate Typeahead types
export type TypeaheadProps = SelectComponentsConfig<any> & {
  initialMessage?: string;
  selectType?: string;
};

export type Suggestion = {
  label: string;
  value: string;
  [x0: string]: any;
};

export type SelectVariant = "standard" | "filled" | "outlined";
