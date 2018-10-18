// @flow
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
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

  const { label, value, classes = {} } = row;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      spacing={40}
      className={classNames(styles.gridItem, classes.row)}
    >
      <Grid
        item
        data-testid="two-column-row-label"
        className={classNames(styles.labelColumn, classes.labelColumn)}
        xs={labelWidth}
      >
        {typeof label === "string" ? (
          <Typography
            style={{ textAlign: labelTextAlign }}
            className={classNames(styles.rowLabel, classes.label)}
          >
            {label}
          </Typography>
        ) : (
          <div
            style={{ textAlign: labelTextAlign }}
            className={classNames(styles.rowLabel, classes.label)}
          >
            {label}
          </div>
        )}
      </Grid>
      <Grid
        item
        data-testid="two-column-row-value"
        className={classNames(styles.valueColumn, classes.valueColumn)}
        xs={inputWidth}
      >
        <div
          style={{ textAlign: valueTextAlign }}
          className={classes.value}
        >
          {value}
        </div>
      </Grid>
    </Grid>
  );
};
