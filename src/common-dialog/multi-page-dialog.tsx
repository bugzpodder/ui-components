import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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

type CommonMultiPageDialogAction = {
  pages?: number[];
} & CommonDialogAction;

type Props = {
  /** Custom action Buttons */
  actions: CommonMultiPageDialogAction[];
  /** The callback used to hide the modal */
  hideModal: () => any;
  /** Is the modal visible */
  isVisible: boolean;
  /** Gives a Title to the Dialog */
  title: ReactNode;
  /** Dialog content */
  pages: ReactNode[];
  /** Page index */
  pageIndex: number;
  /** The callback used to set page */
  setPage: Function;
  /** shows the back button if it's true */
  showBackButton?: boolean;
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

export const CommonMultiPageDialog: React.FC<Props> = props => {
  const {
    isVisible,
    hideModal,
    pageIndex,
    pages,
    setPage,
    title,
    classes = {},
    showBackButton = true,
    actions,
    ...dialogProps
  } = props;
  const leftActionButtons = actions
    .filter(
      ({ isLeftButton = false, pages = [] }) =>
        isLeftButton && (pages.length === 0 || pages.includes(pageIndex)),
    )
    .map(action => actionToButton(action));
  const rightActionButtons = actions
    .filter(
      ({ isLeftButton = false, pages = [] }) =>
        !isLeftButton && (pages.length === 0 || pages.includes(pageIndex)),
    )
    .map(action => actionToButton(action));
  return (
    // @ts-ignore: data-testid does not exist on type.
    <Dialog
      open={isVisible}
      classes={{
        root: classNames(styles.commonDialog, classes.root),
        container: classNames(styles.commonDialogContainer, classes.container),
        paper: classNames(styles.commonDialogPaper, classes.paper),
      }}
      PaperProps={{
        // @ts-ignore: data-testid is not assignable to type.
        "data-testid": "dialog-paper",
      }}
      onClose={hideModal}
      maxWidth={false}
      scroll="body"
      {...dialogProps}
    >
      <DialogTitle id="form-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent
        data-testid="dialog-content"
        classes={{
          root: classNames(classes.content, styles.commonDialogNoOverflow),
        }}
      >
        {pages[pageIndex]}
      </DialogContent>
      <DialogActions
        classes={{
          root: classes.actions,
          // @ts-ignore: action does not exist
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
                <ArrowBackIcon className={styles.backIcon} /> Back
              </Button>
            )}
            {leftActionButtons}
          </div>
          <div className={styles.right}>
            <Button id="close" onClick={hideModal}>
              Close
            </Button>
            {rightActionButtons}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};
