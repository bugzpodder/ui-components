/// <reference types="react" />
import { InternalPagedTableColumn, SelectionProps } from "../../types/paged-table";
declare type Props = {
    columns: InternalPagedTableColumn[];
    instance: Record<string, any>;
    rowId: string | number;
    shadeOnHover: boolean;
    rowIndex: number;
    className?: string | Function;
    selectionProps: SelectionProps;
    hasColumnVisibilityChooser: boolean;
    adjustWithSelectableTable: boolean;
};
export declare const PagedTableRow: (props: Props) => JSX.Element;
export {};
