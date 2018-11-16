// @flow
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import React, { type ElementConfig } from "react";

export type CommonDialogAction = {
  name: string,
  callback: Function,
  icon?: string,
  id?: string,
  isEnabled?: boolean,
  variant?: string,
  isLeftButton?: boolean,
} & ElementConfig<typeof Button>;

export const actionToButton = (action: CommonDialogAction) => {
  const {
    id, icon, color, isEnabled = true, name, callback, isLeftButton, variant, ...buttonProps
  } = action;
  return (
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
      variant={isEnabled ? variant : "text"}
      {...buttonProps}
    >
      {icon && <Icon className="margin-right-5">{icon}</Icon>}
      {name}
    </Button>
  );
};
