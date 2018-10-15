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
  /** The object used to apply classes to the panel's subcomponents. Options include:
   *
   *  - root: the component's root element
   *
   *  - title: the component's title
   *
   *  - body: the component's content wrapper
   */
  classes?: CommonPanelClasses,
  /** DEPRECATED: DO NOT USE */
  className?: string,
  /** Determines the color of the panel header. Options include:
   *
   * - default: colorless,
   *
   * - primary: primary purple GRAIL color
   *
   */
  color?: string,
  /** Variant for the title. (See `Typography`'s `variant`) */
  variant?: string,
};

/** Provides a styled section with a title and body. */
export const CommonPanel = (props: Props) => {
  const {
    title, classes = {}, color = "default", children, variant = "subheading", className = "", ...panelProps
  } = props;
  return (
    <div
      className={classNames({ [styles.panel]: true }, className, classes.root)}
      {...panelProps}
    >
      <div
        className={classNames(styles.panelHeader, classes.title, { [styles.primary]: color === "primary" })}
        data-testid="panel-title"
      >
        <Typography variant={variant}>{title}</Typography>
      </div>
      <div
        className={classNames(styles.panelBody, classes.body)}
        data-testid="panel-body"
      >
        {children}
      </div>
    </div>
  );
};
