// @flow
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./dialog.module.scss";
import { type CommonDialogAction, actionToButton } from "./util";

type Props = {
  /** Custom action Buttons */
  actions: Array<CommonDialogAction>,
  /** The callback used to hide the modal */
  hideModal: () => any,
  /** Is the modal visible */
  isVisible: boolean,
  /** The Dialog's content */
  children: Node,
  /** Gives a Title to the Dialog */
  title: Node<*>,
  /** The value of the "Close" button. Defaults to "Close" */
  closeButtonText?: string,
  /**
   * Provides classNames to the dialog's sub-components. Options include:
   *
   *  - `root`: dialog's outermost div
   *
   *  - `paper`: wrapper around dialog
   *
   *  - `title`
   *
   *  - `content`: dialog content wrapper
   *
   *  - `actions`: dialog actions wrapper
   *
   *  - `action`: wrapper around each individual dialog action
   */
  classes?: CommonDialogClasses,
  enableOverflow?: boolean,
};

/** `CommonDialog` provides a component to be used as a UI modal. */
export const CommonDialog = (props: Props) => {
  const {
    actions,
    children,
    classes = {},
    hideModal,
    isVisible,
    title,
    closeButtonText = "Close",
    enableOverflow = true,
    ...dialogProps
  } = props;
  const leftActionButtons = actions
    .filter(({ isLeftButton = false }) => isLeftButton)
    .map(action => actionToButton(action));
  const rightActionButtons = actions
    .filter(({ isLeftButton = false }) => !isLeftButton)
    .map(action => actionToButton(action));
  return (
    <Dialog
      open={isVisible}
      className={classNames(styles.commonDialog, classes.root)}
      PaperProps={{ className: classNames(styles.commonDialogPaper, classes.paper) }}
      onClose={hideModal}
      maxWidth={false}
      scroll="body"
      {...dialogProps}
    >
      <DialogTitle
        id="form-dialog-title"
        className={classes.title || ""}
      >
        {title}
      </DialogTitle>
      <DialogContent
        className={classNames(classes.content, {
          [styles.commonDialogNoOverflow]: !enableOverflow,
        })}
      >
        {children}
      </DialogContent>
      <DialogActions
        classes={{
          root: classes.actions,
          action: classes.action,
        }}
      >
        <div className={styles.commonDialogFooter}>
          <div className={styles.left}>{leftActionButtons}</div>
          <div className={styles.right}>
            <Button
              id="close"
              onClick={hideModal}
              color="primary"
            >
              {closeButtonText}
            </Button>
            {rightActionButtons}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};
