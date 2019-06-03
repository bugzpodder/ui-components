// @flow
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import React from "react";
import Select from "react-select";

type Props = {
  selectType: string,
  createMessage?: string => Node,
  defaultOptions: Array<CommonSelectOption>,
  loadOptions?: string => Promise<*>,
};

const CommonSelectTypeComponent = props => {
  const {
    createMessage, defaultOptions, selectType, ...other
  } = props;
  const { loadOptions } = other;
  if (loadOptions) {
    other.loadOptions = async (...args) => {
      try {
        return await loadOptions(...args);
      } catch (error) {
        // `react-select` silently swallows exceptions. Log exceptions to help with debugging.
        console.error(error);
        // Rethrow. Technically, `react-select` will swallow this exception...
        throw error;
      }
    };
  }
  switch (selectType) {
    case "async": {
      return (
        <AsyncSelect
          {...other}
          defaultOptions={defaultOptions}
          selectType={selectType}
        />
      );
    }
    case "creatable": {
      return (
        <CreatableSelect
          {...other}
          formatCreateLabel={createMessage}
          selectType={selectType}
        />
      );
    }
    default:
      return (
        <Select
          {...other}
          selectType={selectType}
        />
      );
  }
};

export const CommonSelectContainer = (props: Props) => {
  return (
    <div className="common-select__container">
      <CommonSelectTypeComponent {...props} />
    </div>
  );
};
