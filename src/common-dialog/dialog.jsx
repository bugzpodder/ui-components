// @flow
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { type ElementConfig, type Node } from "react";
import { actionToButton } from "./util";
import styles from "./dialog.module.scss";

export type CommonDialogAction = {
	name: string,
	callback: Function,
	icon?: string,
	id?: string,
	isEnabled?: boolean,
	variant?: string,
	isLeftButton?: boolean,
} & ElementConfig<typeof Button>;

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
};

/** `CommonDialog` provides a component to be used as a UI modal. */
export const CommonDialog = (props: Props) => {
	const { actions, children, hideModal, isVisible, title } = props;
	const leftActionButtons = actions
		.filter(({ isLeftButton = false }) => isLeftButton)
		.map(action => actionToButton(action));
	const rightActionButtons = actions
		.filter(({ isLeftButton = false }) => !isLeftButton)
		.map(action => actionToButton(action));
	return (
		<Dialog
			open={isVisible}
			className={styles.commonDialog}
			PaperProps={{ className: styles.commonDialogPaper }}
			onClose={hideModal}
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent className={styles.commonDialogContent}>{children}</DialogContent>
			<DialogActions>
				<div className={styles.commonDialogFooter}>
					<div className={styles.left}>{leftActionButtons}</div>
					<div className={styles.right}>
						<Button
							id="close"
							onClick={hideModal}>
							Close
						</Button>
						{rightActionButtons}
					</div>
				</div>
			</DialogActions>
		</Dialog>
	);
};
