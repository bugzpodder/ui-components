import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../table.module.scss";

type Props = {
  data: Record<string, any>[];
};

export const TableSummary: React.FC<Props> = props => {
  const { data } = props;
  return (
    <Typography className={styles.tableSummary}>
      Showing {data.length} records
    </Typography>
  );
};
