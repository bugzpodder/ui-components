import { ExportableColumn, ReportOptions } from "@grailbio/lib";
export declare const generateReport: (fileName: string, columns: ExportableColumn<any>[], data: {
    [x: string]: any;
}[], options?: ReportOptions) => void;
