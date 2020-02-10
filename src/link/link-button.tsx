import Button, { ButtonProps } from "@material-ui/core/Button";
import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./link-button.module.scss";
import { IconButton } from "@material-ui/core";
import { Link, LinkProps } from "react-router-dom";

type Props = {
  /** URL to link to. */
  href: string;
  /** Props to apply to the `Link` component. */
  linkProps?: Partial<LinkProps>;
  /** If true, uses `IconButton` component instead of `Button`. */
  isIconButton?: boolean;
} & ButtonProps;

export const LinkButton = forwardRef<any, Props>((props, ref) => {
  const { href, linkProps, isIconButton = false, ...otherProps } = props;
  const { className = "" } = linkProps || {};
  const ButtonComponent: React.ComponentType<ButtonProps> = isIconButton
    ? IconButton
    : Button;
  return (
    <Link
      to={href}
      className={classNames(className, styles.link)}
      data-testid="link"
      {...linkProps}
    >
      <ButtonComponent data-testid="button" ref={ref} {...otherProps} />
    </Link>
  );
});
