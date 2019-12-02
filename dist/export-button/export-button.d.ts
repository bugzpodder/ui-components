import React from "react";
import { ExportableColumn } from "@grailbio/lib";
import { PagedTableColumn } from "../types/paged-table";
declare type Props = {
    columns: Array<ExportableColumn | PagedTableColumn<any>>;
    visibleRows?: Array<{
        [x: string]: any;
    }>;
    selectedRows?: Array<{
        [x: string]: any;
    }>;
    fetchBulkExportRows?: () => Promise<Array<{
        [x: string]: any;
    }>>;
    filenamePrefix?: string;
    buttonProps?: {
        [x: string]: any;
    };
    className?: string;
};
export declare const ExportButton: React.FC<Props>;
export {};
