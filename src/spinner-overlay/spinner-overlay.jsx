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

/**
 * A spinner component that leaves the user unable to interact with the components it is covering.
 *
 * This is especially useful for saving states when attempting to prevent users from submitting
 * information more than once.
 *
 * IMPORTANT: `SpinnerOverlay` is styled as `position: absolute` and requires container with a non `static` position.
 * For example: `position: relative;`
 */
export const SpinnerOverlay = (props: Props) => {
	const { isActive = true, className = "" } = props;
	const spinnerClasses = {};
	spinnerClasses[styles.spinnerOverlay] = true;
	spinnerClasses[styles.active] = isActive;
	spinnerClasses[className] = className;
	return (
		<div
			data-testid="spinner-overlay"
			data-is-active={isActive}
			className={classNames(spinnerClasses)}
			onClick={event => isActive && event.stopPropagation()}
			onMouseDown={event => isActive && event.preventDefault()}
		>
			<div className={styles.loading} />
		</div>
	);
};
