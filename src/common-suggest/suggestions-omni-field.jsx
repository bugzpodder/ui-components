// @flow
import React, { useEffect } from "react";
import { CommonSuggest } from "./common-suggest";

type Props = {
  suggestions: Array<string>,
  loadSuggestions: () => void,
} & SearchFieldProps;

export const SuggestionsOmniField = (props: Props) => {
  const {
    searchValue, searchKey, onChange, onSearch, loadSuggestions,
  } = props;
  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);
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
