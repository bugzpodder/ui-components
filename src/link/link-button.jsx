// @flow
import Button from "@material-ui/core/Button";
import React, { type ElementConfig, forwardRef } from "react";
import classNames from "classnames";
import styles from "./link-button.module.scss";
import { Link } from "react-router-dom";

type LinkProps = {
  href: string,
  linkProps?: ElementConfig<typeof Link>,
};

type Props = LinkProps & ElementConfig<typeof Button>;

export const LinkButton = forwardRef<Props, ElementConfig<typeof Button>>((props: Props, ref) => {
  const { href, linkProps = {}, ...otherProps } = props;
  const { className = "" } = linkProps;
  return (
    <Link
      to={href}
      className={classNames(className, styles.link)}
      data-testid="link"
      {...linkProps}
    >
      <Button
        data-testid="button"
        ref={ref}
        {...otherProps}
      />
    </Link>
  );
});
