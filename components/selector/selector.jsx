//@flow
import React, { type ElementConfig } from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { ReadOnlyTextField } from "@grail/components/components";

type SelectorItem = { key: string, text: string };
type SelectorData = Array<SelectorItem>;
type OptionalSelectorProps = {
	/** Id of the element */
	id?: string,
	/** Default text to display if it should be read-only and no value. */
	defaultDisplayText?: string,
	/** if `true`, displays the value or default display text as a read-only text. */
	readOnly?: boolean,
	/** Function to be called when user chooses a dropdown option */
	onSelect?: Function,
};
type SelectorProps = {
	/**
	 * Possible options for the selector.
	 * Should be an array of Objects in this format: `{ key: string, text: string }`,
	 * where `key` is the value for chosen input, and `text` is the display text for the option.
	 */
	data: SelectorData,
	/** Name of the selector. */
	name: string,
} & OptionalSelectorProps &
	ElementConfig<typeof Select>;

/** `Selector` is a wrapper around the Material UI `Select` for displaying a selector input. */
export const Selector = (props: SelectorProps) => {
	const {
		onSelect,
		name,
		data,
		value,
		id = "selector",
		defaultDisplayText = "Select",
		readOnly,
		...selectProps
	} = props;
	const menuItems = data.map(({ key, text }, index) => {
		return (
			<MenuItem
				id={`${id}-item-${key.toString().replace(/\s/g, "-")}`}
				key={index}
				value={key}>
				{text}
			</MenuItem>
		);
	});
	// Look up display text for the selected key
	const selectedDatum = data.find(datum => datum.key === value);
	const { text: displayText } = selectedDatum || {};

	if (data.length) {
		if (readOnly) {
			return <ReadOnlyTextField>{displayText || defaultDisplayText}</ReadOnlyTextField>;
		}
		return (
			<Select
				value={value}
				onChange={event => onSelect && onSelect(event.target.value)}
				displayEmpty
				input={<Input
					data-testid="selector-value"
					name={name}
					id={id} />}
				{...selectProps}
			>
				{!displayText && (
					<MenuItem
						value=""
						disabled={true}>
						{defaultDisplayText}
					</MenuItem>
				)}
				{menuItems}
			</Select>
		);
	}

	return <ReadOnlyTextField>Nothing to select</ReadOnlyTextField>;
};
