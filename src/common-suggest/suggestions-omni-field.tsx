import React, { useEffect } from "react";
import { CommonSuggest } from "./common-suggest";
import { SearchFieldProps } from "@grailbio/lib";

type Props = {
  suggestions: string[];
  loadSuggestions: () => void;
} & SearchFieldProps;

export const SuggestionsOmniField = (props: Props) => {
  const {
    searchValue,
    searchKey,
    onChange,
    onSearch,
    loadSuggestions,
    placeholder,
    suggestions,
  } = props;
  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);
  return (
    <CommonSuggest
      suggestions={suggestions.map((suggestion) => `"${suggestion}"`)}
      renderOption={(option: string) => (
        <>{option.substr(1, option.length - 2)}</>
      )}
      placeholder={placeholder}
      id={searchKey}
      value={searchValue || ""}
      onChange={(selected) => onChange(searchKey, selected)}
      onEnter={onSearch}
    />
  );
};
