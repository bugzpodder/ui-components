// @flow
import { saveAs } from "file-saver";
import { toDelimitedReport } from "@grail/lib";

export const generateReport = (
  fileName: string,
  columns: Array<ReportColumn>,
  data: Array<Object>,
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
