// @flow

import React, { type Node } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import classNames from "classnames";
import styles from "./dialog.module.scss";
import { actionToButton, type CommonDialogAction } from "./util";

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
	/** className */
	className?: string,
};
export const CommonMultiPageDialog = (props: Props) => {
	const {
		isVisible, hideModal, pageIndex, pages, setPage, title, className, showBackButton = true, actions,
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
			className={classNames(styles.commonDialog, className)}
			PaperProps={{ className: styles.commonDialogPaper }}
			onClose={hideModal}
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent className={styles.commonDialogContent}>{pages[pageIndex]}</DialogContent>
			<DialogActions>
				<div className={styles.commonDialogFooter}>
					<div className={styles.left}>
						{pageIndex > 0
							&& showBackButton && (
								<Button
									id="back"
									className="back"
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
