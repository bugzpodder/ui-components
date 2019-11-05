import React, { ReactNode } from "react";

import classNames from "classnames";
import styles from "../selection-grid.module.scss";
import { GridCellInfo, SelectionGridClasses } from "../../types/selection-grid";

type Props = {
  gridCellInfo: GridCellInfo;
  isEmpty: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  classes: SelectionGridClasses;
  cellRenderer: (x0: GridCellInfo) => ReactNode;
  onSelect?: (x0: GridCellInfo) => any;
};

export const GridCell: React.FC<Props> = props => {
  const {
    isSelected,
    isEmpty,
    isSelectable,
    gridCellInfo,
    classes,
    cellRenderer,
    onSelect,
  } = props;
  const cellClass =
    typeof classes.cell === "function"
      ? classes.cell(gridCellInfo)
      : classes.cell;

  return (
    <div
      data-testid={`grid-cell-${gridCellInfo.cellIndex}`}
      className={classNames(styles.cell, cellClass, {
        [styles.isSelected]: isSelectable && isSelected,
        [styles.isSelectable]: isSelectable,
        [styles.isEmpty]: isEmpty,
      })}
      onClick={
        isSelectable && onSelect ? onSelect.bind(this, gridCellInfo) : null
      }
    >
      <div
        data-testid={`selection-grid-cell-${gridCellInfo.cellIndex}`}
        className={classNames(styles.cellContent, classes.cellContent, {
          [styles.isSelected]: isSelectable && isSelected,
        })}
      >
        {cellRenderer(gridCellInfo)}
      </div>
    </div>
  );
};
