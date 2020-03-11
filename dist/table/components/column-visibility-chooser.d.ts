/// <reference types="react" />
import { InternalPagedTableColumn } from "../../types/paged-table";
declare type Props = {
    columns: InternalPagedTableColumn[];
    columnVisibility: {
        [x: number]: boolean;
    };
    setColumnVisibility: (x0: {
        [x: number]: boolean;
    }) => any;
};
export declare const ColumnVisibilityChooser: (props: Props) => JSX.Element;
export {};
