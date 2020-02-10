import Button, { ButtonProps } from "@material-ui/core/Button";
import React, {
  ComponentType,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import styles from "./dropdown-menu.module.scss";
import { ClickableItem } from "../types/dropdown";
import { ExternalLink } from "../link";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PopoverOrigin } from "@material-ui/core/Popover";

export type DropdownMenuProps = {
  /** The id of the dropdown portion of the menu, used for accessibility */
  dropdownId: string;
  /** The content of the dropdown activator button */
  buttonContent: ReactNode;
  /** An array of ClickableItems to render in the dropdown. Options include:
   *
   *  - `content`: The text to display in the menu item.
   *
   *  - `isEnabled`: Optional. Whether the MenuItem is disabled (i.e. not clickable).
   *
   *  - `onClick`: Optional. Function to call when the MenuItem is clicked.
   *
   */
  menuItems: ClickableItem[];
  /** Determines if the dropdown button is disabled */
  isDisabled?: boolean;
  /** Defaults to false. When true, the underlying component of the button is an IconButton, rather than a Button. */
  isIconButton?: boolean;
  /** classes object for the Button component */
  buttonClasses?: Record<string, any>;
  /** classes object for the Menu component */
  menuClasses?: Record<string, any>;
  /** The anchor point on the button where the menu will attach to. Uses GRAIL's default "left bottom" */
  anchorOrigin?: PopoverOrigin;
  /** The point on the menu that will attach to the anchor origin. Uses Material-UI's default to "top left" */
  transformOrigin?: PopoverOrigin;
  /** Optional data test ID attribute for the button. If not defined, defaults to "dropdown-button". */
  "data-testid"?: string;
};

export const CommonDropdownMenu: React.FC<DropdownMenuProps> = props => {
  const anchorRef = useRef(null);
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
    "data-testid": dataTestId,
  } = props;

  const handleClose = (): void => {
    setIsOpen(false);
  };

  if (!menuItems) {
    return null;
  }

  const menuAnchor = anchorOrigin || { horizontal: "left", vertical: "bottom" };
  const ButtonComponent: ComponentType<ButtonProps> = isIconButton
    ? IconButton
    : Button;
  return (
    <>
      <ButtonComponent
        aria-haspopup
        aria-owns={dropdownId}
        buttonRef={anchorRef}
        onClick={() => setIsOpen(true)}
        classes={buttonClasses}
        data-testid={dataTestId || "dropdown-button"}
        disabled={isDisabled}
      >
        {buttonContent}
      </ButtonComponent>
      <Menu
        id={dropdownId}
        anchorEl={anchorRef.current}
        anchorOrigin={menuAnchor}
        transformOrigin={transformOrigin}
        getContentAnchorEl={null}
        open={isOpen}
        onClose={() => handleClose()}
        classes={menuClasses}
      >
        {menuItems &&
          menuItems.map(
            (
              {
                content,
                onClick,
                isEnabled = true,
                href,
                "data-testid": menuItemDataTestId,
                isExternal = false,
              },
              index,
            ) => {
              const menuItem = (
                <MenuItem
                  onClick={(e: MouseEvent) => {
                    if (!isEnabled) {
                      return;
                    }
                    handleClose();
                    onClick && onClick(e);
                  }}
                  key={`dropdown-item-${index}`}
                  data-testid={menuItemDataTestId || `dropdown-item-${index}`}
                  disabled={!isEnabled}
                >
                  {content}
                </MenuItem>
              );
              if (href) {
                if (isExternal) {
                  return (
                    <ExternalLink
                      href={href}
                      className={styles.link}
                      key={`dropdown-item-${index}`}
                    >
                      {menuItem}
                    </ExternalLink>
                  );
                }
                return (
                  <Link
                    to={href}
                    className={styles.link}
                    key={`dropdown-item-${index}`}
                  >
                    {menuItem}
                  </Link>
                );
              }
              return menuItem;
            },
          )}
      </Menu>
    </>
  );
};
