import Button, { ButtonProps } from "@material-ui/core/Button";

import React from "react";
import classNames from "classnames";
import styles from "./link-button.module.scss";

/**
 *  ExternalLinkButton opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/.
 * Similar to ExternalLink but it is represented in a button.
 */
export const ExternalLinkButton: React.FC<ButtonProps> = props => {
  const { children, className, ...buttonProps } = props;
  const button = (
    // @ts-ignore property target does not exist.
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
  );
  return <div className={styles.button}>{button}</div>;
};
