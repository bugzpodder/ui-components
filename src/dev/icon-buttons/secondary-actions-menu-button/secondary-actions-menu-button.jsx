// @flow

import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { CommonDropdownMenu } from "../../../common-dropdown";

type Props = {
  secondaryActions: ?Array<HeaderAction>,
  id?: string,
};

export const SecondaryActionsMenuButton = (props: Props) => {
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
