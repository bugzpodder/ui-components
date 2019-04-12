// @flow
import React from "react";
import classNames from "classnames";
import styles from "../selection-grid.module.scss";

type Props = {
  children?: Node,
  classes?: SelectionGridClasses,
};

export const GridHeader = (props: Props) => {
  const { children, classes = {} } = props;
  return <div className={classNames(styles.header, classes.header)}>{children}</div>;
};
