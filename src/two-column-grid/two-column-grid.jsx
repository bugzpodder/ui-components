// @flow
import Grid from "@material-ui/core/Grid";
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { TwoColumnRow } from "./two-column-row";

type Props = {
  /** Takes an array of objects to display; Each object must contain a `label` and a `value`. It may optionally contain
   *  a `classes` object, which provides classNames to the card and its sub-components. Options include:
   *
   *  - `row` (applied to the container for the entire row)
   *
   *  - `labelColumn` (applied to the container for the label cell)
   *
   *  - `valueColumn` (applied to the container for the value cell)
   *
   *  - `label` (applied directly to the label element)
   *
   *  - `value` (applied directly the the value element's wrapper)
   */
  rows: GridRows,
  /** If provided, displays bold, black-colored header text above the label and value columns */
  header?: GridRow,
  /** Takes in a number between 1-11 to determine spacing between columns */
  labelWidth?: GridSizes,
  /** Defines the text alignment of the label and value columns */
  textAlign?: Array<string>,
};

/** Provides a styled component for displaying data in two grid columns. */
export const TwoColumnGrid = (props: Props) => {
  const {
    rows, labelWidth, textAlign, header, ...other
  } = props;
  const gridRows = cloneDeep(rows);
  if (header) {
    gridRows.unshift({ ...header, isHeader: true });
  }
  return (
    <Grid
      container
      {...other}
    >
      {gridRows.map((row, index) => {
        return (
          <TwoColumnRow
            key={index}
            rowIndex={index}
            labelWidth={labelWidth}
            textAlign={textAlign}
            row={row}
          />
        );
      })}
    </Grid>
  );
};
