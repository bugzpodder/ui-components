import Grid from "@material-ui/core/Grid";

import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./two-column-row.module.scss";
import { GridRow } from "../types/grid";
import { TextAlignProperty } from "csstype";

type Props = {
  row: GridRow;
  rowIndex: number;
  textAlign?: TextAlignProperty[];
  labelWidth?: number;
};

export const TwoColumnRow: React.FC<Props> = props => {
  const { row, labelWidth = 2, textAlign = [], rowIndex } = props;

  const inputWidth: number = 12 - labelWidth;
  const labelTextAlign = textAlign[0] || "right";
  const valueTextAlign = textAlign[1] || "left";

  const { label, value, isHeader = false, classes = {} } = row;
  const testIdPrefix =
    typeof label === "string"
      ? label
          .toLowerCase()
          .replace(/[^A-Za-z0-9_ ]/, "")
          .split(" ")
          .join("-")
      : `row-${isHeader ? "header" : rowIndex}`;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      spacing={10}
      className={classNames(styles.gridItem, classes.row)}
    >
      <Grid
        item
        data-testid="two-column-row-label"
        className={classNames(
          styles.column,
          styles.labelColumn,
          classes.labelColumn,
        )}
        // @ts-ignore: no overload matches this call.
        xs={labelWidth}
      >
        {typeof label === "string" ? (
          <Typography
            data-testid={`${testIdPrefix}-label`}
            style={{ textAlign: labelTextAlign }}
            className={classNames(styles.rowLabel, classes.label, {
              [styles.header]: isHeader,
            })}
          >
            {label}
          </Typography>
        ) : (
          <div
            data-testid={`${testIdPrefix}-label`}
            style={{ textAlign: labelTextAlign }}
            className={classNames(styles.rowLabel, classes.label, {
              [styles.header]: isHeader,
            })}
          >
            {label}
          </div>
        )}
      </Grid>
      <Grid
        item
        data-testid="two-column-row-value"
        className={classNames(styles.column, classes.valueColumn)}
        // @ts-ignore: no overload matches this call.
        xs={inputWidth}
      >
        <div
          data-testid={`${testIdPrefix}-value`}
          style={{ textAlign: valueTextAlign }}
          className={classNames(classes.value, { [styles.header]: isHeader })}
        >
          {value}
        </div>
      </Grid>
    </Grid>
  );
};
