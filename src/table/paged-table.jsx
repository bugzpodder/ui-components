// @flow
import React from "react";
import { CommonCard, SpinnerOverlay } from "@grail/components";
import classNames from "classnames";
import styles from "./table.module.scss";
import { TablePager } from "./components/table-pager";
import { TableComponent } from "./components/table-component";

type Props = {
	/** Provides the information you wish to display */
	data: Array<Object>,
	/** Defines the table structure. Must at least include a Cell or accessor key to identify
	 which property in data to display */
	columns: Array<PagedTableColumn>,
	/** Provides classNames to table subcomponents. Options include `root` and `rows`.
	 * `rows` can take a function to specify classes for each specific row */
	classes?: PagedTableClasses,
	/** The classname applied to the PagedTable card */
	className?: string,
	/** the key from `data` that should be used as the accessor to identify each unique row (returned by `onSelect`).
	 Defaults to the row's `index`. */
	idKey?: string | number,
	/** Provides a spinner when isLoading is true */
	isLoading?: boolean,
	/** Enables checkbox selection. Must change the state of selectedRows */
	onSelect?: (Array<any>) => any,
	/** Provides the id's for the selected rows when onSelect is used */
	selectedRows?: Array<any>,
	/** Parameters for onPageChange and onSort (see documentation for functions) */
	tableOptions?: PagedTableOptions,
	/** Title to display in card header */
	title?: string,
	/** Buttons to display in card header */
	headerActions?: Node<*>,
	/** Enables card pagination. Must change the state of tableOptions {count: number, offset: number} */
	onPageChange?: Object => any,
	/** Enables sorting. Must change the state of tableOptions {sortOptions: Array<{id: string, desc: boolean}> */
	onSort?: Object => any,
};

/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export const PagedTable = (props: Props) => {
	const {
		className,
		columns,
		data,
		headerActions = null,
		isLoading = false,
		onPageChange,
		onSelect,
		selectedRows,
		tableOptions,
		title,
	} = props;
	if (!columns || !data) {
		throw new Error("data prop or columns prop or both are not provided");
	}
	const rowCount = data.length;
	const paginationProps = {
		onPageChange,
		onSelect,
		rowCount,
		selectedRows,
		tableOptions,
	};
	return (
		<div className={styles.tableContainer}>
			<CommonCard
				title={title}
				headerActions={headerActions}
				footerActions={onPageChange ? <TablePager paginationProps={paginationProps} /> : null}
				classes={{
					root: classNames(styles.tableCard, "PagedTable", className),
					body: styles.tableContent,
					footer: onPageChange ? styles.tableFooter : "",
				}}
			>
				<TableComponent {...props} />
			</CommonCard>
			{isLoading && <SpinnerOverlay />}
		</div>
	);
};
