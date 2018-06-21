//@flow
import Icon from "@material-ui/core/Icon";
import React, { type Node } from "react";
import styles from "./readonly-text-field.module.scss";

type Props = {
	/** Value of the text field. */
	children?: Node,
	/** classname applied to the textfield */
	className?: string,
	/** When specified, displays the chosen material-ui icon as a Font Icon. */
	icon?: string,
	/** When `true`, displays the empty value as is. Otherwise displays "-" in place of the empty value. */
	showEmptyValue?: boolean,
};

/** Provides a styled component for displaying read-only input fields. */
export const ReadOnlyTextField = (props: Props) => {
	const { children, className = "", showEmptyValue, icon, ...other } = props;
	return (
		<span
			className={`${styles.readonlyTextField} ${className}`}
			data-testid="readonly-text-field"
			{...other}>
			{icon && (
				<Icon
					data-testid="icon"
					className={styles.icon}>
					{icon}
				</Icon>
			)}
			{children || showEmptyValue ? children : "-"}
		</span>
	);
};
