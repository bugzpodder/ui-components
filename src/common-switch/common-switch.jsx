// @flow
import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import classNames from "classnames";
import styles from "./common-switch.module.scss";

type Props = {
	/** Returns the status of the switch, and the value if one exists */
	onChange: (boolean, any) => any,
	/** Determines the color of the switch. Options include "primary" and "secondary" */
	color?: "primary" | "secondary",
	/** When `true`, displays the switch in an error state */
	showError?: boolean,
	/** Provides a helper text under the switch */
	helperText?: string,
	/** Provides a label to the right of the switch */
	label?: string,
	/** When `false`, disables the switch */
	isEnabled?: boolean,
	/** Allows the programmer to take control of the selected state of the switch */
	isSelected?: boolean,
	/** The value of the switch input if one is provided */
	value?: string,
};

type State = {
	isChecked: boolean,
};

/** `CommonSwitch` renders a Material-UI switch component */
export class CommonSwitch extends React.Component<Props, State> {
	state = {
		isChecked: false,
	};

	handleChange = (e: InputEvent, checked: boolean) => {
		this.setState({ isChecked: checked });
		this.props.onChange(checked, e.currentTarget.value);
	};

	render = () => {
		const {
			color = "secondary",
			showError = false,
			helperText = "",
			label,
			isEnabled = true,
			isSelected,
			value = "",
		} = this.props;
		const { isChecked } = this.state;
		const errorClass = {};
		errorClass[styles.error] = showError;
		const switchSelection = isSelected ? isSelected : isChecked;
		return (
			<div className={styles.commonSwitch}>
				<FormControlLabel
					classes={{
						root: styles.controlLabel,
						label: classNames(errorClass),
					}}
					control={
						<Switch
							data-testid="common-switch"
							checked={switchSelection}
							classes={{
								iconChecked: classNames(errorClass),
								colorPrimary: classNames(errorClass),
								colorSecondary: classNames(errorClass),
							}}
							color={color}
							disabled={!isEnabled}
							disableRipple={true}
							onChange={this.handleChange}
							value={value}
						/>
					}
					label={label}
				/>
				{helperText && (
					<FormHelperText
						classes={{
							root: styles.switchHelperText,
						}}
						error={showError}
					>
						{helperText}
					</FormHelperText>
				)}
			</div>
		);
	};
}
