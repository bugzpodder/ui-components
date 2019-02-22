// @flow
import React from "react";
import { CommonSuggest } from "./common-suggest";

type Props = {
  suggestions: Array<string>,
} & SearchFieldProps;

export const SuggestionsOmniField = (props: Props) => {
  const {
    searchValue, searchKey, onChange, onSearch,
  } = props;
  return (
    <CommonSuggest
      {...props}
      id={searchKey}
      value={searchValue || ""}
      onChange={selected => onChange(searchKey, selected)}
      onEnter={onSearch}
    />
  );
};
