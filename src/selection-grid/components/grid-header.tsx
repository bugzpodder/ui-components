import React, { ReactNode } from "react";

import classNames from "classnames";
import styles from "../selection-grid.module.scss";
import { SelectionGridClasses } from "../../types/selection-grid";

type Props = {
  children?: ReactNode;
  classes?: SelectionGridClasses;
};

export const GridHeader: React.FC<Props> = props => {
  const { children, classes = {} } = props;
  return (
    <div
      data-testid="selection-grid-header"
      className={classNames(styles.header, classes.header)}
    >
      {children}
    </div>
  );
};
