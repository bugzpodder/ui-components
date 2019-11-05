import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./dialog.module.scss";
import { CommonDialogAction, actionToButton } from "./util";
import { CommonDialogClasses } from "../types/dialog";

type Props = {
  /** Provides an id to the component */
  id?: string;
  /** Custom action Buttons */
  actions: CommonDialogAction[];
  /** The callback used to hide the modal */
  hideModal: () => any;
  /** Is the modal visible */
  isVisible: boolean;
  /** The Dialog's content */
  children: ReactNode;
  /** Gives a Title to the Dialog */
  title: ReactNode;
  /** The value of the "Close" button. Defaults to "Close" */
  closeButtonText?: string;
  /**
   * Provides classNames to the dialog's sub-components. Options include:
   *
   *  - `root`: dialog's outermost div
   *
   *  - `paper`: wrapper around dialog
   *
   *  - `container`: wrapper around container content
   *
   *  - `title`
   *
   *  - `content`: dialog content wrapper
   *
   *  - `actions`: dialog actions wrapper
   *
   *  - `action`: wrapper around each individual dialog action
   */
  classes?: CommonDialogClasses;
};

/** `CommonDialog` provides a component to be used as a UI modal. */
export const CommonDialog: React.FC<Props> = props => {
  const {
    actions,
    children,
    classes = {},
    hideModal,
    isVisible,
    title,
    closeButtonText = "Close",
    ...dialogProps
  } = props;
  const leftActionButtons = actions
    .filter(({ isLeftButton = false }) => isLeftButton)
    .map(action => actionToButton(action));
  const rightActionButtons = actions
    .filter(({ isLeftButton = false }) => !isLeftButton)
    .map(action => actionToButton(action));
  return (
    // @ts-ignore: data-testid does not exist on type.
    <Dialog
      open={isVisible}
      data-testid="dialog"
      classes={{
        root: classNames(styles.commonDialog, classes.root),
        container: classNames(styles.commonDialogContainer, classes.container),
        paper: classNames(styles.commonDialogPaper, classes.paper),
      }}
      PaperProps={{
        "data-testid": "dialog-paper",
      }}
      BackdropProps={{
        "data-testid": "dialog-backdrop",
      }}
      onClose={hideModal}
      maxWidth={false}
      scroll="body"
      {...dialogProps}
    >
      <DialogTitle
        id="form-dialog-title"
        data-testid="dialog-title"
        className={classes.title}
      >
        {title}
      </DialogTitle>
      <DialogContent
        data-testid="dialog-content"
        classes={{
          root: classNames(classes.content, styles.commonDialogNoOverflow),
        }}
      >
        {children}
      </DialogContent>
      <DialogActions
        data-testid="dialog-actions"
        classes={{
          root: classes.actions,
          // @ts-ignore: action does not exist
          action: classes.action,
        }}
      >
        <div className={styles.commonDialogFooter}>
          <div className={styles.left}>{leftActionButtons}</div>
          <div className={styles.right}>
            <Button id="close" onClick={hideModal} color="primary">
              {closeButtonText}
            </Button>
            {rightActionButtons}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};
