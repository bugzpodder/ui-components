import React from "react";
import { PagedTableColumn } from "../../types/paged-table";
declare type Props = {
    data: Array<{
        [x: string]: any;
    }>;
    columns: PagedTableColumn<any>[];
    title: string;
};
export declare const ExportTableButton: React.FC<Props>;
export {};
