/// <reference types="react" />
import { InternalPagedTableColumn, SortingProps } from "../../types/paged-table";
declare type Props = {
    columns: InternalPagedTableColumn[];
    sortingProps: SortingProps;
    enableSelectAll: boolean;
    wrapHeader: boolean;
    hasColumnVisibilityChooser: boolean;
    columnVisibility: {
        [x: number]: boolean;
    };
    setColumnVisibility: (x0: {
        [x: number]: boolean;
    }) => any;
    adjustWithSelectableTable: boolean;
};
export declare const TableHeader: (props: Props) => JSX.Element;
export {};
