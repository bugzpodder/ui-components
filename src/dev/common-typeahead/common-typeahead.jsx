// @flow
import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import {
	CommonTypeaheadContainer,
	DropdownIndicator,
	ClearIndicator,
	MultiValueContainer,
	MultiValueRemove,
	NoOptionsMessage,
	Option,
} from "./components";
import "./common-typeahead.scss";

type Props = {
	/** The function used to retrieve the values set by the typeahead */
	onChange: (Object | Array<Suggestion>) => any,
	/**
	 * Tells the typeahead which suggestion(s) to use as its default value.
	 * String(s) should match `value` of an object in a suggestion, or in the array of suggestions
	 */
	defaultValue?: string | Array<string>,
	/** Renders the input at its full width */
	fullWidth?: boolean,
	/** Text displayed directly under the input */
	helperText?: string,
	/** Disables the typeahead from being used */
	isDisabled?: boolean,
	/** Allows for the selection of multiple values */
	isMulti?: boolean,
	/**
	 * The function used to retrieve suggestions asynchronously based on the user's input.
	 *
	 * Each object must at least include a `label` and `value` key
	 */
	loadOptions?: (string, Function) => Array<Suggestion>,
	/** The text displayed in the input before the user begins typing */
	placeholder?: string,
	/**
	 * default (`simple`): synchronous - user is forced to choose an option from the suggestions (requires `suggestions` prop).
	 *
	 * `creatable`: allows user to create new entries that are not in the suggestions list (requires `suggestions` prop).
	 *
	 * `async`: allows for asynchronous retrieval of suggestions based on the user's input (requires `loadOptions` prop).
	 */
	selectType?: "simple" | "async" | "creatable",
	/** Displays the input in an error state */
	showError?: boolean,
	/**
	 * The data objects used as suggestions for synchronous typeaheads.
	 *
	 * Each object must at least include a `label` and `value` key.
	 */
	suggestions?: Array<Suggestion>,
};

export const CommonTypeahead = (props: Props) => {
	const {
		onChange,
		suggestions = [],
		fullWidth = false,
		helperText = "",
		placeholder = "",
		isDisabled = false,
		isMulti = false,
		showError = false,
		defaultValue = "",
	} = props;
	const defaultValueSelections = isMulti
		? suggestions.filter(suggestion => defaultValue.includes(suggestion.value))
		: suggestions.find(suggestion => suggestion.value === defaultValue);
	return (
		<div className="common-typeahead__root">
			<FormControl fullWidth={fullWidth}>
				<Input
					inputComponent={CommonTypeaheadContainer}
					disabled={isDisabled}
					error={!isDisabled && showError}
					inputProps={{
						...props,
						classNamePrefix: "common-typeahead",
						isClearable: true,
						onChange: value => {
							if (!isMulti && !value) {
								onChange({});
								return;
							}
							onChange(value);
						},
						components: {
							Option,
							DropdownIndicator,
							IndicatorSeparator: null,
							ClearIndicator,
							NoOptionsMessage,
							MultiValueContainer,
							MultiValueRemove,
						},
						options: suggestions,
						defaultValue: defaultValueSelections,
						placeholder,
					}}
					classes={{
						root: "common-typeahead__input-root",
					}}
				/>
				{helperText && (
					<FormHelperText
						error={showError}
						className="common-typeahead__helpertext">
						{helperText}
					</FormHelperText>
				)}
			</FormControl>
		</div>
	);
};
