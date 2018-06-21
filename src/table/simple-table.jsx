// @flow
import React from "react";
import { SpinnerOverlay } from "@grail/components";
import styles from "./table.module.scss";
import { TableComponent } from "./components/table-component";

type Props = {
	/** Provides the information you wish to display **/
	data: Array<Object>,
	/** Defines the table structure. Must at least include a Cell or accessor key to identify
	 which property in data to display **/
	columns: Array<PagedTableColumn>,
	/** the key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
	 Defaults to the row's `index`. **/
	idKey?: string | number,
	/** Table className. Can also be applied in classNames via `root` **/
	className?: string,
	/** Provides classNames to table subcomponents. Options include `root` and `rows`.
	 * `rows` can take a function to specify classes for each specific row */
	classes?: PagedTableClasses,
	/** Provides a spinner when isLoading is true **/
	isLoading?: boolean,
	/** Enables checkbox selection. Must change the state of selectedRows **/
	onSelect?: (Array<any>) => any,
	/** Provides the id's for the selected rows when onSelect is used **/
	selectedRows?: Array<any>,
	/** Parameters for onSort (see documentation for function) **/
	tableOptions?: PagedTableOptions,
	/** Enables sorting. Must change the state of tableOptions {sortOptions: Array<{id: string, desc: boolean}> **/
	onSort?: Object => any,
};

/** Provides a simple table for displaying data, with the ability to opt into additional features. **/
export const SimpleTable = (props: Props) => {
	const { columns, data, isLoading = false } = props;
	if (!columns || !data) {
		throw new Error("data prop or columns prop or both are not provided");
	}
	return (
		<div className={styles.tableContainer}>
			<TableComponent {...props} />
			{isLoading && <SpinnerOverlay />}
		</div>
	);
};
