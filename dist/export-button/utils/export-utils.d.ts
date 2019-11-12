import { ExportableColumn, ReportOptions } from "@grailbio/lib";
export declare const generateReport: (fileName: string, columns: ExportableColumn[], data: {
    [x: string]: any;
}[], options?: ReportOptions) => void;
