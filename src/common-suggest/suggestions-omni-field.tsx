import React, { useEffect } from "react";

import { CommonSuggest } from "./common-suggest";
import { SearchFieldProps } from "../types/api";

type Props = {
  suggestions: string[];
  loadSuggestions: () => void;
} & SearchFieldProps;

export const SuggestionsOmniField: React.FC<Props> = props => {
  const { searchValue, searchKey, onChange, onSearch, loadSuggestions } = props;
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
