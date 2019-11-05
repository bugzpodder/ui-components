/// <reference types="react" />
import { PagedTableCell, SelectionProps } from "../../types/paged-table";
export declare const getCheckboxColumn: (selectionProps: SelectionProps) => {
    accessor: string;
    Header: JSX.Element;
    Cell: ({ rowId }: PagedTableCell) => JSX.Element;
    isVisible: boolean;
    index: number;
};
