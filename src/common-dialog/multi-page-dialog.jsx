// @flow

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./dialog.module.scss";
import { type CommonDialogAction, actionToButton } from "./util";

type CommonMultiPageDialogAction = {
  pages?: Array<number>,
} & CommonDialogAction;

type Props = {
  /** Custom action Buttons */
  actions: Array<CommonMultiPageDialogAction>,
  /** The callback used to hide the modal */
  hideModal: () => any,
  /** Is the modal visible */
  isVisible: boolean,
  /** Gives a Title to the Dialog */
  title: Node<*>,
  /** Dialog content */
  pages: Array<Node>,
  /** Page index */
  pageIndex: number,
  /** The callback used to set page */
  setPage: Function,
  /** shows the back button if it's true */
  showBackButton?: boolean,
  /**
   * Provides classNames to the dialog's sub-components. Options include:
   *
   *  - `root`: dialog's outermost div
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
export const CommonMultiPageDialog = (props: Props) => {
  const {
    isVisible,
    hideModal,
    pageIndex,
    pages,
    setPage,
    title,
    classes = {},
    showBackButton = true,
    enableOverflow = true,
    actions,
    ...dialogProps
  } = props;
  const leftActionButtons = actions
    .filter(({ isLeftButton = false, pages = [] }) => isLeftButton && (pages.length === 0 || pages.includes(pageIndex)))
    .map(action => actionToButton(action));
  const rightActionButtons = actions
    .filter(
      ({ isLeftButton = false, pages = [] }) => !isLeftButton && (pages.length === 0 || pages.includes(pageIndex)),
    )
    .map(action => actionToButton(action));
  return (
    <Dialog
      open={isVisible}
      className={classNames(styles.commonDialog, classes.root)}
      PaperProps={{ className: styles.commonDialogPaper }}
      onClose={hideModal}
      maxWidth={false}
      scroll="body"
      {...dialogProps}
    >
      <DialogTitle
        id="form-dialog-title"
        className={classes.title}
      >
        {title}
      </DialogTitle>
      <DialogContent
        data-testid="dialog-content"
        className={classNames(classes.content, {
          [styles.commonDialogNoOverflow]: !enableOverflow,
        })}
      >
        {pages[pageIndex]}
      </DialogContent>
      <DialogActions
        classes={{
          root: classes.actions,
          action: classes.action,
        }}
      >
        <div className={styles.commonDialogFooter}>
          <div className={styles.left}>
            {showBackButton && (
              <Button
                id="back"
                className="back"
                disabled={pageIndex === 0}
                onClick={setPage.bind(null, pageIndex - 1)}
              >
                <ArrowBackIcon className="margin-right-5" /> Back
              </Button>
            )}
            {leftActionButtons}
          </div>
          <div className={styles.right}>
            <Button
              id="close"
              onClick={hideModal}
            >
              Close
            </Button>
            {rightActionButtons}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};
