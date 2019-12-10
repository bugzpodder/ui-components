import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import React, { MouseEvent } from "react";
import styles from "./util.module.scss";

export type CommonDialogAction = {
  name: string;
  callback: (event: MouseEvent<HTMLInputElement>) => void;
  icon?: string;
  id?: string;
  isEnabled?: boolean;
  variant?:
    | "text"
    | "flat"
    | "outlined"
    | "contained"
    | "raised"
    | "fab"
    | "extendedFab";
  color?: "default" | "inherit" | "primary" | "secondary";
  isLeftButton?: boolean;
  "data-testid"?: string;
};

export const actionToButton = (action: CommonDialogAction) => {
  const {
    id,
    icon,
    color,
    isEnabled = true,
    name,
    callback,
    isLeftButton,
    variant,
    ...buttonProps
  } = action;
  return (
    // @ts-ignore no overload matches the call.
    <Button
      key={name}
      id={id || name.toLowerCase().replace(" ", "-")}
      data-testid={id}
      data-id={id}
      data-is-enabled={isEnabled}
      data-is-left-button={isLeftButton}
      color={color || "primary"}
      onClick={callback}
      disabled={!isEnabled}
      // @ts-ignore text is not assignable to type.
      variant={isEnabled ? variant : "text"}
      {...buttonProps}
    >
      {icon && <Icon className={styles.icon}>{icon}</Icon>}
      {name}
    </Button>
  );
};
