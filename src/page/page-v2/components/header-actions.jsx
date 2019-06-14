// @flow

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { Fragment, forwardRef, useState } from "react";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";
import { LinkButton } from "../../../link";

type Props = {
  primaryActions?: Array<HeaderAction>,
  secondaryActions?: Array<HeaderAction>,
  classes?: CommonPageV2Classes,
};

export const HeaderActions = forwardRef<Props, any>((props: Props, ref: any) => {
  const { primaryActions = [], secondaryActions = [], classes = {} } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  if (primaryActions.length === 0 && secondaryActions.length === 0) {
    return (
      <div
        ref={ref}
        className={styles.headerActions}
      />
    );
  }
  const mappedPrimaryActions = primaryActions.map((action, index) => {
    const {
      Component, content = "", id, color = "primary", className = "", ...otherProps
    } = action;
    const isLink = otherProps.href != null;
    let ComponentToUse = null;
    if (Component) {
      ComponentToUse = Component;
    } else if (isLink) {
      ComponentToUse = LinkButton;
    } else {
      ComponentToUse = Button;
    }
    return (
      <ComponentToUse
        key={`header-action-${index}`}
        id={id}
        data-testid={id}
        color={color}
        {...otherProps}
        variant="contained"
        className={classNames(className, styles.primaryAction)}
      >
        {content}
      </ComponentToUse>
    );
  });

  const mappedSecondaryActions = secondaryActions.map((action, index) => {
    const { content = "", id, ...otherProps } = action;
    return (
      <MenuItem
        key={`header-action-${index}`}
        id={id}
        data-testid={id}
        {...otherProps}
      >
        {content}
      </MenuItem>
    );
  });
  const hasSecondaryActions = mappedSecondaryActions.length > 0;
  const id = "test";
  return (
    <div
      ref={ref}
      data-testid="common-page-header-actions"
      className={classNames(styles.headerActions, classes.headerActions)}
    >
      {mappedPrimaryActions.length > 0 && (
        <div
          data-testid="common-page-primary-actions"
          className={classNames(styles.primaryActions, classes.primaryActions)}
        >
          {mappedPrimaryActions}
        </div>
      )}
      <Fragment>
        <IconButton
          aria-describedby={id}
          data-testid="common-page-secondary-actions-button"
          disabled={!hasSecondaryActions}
          classes={{
            root: styles.secondaryActionsButton,
            label: classNames({ [styles.disabled]: !hasSecondaryActions }),
          }}
          onClick={event => {
            setAnchorEl(event.currentTarget);
            setMenuIsOpen(true);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={id}
          data-testid="common-page-secondary-actions"
          classes={{
            paper: classNames(styles.secondaryActions, classes.secondaryActions),
          }}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={menuIsOpen}
          onClose={() => {
            setMenuIsOpen(false);
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {mappedSecondaryActions}
        </Menu>
      </Fragment>
    </div>
  );
});
