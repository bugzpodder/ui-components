//@flow
import React, { type ElementConfig } from "react";
import { DatePicker } from "material-ui-pickers";
import { DATE_FORMAT } from "@grail/lib";
import { ReadOnlyTextField } from "@grail/components";
import moment from "moment";
import styles from "./date-input.module.scss";

type Props = {
	/** When `true`, displays a read only input field using `ReadOnlyTextField` */
	readOnly?: boolean,
	/** Used for read only input field, see ReadOnlyTextField. */
	showEmptyValue?: boolean,
	/** Determines value used for the input. Takes a `moment` object */
	input?: string,
	/** Remains above the input field upon choosing a value */
	label?: string,
} & ElementConfig<typeof DatePicker>;

/** Provides component for common Date picker. */
export const DateInput = (props: Props) => {
	const { readOnly, showEmptyValue = false, value } = props;
	if (readOnly) {
		return (
			<ReadOnlyTextField showEmptyValue={showEmptyValue}>
				{props.value ? moment(props.value).format(DATE_FORMAT) : ""}
			</ReadOnlyTextField>
		);
	}
	return (
		<div className={styles.datePicker}>
			<DatePicker
				format={DATE_FORMAT}
				keyboard={true}
				clearable={true}
				InputAdornmentProps={{ className: styles.adornmentWidth }}
				{...props}
				value={value || null}
			/>
		</div>
	);
};
