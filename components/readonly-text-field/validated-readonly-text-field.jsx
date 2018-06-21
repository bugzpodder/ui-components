// @flow
import React, { type Node } from "react";

import { ReadOnlyTextField } from "./readonly-text-field";
import styles from "./readonly-text-field.module.scss";

type Props = {
	/** Value of the input field. */
	children: Node,
	/** if True, has a check font. */
	isValid: boolean,
	/** Id of the element. */
	id?: string,
	/** Additional classnames for the element. */
	className?: string,
	/** If True, allows "N/A" to show up as main text. */
	isNA?: boolean,
};

/**
 * Provides a styled component for displaying read-only input fields with a validation icon.
 */
export const ValidatedReadOnlyTextField = (props: Props) => {
	const { id, children, className, isValid, isNA = false } = props;
	let textClassName = "";
	let icon = "";
	const cssClassName = className ? className : "";
	if (!isNA) {
		textClassName = `${isValid ? styles.success : styles.fail}`;
		icon = isValid ? "done" : "clear";
	}
	return (
		<ReadOnlyTextField
			id={id}
			className={`${textClassName} ${cssClassName}`}
			icon={icon}>
			{children}
		</ReadOnlyTextField>
	);
};
