// @flow
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import React, { type ElementConfig, forwardRef } from "react";
import classNames from "classnames";
import styles from "./link-button.module.scss";
import { Link } from "react-router-dom";

type LinkProps = {
  /** URL to link to. */
  href: string,
  /** Props to apply to the `Link` component. */
  linkProps?: ElementConfig<typeof Link>,
  /** If true, uses `IconButton` component instead of `Button`. */
  isIconButton?: boolean,
};

type Props = LinkProps & ElementConfig<typeof Button>;

export const LinkButton = forwardRef<Props, ElementConfig<typeof Button>>((props: Props, ref) => {
  const {
    href, linkProps = {}, isIconButton = false, ...otherProps
  } = props;
  const { className = "" } = linkProps;
  const ButtonComponent = isIconButton ? IconButton : Button;
  return (
    <Link
      to={href}
      className={classNames(className, styles.link)}
      data-testid="link"
      {...linkProps}
    >
      <ButtonComponent
        data-testid="button"
        ref={ref}
        {...otherProps}
      />
    </Link>
  );
});
