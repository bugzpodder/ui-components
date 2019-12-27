import React from "react";
import { PagedTableColumn } from "../../types/paged-table";
declare type Props = {
    data: Record<string, any>[];
    columns: PagedTableColumn<any>[];
    title: string;
};
export declare const ExportTableButton: React.FC<Props>;
export {};
