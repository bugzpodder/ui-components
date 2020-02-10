import React from "react";
import { ClickableItem } from "../../../types/dropdown";
import { CommonDropdownMenu } from "../../../common-dropdown";
import { DropdownMenuProps } from "../../../common-dropdown/dropdown-menu";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

type Props = {
  secondaryActions?: ClickableItem[] | null;
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
      dropdownId={id || "secondary-actions"}
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
