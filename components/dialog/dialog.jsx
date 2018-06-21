// @flow
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { type ElementConfig, type Node } from "react";
import styles from "./dialog.module.scss";

type CommonDialogActions = {
	id?: string,
	name: string,
	isEnabled?: boolean,
	callback: Function,
	variant?: string,
} & ElementConfig<typeof Button>;

type Props = {
	/** Custom action Buttons */
	actions: Array<CommonDialogActions>,
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
	const actionToButton = (action: CommonDialogActions) => {
		const { id, isEnabled = true, name, callback, color, variant, ...props } = action;
		return (
			<Button
				data-id={id}
				data-is-enabled={isEnabled}
				disabled={!isEnabled}
				id={id || name}
				key={name}
				onClick={callback}
				color={color || "primary"}
				variant={variant || "raised"}
				{...props}
			>
				{name}
			</Button>
		);
	};
	const actionButtons = actions.map(actionToButton);
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
				<Button
					id="close"
					onClick={hideModal}>
					Close
				</Button>
				{actionButtons}
			</DialogActions>
		</Dialog>
	);
};
