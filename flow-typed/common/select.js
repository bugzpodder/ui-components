// @flow
// Suggestion object must include the following keys, but may also include others.
declare type CommonSelectOption = {
  label: Node<*>,
  value: string,
  [string]: any,
};

declare type AdditionalSelectProps = {
  initialMessage?: string,
  selectType?: string,
} & SelectProps;

declare type CommonSelectClasses = {
  input?: string,
  options?: string,
  root?: string,
  label?: string,
};

// TODO(nsawas): deprecate Typeahead types
declare type TypeaheadProps = {
  initialMessage?: string,
  selectType?: string,
} & SelectProps;

declare type Suggestion = {
  label: string,
  value: string,
  [string]: any,
};

declare type SelectVariant = "standard" | "filled" | "outlined";
declare type SelectMargin = "none" | "dense" | "normal";
