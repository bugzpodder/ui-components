// @flow
import AsyncSelect from "react-select/lib/Async";
import CreatableSelect from "react-select/lib/Creatable";
import React from "react";
import Select from "react-select";

type Props = {
  selectType: string,
  value: string,
  suggestions?: Array<Suggestion>,
  /**
   * The function used to retrieve suggestions asynchronously based on the user's input.
   *
   * Each object must at least include a `label` and `value` key
   */
  updateSuggestions?: string => Promise<*>,
};

const CommonTypeaheadComponent = props => {
  const { selectType, suggestions = [], ...other } = props;
  switch (selectType) {
    case "async": {
      if (!props.updateSuggestions) {
        throw new Error("Must provide `updateSuggestions` prop");
      }

      return (
        <AsyncSelect
          loadOptions={props.updateSuggestions}
          defaultOptions={suggestions}
          selectType={selectType}
          {...other}
        />
      );
    }
    case "creatable":
      if (!suggestions) {
        throw new Error("Must provide `suggestions` prop");
      }
      return (
        <CreatableSelect
          options={suggestions}
          selectType={selectType}
          {...other}
        />
      );
    default:
      if (!suggestions) {
        throw new Error("Must provide `suggestions` prop");
      }
      return (
        <Select
          options={suggestions}
          selectType={selectType}
          {...other}
        />
      );
  }
};

export const CommonTypeaheadContainer = (props: Props) => {
  return (
    <div className="common-typeahead__container">
      <CommonTypeaheadComponent {...props} />
    </div>
  );
};
