// @flow
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./two-column-row.module.scss";

type Props = {
  row: GridRow,
  textAlign?: Array<string>,
  labelWidth?: GridSizes,
};

export const TwoColumnRow = (props: Props) => {
  const { row, labelWidth = 2, textAlign = [] } = props;

  // $FlowFixMe
  const inputWidth: GridSizes = 12 - labelWidth;
  const labelTextAlign = textAlign[0] || "right";
  const valueTextAlign = textAlign[1] || "left";

  const { label, value } = row;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      spacing={40}
      className={styles.gridItem}
    >
      <Grid
        item
        data-testid="two-column-row-label"
        className={styles.labelColumn}
        xs={labelWidth}
      >
        {typeof label === "string" ? (
          <Typography
            style={{ textAlign: labelTextAlign }}
            className={styles.rowLabel}
          >
            {label}
          </Typography>
        ) : (
          <div
            style={{ textAlign: labelTextAlign }}
            className={styles.rowLabel}
          >
            {label}
          </div>
        )}
      </Grid>
      <Grid
        item
        data-testid="two-column-row-value"
        className={styles.valueColumn}
        xs={inputWidth}
      >
        <div style={{ textAlign: valueTextAlign }}>{value}</div>
      </Grid>
    </Grid>
  );
};
