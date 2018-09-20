// @flow
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TwoColumnRow } from "./two-column-row";

type Props = {
  /** Takes an array of objects to display; Each object must contain a `label` and a `value`. */
  rows: GridRows,
  /** Takes in a number between 1-11 to determine spacing between columns */
  labelWidth?: GridSizes,
  /** defines the text alignment of the label and value columns */
  textAlign?: Array<string>,
};

/** Provides a styled component for displaying data in two grid columns. */
export const TwoColumnGrid = (props: Props) => {
  const {
    rows, labelWidth, textAlign, ...other
  } = props;
  return (
    <Grid
      container
      {...other}
    >
      {rows.map((row, index) => {
        return (
          <TwoColumnRow
            key={index}
            labelWidth={labelWidth}
            textAlign={textAlign}
            row={row}
          />
        );
      })}
    </Grid>
  );
};
