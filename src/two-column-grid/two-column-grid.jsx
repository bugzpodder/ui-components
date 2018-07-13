// @flow
import React from "react";
import Grid from "@material-ui/core/Grid";
import { TwoColumnRow } from "./two-column-row";

type Props = {
	/** Takes an array of objects to display; Each object must contain a `label` and a `value`. */
	rows: GridRows,
	/** Takes in a number between 1-11 to determine spacing between columns */
	labelWidth?: GridSizes,
};

/** Provides a styled component for displaying data in two grid columns. */
export const TwoColumnGrid = (props: Props) => {
	const { rows, labelWidth, ...other } = props;
	return (
		<Grid
			container
			{...other}
		>
			{rows.map((row, index) => {
				return (
					<TwoColumnRow
						key={index}
						labelWidth={labelWidth}
						row={row}
					/>
				);
			})}
		</Grid>
	);
};
