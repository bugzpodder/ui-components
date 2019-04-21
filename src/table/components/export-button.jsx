// @flow
import Button from "@material-ui/core/Button";
import React from "react";
import { generateReport } from "../utilities/export-utils";

type Props = {
  data: Array<Object>,
  columns: Array<PagedTableColumn>,
  title: string,
};

export const ExportTableButton = (props: Props) => {
  const { columns, data, title = "file" } = props;
  const reportColumns = columns.map(({ accessor, exportHeaderName }) => ({ accessor, exportHeaderName }));
  const formattedTitle = title
    .toString()
    .toLowerCase()
    .split(" ")
    .join("-");
  return (
    <Button
      data-testid={`export${title && `-${formattedTitle}`}`}
      onClick={() => generateReport(`${title}.csv`, reportColumns, data)}
    >
      Export to CSV
    </Button>
  );
};
