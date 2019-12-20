import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { ReactNode, useRef } from "react";
import classNames from "classnames";
import styles from "./avatar-icon.module.scss";

type AvatarIconClasses = {
  root?: string;
  button?: string;
  avatar?: string;
  menu?: string;
  menuItem?: string;
};

type AvatarComponentProps = {
  /** The URL used to display a picture on the avatar */
  pictureUrl?: string;
  /** Classes applied to the AvatarIcon sub components. Options include:
   *
   *  - root: root div element
   *
   *  - button: button component
   *
   *  - avatar: avatar image
   *
   *  - menu: menu wrapper
   *
   *  - menuItem: applied to each menu item
   *
   */
  classes?: AvatarIconClasses;
};

type AvatarIconProps = {
  /** id applied to the button element */
  id?: string;
  /** Change handler when avatar is clicked. Returns the reverse value of `isMenuOpen` */
  onClick?: (x0: boolean) => any;
  /** Determines if the avatar menu is open */
  isMenuOpen?: boolean;
  /** Array of objects containing keys that are valid Material-UI `MenuItem` props */
  menuItems?: Array<{
    [x: string]: any;
  }>;
} & AvatarComponentProps;

const AvatarComponent: React.FC<AvatarComponentProps> = props => {
  const { pictureUrl, children, classes = {} } = props;
  if (pictureUrl) {
    return (
      <Avatar
        data-testid="avatar-icon-avatar"
        src={pictureUrl}
        className={classes.avatar}
      />
    );
  }
  if (children) {
    return (
      <Avatar data-testid="avatar-icon-avatar" className={classes.avatar}>
        {children}
      </Avatar>
    );
  }
  return (
    <AccountCircle
      data-testid="avatar-icon-avatar"
      className={classes.avatar}
    />
  );
};

/** `CommonDialog` provides an avatar icon with a dropdown menu. Children passed
 *  to the AvatarIcon component can be used to implement custom icons or letters
 *  in the Avatar */
export const AvatarIcon: React.FC<AvatarIconProps> = props => {
  const avatarRef = useRef(null);

  const {
    id = "",
    classes = {},
    onClick,
    pictureUrl,
    isMenuOpen = false,
    menuItems = [],
    children,
    ...buttonProps
  } = props;

  return (
    <div
      data-testid="avatar-icon"
      className={classNames(styles.avatarIconContainer, classes.root)}
    >
      <IconButton
        disableRipple
        id={id}
        disabled={!onClick}
        classes={{
          root: classNames({ [styles.iconButton]: pictureUrl }, classes.button),
        }}
        data-testid={id}
        buttonRef={avatarRef}
        onClick={onClick ? () => onClick(!isMenuOpen) : undefined}
        color="inherit"
        {...buttonProps}
      >
        <AvatarComponent pictureUrl={pictureUrl} classes={classes}>
          {children}
        </AvatarComponent>
      </IconButton>
      {menuItems.length > 0 && (
        <Menu
          data-testid={`${id}-avatar-menu`}
          className={classes.menu}
          anchorEl={avatarRef.current}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          getContentAnchorEl={null}
          open={isMenuOpen}
          TransitionProps={{ timeout: 0 }}
          onClose={onClick ? () => onClick(false) : undefined}
        >
          {menuItems.map((item, index) => {
            const {
              isVisible = true,
              content,
              onClick: onClickMenuItem,
              ...menuItemProps
            } = item;
            const id = `avatar-menu-item-${index}`;
            return (
              isVisible && (
                <MenuItem
                  key={id}
                  id={id}
                  data-testid={id}
                  className={classes.menuItem}
                  onClick={
                    onClick
                      ? () => {
                          onClick(false);
                          onClickMenuItem();
                        }
                      : undefined
                  }
                  {...menuItemProps}
                >
                  {content}
                </MenuItem>
              )
            );
          })}
        </Menu>
      )}
    </div>
  );
};
