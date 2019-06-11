// @flow
import React from "react";
import { ExportButton } from "../../export-button";

type Props = {
  data: Array<Object>,
  columns: Array<PagedTableColumn>,
  title: string,
};

// NOTE: ExportTableButton is deprecated. Use ExportButton instead.
export const ExportTableButton = (props: Props) => {
  console.warn("ExportTableButton is deprecated. Use ExportButton instead.");
  const { columns, data, title = "file" } = props;

  const filenamePrefix = title
    .toString()
    .toLowerCase()
    .split(" ")
    .join("-");
  return (
    <ExportButton
      columns={columns}
      visibleRows={data}
      filenamePrefix={filenamePrefix}
    />
  );
};
