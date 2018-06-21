// @flow
import React from "react";
import classNames from "classnames";
import styles from "./spinner-overlay.module.scss";

type Props = {
	isActive?: boolean,
	className?: string,
};
export const SpinnerOverlay = (props: Props) => {
	const { isActive = true, className = "" } = props;
	const spinnerClasses = {};
	spinnerClasses[styles.spinnerOverlay] = true;
	spinnerClasses[styles.active] = isActive;
	spinnerClasses[className] = className;
	return (
		<div
			data-testid="spinner-overlay"
			className={classNames(spinnerClasses)}
			onClick={event => isActive && event.stopPropagation()}
			onMouseDown={event => isActive && event.preventDefault()}
		>
			<div className={styles.loading} />
		</div>
	);
};
