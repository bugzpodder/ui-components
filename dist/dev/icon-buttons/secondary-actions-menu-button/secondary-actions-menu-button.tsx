import MoreVertIcon from "@material-ui/icons/MoreVert";

import React from "react";
import { CommonDropdownMenu } from "../../../common-dropdown";
import { DropdownMenuProps } from "../../../common-dropdown/dropdown-menu";
import { HeaderAction } from "../../../types/card";

type Props = {
  secondaryActions?: HeaderAction[] | null;
  id?: string;
} & Partial<DropdownMenuProps>;

export const SecondaryActionsMenuButton: React.FC<Props> = props => {
  const { id = "", secondaryActions, ...otherProps } = props;
  if (!secondaryActions) {
    return null;
  }
  return (
    <CommonDropdownMenu
      isIconButton
      dropdownId={`${id ? `${id}-` : ""}secondary-actions`}
      menuItems={secondaryActions}
      buttonContent={<MoreVertIcon />}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...otherProps}
    />
  );
};
