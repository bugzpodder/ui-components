// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { type CommonDialogAction } from "./dialog";

export const actionToButton = (action: CommonDialogAction) => {
	const { id, icon, color, isEnabled = true, name, callback, isLeftButton, ...buttonProps } = action;
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
			{...buttonProps}
		>
			{icon && <Icon className="margin-right-5">{icon}</Icon>}
			{name}
		</Button>
	);
};
