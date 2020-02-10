import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

type Props = {
  isExpanded: boolean;
  toggleMenu: () => any;
};

export const SideMenuButton: React.FC<Props> = props => {
  const { isExpanded, toggleMenu } = props;
  const extraClassName = isExpanded ? "expanded" : "";
  return (
    <Tooltip title={isExpanded ? "Collapse Menu" : "Expand Menu"}>
      <IconButton
        className={`toggle-side-menu ${extraClassName}`}
        data-testid="toggle-side-menu"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );
};
