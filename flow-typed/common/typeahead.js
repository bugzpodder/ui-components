// Suggestion object must include the following keys, but may also include others.
declare type Suggestion = {
  label: string,
  value: string | number,
  [string]: any,
}

declare type TypeaheadProps = {
  initialMessage?: string,
  selectType?: string,
} & SelectProps;