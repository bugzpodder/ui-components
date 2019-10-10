// @flow
import Button from "@material-ui/core/Button";
import React, { type ElementConfig, type Node } from "react";
import classNames from "classnames";
import styles from "./link-button.module.scss";

type Props = {
  /** The children to display in the body of the button */
  children?: Node,
} & ElementConfig<typeof Button>;

/**
 *  ExternalLinkButton opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/.
 * Similar to ExternalLink but it is represented in a button.
 */
export const ExternalLinkButton = (props: Props) => {
  const { children, className, ...buttonProps } = props;
  return (
    <div className={styles.button}>
      <Button
        data-testid="external-link-button"
        {...buttonProps}
        role="button"
        className={classNames(className, styles.link)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Button>
    </div>
  );
};
