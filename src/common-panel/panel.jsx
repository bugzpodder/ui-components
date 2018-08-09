// @flow
import React, { type Node } from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "./panel.module.scss";

type Props = {
  /** Title of the panel */
  title: string,
  /** Body of the panel */
  children: Node,
  /** classname provided to the container of the panel */
  className?: string,
  /** Variant for the title. (See `Typography`'s `variant`) */
  variant?: string,
};

/** Provides a styled section with a title and body. */
export const CommonPanel = (props: Props) => {
  const {
    title, children, variant = "subheading", className = "", ...panelProps
  } = props;
  return (
    <div
      className={classNames({ [styles.panel]: true }, className)}
      {...panelProps}
    >
      <div
        className={styles.panelHeader}
        data-testid="panel-title"
      >
        <Typography variant={variant}>{title}</Typography>
      </div>
      <div
        className={styles.panelBody}
        data-testid="panel-body"
      >
        {children}
      </div>
    </div>
  );
};
