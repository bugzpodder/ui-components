//@flow
import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import styles from "../table.module.scss";

type Props = {
	paginationProps: PaginationProps,
};

export const TablePager = (props: Props) => {
	const { onPageChange, onSelect, rowCount, tableOptions } = props.paginationProps;
	if (!tableOptions) {
		throw new Error("tableOptions prop with count and offset must be included for pagination");
	}
	const { offset, count } = tableOptions;
	// const invalidPaginationParameters = typeof count !== "number" || typeof offset !== "number";
	const invalidPaginationParameters = count === null || count === undefined || offset === null || offset === undefined;
	if (invalidPaginationParameters) {
		throw new Error("count or offset or both are either not valid or non existent");
	}

	const page = Math.floor(offset / count) || 0;
	const startingCount = Math.max(rowCount - count, count * page);
	const fillsPage = rowCount >= count;
	const totalCount = startingCount + rowCount + (fillsPage ? 1 : 0);

	const onChangePage = (event: ?InputEvent, page: number) => {
		const newOffset = page * count;
		setPage({ offset: newOffset, count });
	};

	const onChangeRowsPerPage = (event: InputEvent) => {
		// $FlowFixMe(jsingh) `event.target.value` is correct, but
		// $FlowFixMe Cannot get event.target.value because property value is missing in EventTarget
		return setPage({ offset, count: Math.max(1, Number(event.target.value)) });
	};

	const setPage = ({ offset, count }: { offset: number, count: number }) => {
		onSelect && onSelect([]);
		onPageChange && onPageChange({ offset, count: count || 10 });
	};

	return (
		<TablePagination
			component="div"
			className={`table-pager ${styles.tablePager}`}
			count={totalCount}
			labelDisplayedRows={({ from, to }) => `Showing ${from} to ${to}`}
			rowsPerPage={count}
			page={page}
			onChangePage={onChangePage}
			onChangeRowsPerPage={onChangeRowsPerPage}
			rowsPerPageOptions={[5, 10, 25, 50]}
			backIconButtonProps={{ className: "previous-page" }}
			nextIconButtonProps={{ className: "next-page" }}
			SelectProps={{ id: "rows-per-page", className: "select-row-count" }}
		/>
	);
};

// TODO(jsingh/nsawas) - need a better way to enable/disable pagination. Don't know length of results.
// total count is faked, since *usually* we pass in `data` representing a single page
// need to give a longer number to enable pagination
// checking % count only works if data represents a window (extra keys may be present but not visible)
