// @flow
import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import AsyncSelect from "react-select/lib/Async";

type Props = {
	selectType: string,
	value: string,
	loadOptions: string => Array<Suggestion>,
};

const CommonTypeaheadComponent = props => {
	const { selectType, ...other } = props;
	switch (selectType) {
		case "async":
			if (!props.loadOptions) {
				throw new Error("Must provide `loadOptions` prop");
			}
			return <AsyncSelect
				cacheOptions={true}
				{...other} />;
		case "creatable":
			if (!props.suggestions) {
				throw new Error("Must provide `suggestions` prop");
			}
			return <CreatableSelect {...other} />;
		default:
			if (!props.suggestions) {
				throw new Error("Must provide `suggestions` prop");
			}
			return <Select {...other} />;
	}
};

export const CommonTypeaheadContainer = (props: Props) => {
	return (
		<div className="common-typeahead__container">
			<CommonTypeaheadComponent {...props} />
		</div>
	);
};
