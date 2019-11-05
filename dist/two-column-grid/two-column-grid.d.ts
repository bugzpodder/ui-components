import React from "react";
import { GridRow } from "../types/grid";
import { TextAlignProperty } from "csstype";
declare type Props = {
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
    rows: GridRow[];
    /** If provided, displays bold, black-colored header text above the label and value columns */
    header?: GridRow;
    /** Takes in a number between 1-11 to determine spacing between columns */
    labelWidth?: number;
    /** Defines the text alignment of the label and value columns */
    textAlign?: TextAlignProperty[];
};
/** Provides a styled component for displaying data in two grid columns. */
export declare const TwoColumnGrid: React.FC<Props>;
export {};
