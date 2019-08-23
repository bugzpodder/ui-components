// @flow
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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
  /** Determines if the dropdown button is disabled */
  isDisabled?: boolean,
  /** Defaults to false. When true, the underlying component of the button is an IconButton, rather than a Button. */
  isIconButton?: boolean,
  /** classes object for the Button component */
  buttonClasses?: Object,
  /** classes object for the Menu component */
  menuClasses?: Object,
  /** The anchor point on the button where the menu will attach to. Uses GRAIL's default "left bottom" */
  anchorOrigin?: Object,
  /** The point on the menu that will attach to the anchor origin. Uses Material-UI's default to "top left" */
  transformOrigin?: Object,
};

export const CommonDropdownMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    buttonContent,
    dropdownId,
    menuItems,
    isIconButton,
    isDisabled,
    buttonClasses,
    menuClasses,
    anchorOrigin,
    transformOrigin,
  } = props;

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!menuItems || !menuItems.length) {
    return null;
  }

  const menuAnchor = anchorOrigin || { horizontal: "left", vertical: "bottom" };
  const ButtonComponent = isIconButton ? IconButton : Button;
  return (
    <>
      <ButtonComponent
        aria-haspopup
        aria-owns={anchorEl && dropdownId}
        onClick={event => {
          setAnchorEl(event.currentTarget);
          setIsOpen(true);
        }}
        classes={buttonClasses}
        data-testid="dropdown-button"
        disabled={isDisabled}
      >
        {buttonContent}
      </ButtonComponent>
      <Menu
        id={dropdownId}
        anchorEl={anchorEl}
        anchorOrigin={menuAnchor}
        transformOrigin={transformOrigin}
        getContentAnchorEl={null}
        open={isOpen}
        onClose={() => {
          handleClose();
          setAnchorEl(null);
        }}
        classes={menuClasses}
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
