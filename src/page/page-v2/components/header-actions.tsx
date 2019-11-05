import Button from "@material-ui/core/Button";

import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";
import { CommonPageV2Classes, HeaderAction } from "../../../types/card";
import { LinkButton } from "../../../link";
import { SecondaryActionsMenuButton } from "../../../dev";

type Props = {
  primaryActions?: HeaderAction[];
  secondaryActions?: HeaderAction[];
  classes?: CommonPageV2Classes;
};

export const HeaderActions = forwardRef<any, Props>(
  (props: Props, ref: any) => {
    const { primaryActions = [], secondaryActions = [], classes = {} } = props;
    if (primaryActions.length === 0 && secondaryActions.length === 0) {
      return <div ref={ref} className={styles.headerActions} />;
    }
    const mappedPrimaryActions = primaryActions.map((action, index) => {
      const {
        Component,
        content = "",
        id,
        color = "primary",
        className = "",
        ...otherProps
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
    const hasSecondaryActions = secondaryActions.some(action => action.content);
    return (
      <div
        ref={ref}
        data-testid="common-page-header-actions"
        className={classNames(styles.headerActions, classes.headerActions)}
      >
        {mappedPrimaryActions.length > 0 && (
          <div
            data-testid="common-page-primary-actions"
            className={classNames(
              styles.primaryActions,
              classes.primaryActions,
            )}
          >
            {mappedPrimaryActions}
          </div>
        )}
        <SecondaryActionsMenuButton
          id="common-page"
          secondaryActions={secondaryActions}
          buttonClasses={{
            root: styles.secondaryActionsButton,
            label: classNames({ [styles.disabled]: !hasSecondaryActions }),
          }}
          menuClasses={{
            paper: classNames(
              styles.secondaryActions,
              classes.secondaryActions,
            ),
          }}
          isDisabled={!hasSecondaryActions}
        />
      </div>
    );
  },
);
