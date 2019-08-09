// @flow
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";

type Props = {
  /** The id of the dropdown portion of the menu, used for accessibility */
  dropdownId: string,
  /** The content of the dropdown activator button */
  buttonContent: Node,
  /** An array of DropdownMenuItems to render in the dropdown. Options include:
   *
   *  - `textContent`: The text to display in the menu item.
   *
   *  - `isEnabled`: Optional. Whether the MenuItem is disabled (i.e. not clickable).
   *
   *  - `onClick`: Optional. Function to call when the MenuItem is clicked.
   *
   */
  menuItems: Array<DropdownMenuItem>,
};

export const CommonDropdownMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { buttonContent, dropdownId, menuItems } = props;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        aria-haspopup
        aria-owns={anchorEl && dropdownId}
        onClick={event => {
          setAnchorEl(event.currentTarget);
          setIsOpen(true);
        }}
        data-testid="dropdown-button"
      >
        {buttonContent}
      </Button>
      <Menu
        id={dropdownId}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        getContentAnchorEl={null}
        open={isOpen}
        onClose={() => {
          handleClose();
          setAnchorEl(null);
        }}
      >
        {menuItems &&
          menuItems.map(({ content, onClick, isEnabled = true }, index) => {
            return (
              <MenuItem
                onClick={(e: MouseEvent) => {
                  if (!isEnabled) {
                    return;
                  }
                  handleClose();
                  onClick && onClick(e);
                }}
                key={`dropdown-item-${index}`}
                data-testid={`dropdown-item-${index}`}
              >
                {content}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};
