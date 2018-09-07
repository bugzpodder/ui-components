// @flow
import AsyncSelect from "react-select/lib/Async";
import CreatableSelect from "react-select/lib/Creatable";
import React from "react";
import Select from "react-select";

type Props = {
  selectType: string,
  createMessage?: string => Node,
  defaultOptions: Array<CommonSelectOption>,
};

const CommonSelectTypeComponent = props => {
  const {
    createMessage, defaultOptions, selectType, ...other
  } = props;
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
