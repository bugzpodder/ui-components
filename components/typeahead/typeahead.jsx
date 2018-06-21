// @flow
import React from "react";
import Autosuggest from "react-autosuggest";
import TextField from "@material-ui/core/TextField";
import { suggestionComponent } from "./components/suggestion-component";
import { suggestionsContainer } from "./components/suggestions-container";
import styles from "./typeahead.module.scss";

type State = {
	value: string,
	suggestions: Array<string>,
};

type Props = {
	disabled: boolean,
	error: boolean,
	/** When `false`, accepts an input that is not on the suggestion list. */
	forceSelection: boolean,
	helperText: string,
	/** Text to display in the input field when empty. */
	placeholder: string,
	/**
	 * When `true`, the input will display the list of suggestions before a user starts typing.
	 * Dropdown becomes scrollable for long lists.
	 * Defaults to `false`, displaying relevant suggestions upon typing.
	 */
	renderOnFocus: boolean,
	/**
	 * Sync Component.
	 * Takes an array of values that will be used as the list of possible suggestions for the input field.
	 */
	suggestions?: Array<string>,
	/**
	 *  Async Component. Should make a call that returns an array of strings.
	 * Suggestions will be rendered upon typing and will include any results that have the typed character(s).
	 */
	fetchSuggestions?: string => Promise<Array<string>>,
	className?: string,
	onChange?: string => any,
};

type Value = {
	newValue: string,
};

const NO_RESULTS = "No results found...";

/** Provides an input component that displays value suggestions. */
export class CommonTypeahead extends React.Component<Props, State> {
	state: State = {
		suggestions: [],
		value: "",
	};

	static defaultProps: Props = {
		disabled: false,
		error: false,
		forceSelection: true,
		helperText: "",
		placeholder: "",
		renderOnFocus: true,
		suggestions: [],
		onChange: () => {},
	};

	renderInput = (inputProps: Object) => {
		const { ref, ...other } = inputProps;
		const { disabled, error, helperText } = this.props;
		let { className } = inputProps;
		className = className ? `${className}-typeahead` : "typeahead";
		return (
			<TextField
				required
				disabled={disabled}
				error={error}
				helperText={helperText}
				InputProps={{
					inputRef: ref,
					classes: {
						input: className,
					},
					...other,
				}}
			/>
		);
	};

	fetchSuggestions = (value: string) => {
		const { suggestions } = this.props;
		const inputValue = value.trim().toLowerCase();
		const filteredSuggestions =
			inputValue.length === 0
				? suggestions
				: suggestions && suggestions.filter(suggestion => suggestion.toLowerCase().includes(inputValue));
		return Promise.resolve(filteredSuggestions);
	};

	getSuggestionValue = (suggestion: string) => {
		const { onChange } = this.props;
		const value = suggestion === NO_RESULTS ? "" : suggestion;
		onChange && onChange(value);
		return value;
	};

	onSuggestionsFetchRequested = async ({ value }: State) => {
		const { fetchSuggestions = this.fetchSuggestions } = this.props;
		const suggestions = await fetchSuggestions(value);
		this.setState({ suggestions });
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	handleChange = (event: Object, { newValue }: Value) => {
		const { onChange } = this.props;
		this.setState({ value: newValue });
		onChange && onChange(newValue);
	};

	shouldRenderSuggestions = (val: string) => {
		return this.props.renderOnFocus ? true : val.trim().length > 0;
	};

	render() {
		const { className = "", forceSelection, onChange, placeholder } = this.props;
		const { suggestions } = this.state;
		const noResults = forceSelection ? [NO_RESULTS] : [];
		const suggestionList = suggestions.length ? suggestions : noResults;
		return (
			<Autosuggest
				theme={{
					container: styles.container,
					suggestionsContainerOpen: styles.suggestionsContainerOpen,
					suggestionsList: styles.suggestionsList,
					suggestion: styles.suggestion,
				}}
				focusInputOnSuggestionClick={false}
				renderInputComponent={this.renderInput}
				suggestions={suggestionList}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				renderSuggestionsContainer={suggestionsContainer}
				shouldRenderSuggestions={this.shouldRenderSuggestions}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={suggestionComponent}
				inputProps={{
					placeholder: placeholder,
					value: this.state.value,
					className: className,
					onChange: this.handleChange,
					onBlur: () => {
						if (suggestionList[0] === NO_RESULTS) {
							this.setState({ value: "" });
							onChange && onChange("");
						}
					},
					onKeyDown: event => {
						// FIXME(nsawas): Temporary until selectOnTab feature.
						// https://github.com/moroshko/react-autosuggest/pull/505
						const keyIsEnter = event.key === "Enter";
						const keyIsTab = event.key === "Tab";
						const { suggestions, value } = this.state;
						if (keyIsEnter || keyIsTab) {
							if (forceSelection) {
								if (!suggestions.length) {
									this.setState({ value: "" });
									onChange && onChange("");
									return;
								}
							}
						}
						if (keyIsTab) {
							if (value !== "" && suggestions.length > 0) {
								if (suggestions.includes(value)) {
									return;
								}
								this.setState({ value: this.state.suggestions[0] });
								onChange && onChange(this.state.suggestions[0]);
							}
						}
					},
				}}
			/>
		);
	}
}
