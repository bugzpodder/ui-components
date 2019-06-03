// @flow
// FIXME(jrosenfield): should not replicate GridSizes internal to materialui here
declare type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

declare type GridRow = {
  label: React$Node,
  value: React$Node,
  classes?: {
    row?: string,
    labelColumn?: string,
    valueColumn?: string,
    label?: string,
    value?: string,
  },
  [string]: any,
};

declare type GridRows = Array<GridRow>;
