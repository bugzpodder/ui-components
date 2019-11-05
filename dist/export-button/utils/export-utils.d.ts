import { ExportableColumn, ReportOptions } from "../../types/global";
export declare const generateReport: (fileName: string, columns: ExportableColumn[], data: {
    [x: string]: any;
}[], options?: ReportOptions) => void;
