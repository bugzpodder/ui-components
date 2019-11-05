import { ExportableColumn, ReportOptions } from "../../types/global";
import { saveAs } from "file-saver";
import { toDelimitedReport } from "@grailbio/lib";

export const generateReport = (
  fileName: string,
  columns: ExportableColumn[],
  data: Array<{
    [x: string]: any;
  }>,
  options: ReportOptions = {},
) => {
  const output = toDelimitedReport(columns, data, options);
  const { fileMimeType = "text/csv" } = options;
  const blob = new Blob([output], { type: `${fileMimeType};charset=utf-8;` });
  try {
    saveAs(blob, fileName, true);
  } catch (error) {
    console.error("error saving blob", error);
  }
};
