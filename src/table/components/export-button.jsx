// @flow
import Button from "@material-ui/core/Button";
import React from "react";
import { generateReport } from "../utilities/export-utils";

type Props = {
  /** Provides the information you wish to export */
  data: Array<Object>,
  /**
   * The table columns.
   *
   * Must include accessor key to identify which property in data to display
   */
  columns: Array<PagedTableColumn>,
  /** filename prefix */
  title: string,
};

/** Provides a simple table for displaying data, with the ability to opt into additional features. */
export const ExportTableButton = (props: Props) => {
  const { columns, data, title } = props;
  const reportColumns = columns.map(({ accessor, exportHeaderName }) => ({ accessor, exportHeaderName }));
  return <Button onClick={() => generateReport(`${title}.csv`, reportColumns, data)}>Export to CSV</Button>;
};
