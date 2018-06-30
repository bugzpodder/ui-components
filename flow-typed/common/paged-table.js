// @flow
import { type Node } from "react";

declare type Sorting = {
	id: string,
	desc: boolean,
}

declare type PagedTableCell = {
	accessor: string | Function,
	rowId: string | number,
	rowIndex: number,
	instance: Object,
	label: string,
	original: Object,
	value: any,
};

declare type PagedTableColumn = {
	Header?: Node<*>,
	accessor?: string | Function,
	sortable?: boolean,
	Cell?: PagedTableCell => Node<*>,
	headerClassName?: string,
	className?: string | Function,
};

declare type PagedTableClasses = {
	root?: string,
	rows?: string | Function,
};

declare type SelectionProps = {
	data: Array<Object>,
	idKey?: string | number,
	selectedRows?: Array<string | number>,
	onSelect?: Array<string | number> => any,
}

declare type PaginationProps = {
	rowCount: number,
	tableOptions?: PagedTableOptions,
	onPageChange?: Object => any,
	onSelect?: Array<any> => any,
}

declare type SortingProps = {
	onSort: ({ sortOptions: SortOptions }) => any,
	tableOptions: PagedTableOptions,
}
