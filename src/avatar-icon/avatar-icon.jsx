// @flow
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { Fragment } from "react";
import classNames from "classnames";
import styles from "./avatar-icon.module.scss";

type Props = {
  /** id applied to the button element */
  id?: string,
  /** Change handler when avatar is clicked. Returns the reverse value of `isMenuOpen` */
  onClick?: boolean => any,
  /** The URL used to display a picture on the avatar */
  pictureUrl?: string,
  /** Determines if the avatar menu is open */
  isMenuOpen?: boolean,
  /** Array of objects containing keys that are valid Material-UI `MenuItem` props */
  menuItems?: Array<Object>,
};

export class AvatarIcon extends React.Component<Props> {
  avatarRef = null;

  render = () => {
    const {
      id = "", onClick, pictureUrl, isMenuOpen = false, menuItems = [], ...buttonProps
    } = this.props;
    return (
      <Fragment>
        <IconButton
          disableRipple
          id={id}
          disabled={!onClick}
          classes={{
            root: classNames({ [styles.iconButton]: pictureUrl }),
          }}
          data-testid={id}
          buttonRef={ref => {
            this.avatarRef = ref;
          }}
          onClick={onClick ? () => onClick(!isMenuOpen) : undefined}
          color="inherit"
          {...buttonProps}
        >
          {pictureUrl ? <Avatar src={pictureUrl} /> : <AccountCircle />}
        </IconButton>
        {menuItems.length > 0 && (
          <Menu
            data-testid={`${id}-avatar-menu`}
            anchorEl={this.avatarRef}
            anchorOrigin={{ vertical: "bottom" }}
            getContentAnchorEl={null}
            open={isMenuOpen}
            TransitionProps={{ timeout: 0 }}
            onClose={onClick ? () => onClick(false) : undefined}
          >
            {menuItems.map((item, index) => {
              const {
                isVisible = true, content, onClick: onClickMenuItem, ...menuItemProps
              } = item;
              return (
                isVisible && (
                  <MenuItem
                    key={`avatar-menu-item-${index}`}
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
      </Fragment>
    );
  };
}
