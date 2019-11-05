import React from "react";

import { ExportButton } from "../../export-button";
import { PagedTableColumn } from "../../types/paged-table";

type Props = {
  data: Array<{
    [x: string]: any;
  }>;
  columns: PagedTableColumn[];
  title: string;
};

// NOTE: ExportTableButton is deprecated. Use ExportButton instead.
export const ExportTableButton: React.FC<Props> = props => {
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
