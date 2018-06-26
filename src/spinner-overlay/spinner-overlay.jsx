// @flow
import React from "react";
import classNames from "classnames";
import styles from "./spinner-overlay.module.scss";

type Props = {
	/** determines the active state of the overlay */
	isActive?: boolean,
	/** gives a className to the component */
	className?: string,
};

/** SpinnerOverlay provides a spinner component that leaves the user unable to interact with the components
 * it is covering. This is especially useful for saving states when attempingt to prevent users from
 * submitting information more than once */
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
