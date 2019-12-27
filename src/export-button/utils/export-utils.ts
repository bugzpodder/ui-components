import {
  ExportableColumn,
  ReportOptions,
  toDelimitedReport,
} from "@grailbio/lib";
import { saveAs } from "file-saver";

export const generateReport = (
  fileName: string,
  columns: ExportableColumn<any>[],
  data: Record<string, any>[],
  options: ReportOptions = {},
): void => {
  const output = toDelimitedReport(columns, data, options);
  const { fileMimeType = "text/csv" } = options;
  const blob = new Blob([output], { type: `${fileMimeType};charset=utf-8;` });
  try {
    saveAs(blob, fileName, true);
  } catch (error) {
    console.error("error saving blob", error);
  }
};
