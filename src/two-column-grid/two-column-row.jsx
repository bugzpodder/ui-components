// @flow
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "./two-column-row.module.scss";

type Props = {
	labelWidth?: GridSizes,
	row: GridRow,
};

export const TwoColumnRow = (props: Props) => {
	const { row, labelWidth = 2 } = props;

	// $FlowFixMe
	const inputWidth: GridSizes = 12 - labelWidth;

	const { label, value } = row;
	return (
		<Grid
			container
			justify="space-between"
			alignItems="center"
			spacing={40}
			className={styles.gridItem}>
			<Grid
				item
				data-testid="two-column-row-label"
				className={styles.labelColumn}
				xs={labelWidth}>
				{typeof label === "string" ? (
					<Typography className={styles.rowLabel}>{label}</Typography>
				) : (
					<div className={styles.rowLabel}>{label}</div>
				)}
			</Grid>
			<Grid
				item
				data-testid="two-column-row-value"
				className={styles.valueColumn}
				xs={inputWidth}>
				{value}
			</Grid>
		</Grid>
	);
};
