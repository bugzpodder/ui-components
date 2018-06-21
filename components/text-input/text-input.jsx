// @flow
import React, { type ElementConfig } from "react";
import TextField from "@material-ui/core/TextField";
import { ReadOnlyTextField } from "@grail/components/components";

type Props = {
	/** If true, displays a read-only input field (`ReadOnlyTextField`). */
	readOnly?: boolean,
	/** If readOnly is true, display this component rather than ReadOnlyTextField. */
	ReadOnlyComponent?: Node<*>,
	/** props for the ReadOnlyComponent */
	readOnlyComponentProps?: Object,
	/** Used for read only input field, see `ReadOnlyTextField`. */
	showEmptyValue?: boolean,
} & ElementConfig<typeof TextField>;

/** `TextInput` is a wrapper around Material UI's `TextField` which allows `readOnly` as a property. */
export const TextInput = (props: Props) => {
	const {
		error = false,
		helperText = "",
		readOnly,
		ReadOnlyComponent,
		readOnlyComponentProps = {},
		showEmptyValue = false,
		...textFieldProps
	} = props;
	if (readOnly) {
		if (ReadOnlyComponent) {
			return <ReadOnlyComponent {...readOnlyComponentProps}>{props.value}</ReadOnlyComponent>;
		}
		return <ReadOnlyTextField showEmptyValue={showEmptyValue}>{props.value}</ReadOnlyTextField>;
	}
	return <TextField
		data-testid="text-field"
		error={error}
		helperText={helperText}
		{...textFieldProps} />;
};
