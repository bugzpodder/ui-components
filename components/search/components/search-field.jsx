// @flow
import React from "react";
import moment from "moment";
import { DATETIME_SEARCH_TYPE } from "@grail/lib/utils";
import { DATE_FORMAT } from "@grail/lib/constants";
import { DateInput } from "@grail/components/components";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import styles from "../omni.module.scss";

export const SearchField = (props: SearchFieldProps) => {
	const { searchKey, placeholder, searchType, searchValue, onChange, ...otherProps } = props;
	const onChangeComponent = (event: InputEvent) => {
		const {
			currentTarget: { id, value: text },
		} = event;
		onChange(id, text);
	};
	if (searchType !== DATETIME_SEARCH_TYPE) {
		return (
			<TextField
				id={searchKey}
				{...otherProps}
				className={styles.textField}
				value={String(searchValue)}
				placeholder={placeholder}
				onChange={onChangeComponent}
			/>
		);
	}

	const [startDate = "", endDate = ""] = Array.isArray(searchValue) ? searchValue : [];
	// startDate & endDate can technically be booleans or numbers.
	if (typeof startDate !== "string" || typeof endDate !== "string") {
		return null;
	}
	const onDateSearch = (id: string, startDate: string, endDate: string) => {
		const dateRange = [startDate, endDate];
		onChange(id, dateRange);
	};
	const onChangeStartDate = (id, date) => {
		date = date ? moment(date).format(DATE_FORMAT) : "";
		onDateSearch(id, date, endDate);
	};
	const onChangeEndDate = (id, date) => {
		date = date ? moment(date).format(DATE_FORMAT) : "";
		onDateSearch(id, startDate, date);
	};
	return (
		<Grid className={styles.dateGrid}>
			<DateInput
				id={`${searchKey}-from`}
				className={styles.input}
				value={startDate}
				onChange={onChangeStartDate.bind(this, searchKey)}
				placeholder={"From date"}
				{...otherProps}
			/>
			<Typography className={styles.typography}>to</Typography>
			<DateInput
				id={`${searchKey}-to`}
				className={styles.dateInput}
				value={endDate}
				onChange={onChangeEndDate.bind(this, searchKey)}
				placeholder={"To date"}
				{...otherProps}
			/>
		</Grid>
	);
};
