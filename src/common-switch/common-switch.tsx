import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormHelperText from "@material-ui/core/FormHelperText";
import React, { ChangeEvent, useState } from "react";
import Switch from "@material-ui/core/Switch";
import classNames from "classnames";
import styles from "./common-switch.module.scss";
import { CommonSwitchClasses } from "../types/switch";

type Props = {
  /** Returns the status of the switch, and the value if one exists */
  onChange: (x0: boolean, x1: any) => any;
  /** Determines the color of the switch. Options include "primary" and "secondary" */
  color?: "primary" | "secondary";
  /** The id given to the switch */
  id?: string;
  /** When `true`, displays the switch in an error state */
  showError?: boolean;
  /** Provides a helper text under the switch */
  helperText?: string;
  /** Provides a label to the right of the switch */
  label?: string;
  /** When `false`, disables the switch */
  isEnabled?: boolean;
  /** Allows the programmer to take control of the selected state of the switch */
  isSelected?: boolean;
  /** The value of the switch input if one is provided */
  value?: string;
  /**
   * Provides classNames to the switch's sub-components. Options include:
   *
   *  - `root`: switch's outermost div
   *
   *  - `label`: switch label
   */
  classes?: CommonSwitchClasses;
};

/** `CommonSwitch` renders a Material-UI switch component */
export const CommonSwitch: React.FC<Props> = props => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    id = "",
    classes = {},
    color = "primary",
    showError = false,
    helperText = "",
    label,
    isEnabled = true,
    isSelected,
    value = "",
    onChange,
    ...controlProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked, e.currentTarget.value);
    if (isSelected === undefined || isSelected === null) {
      setIsChecked(checked);
    }
  };

  const errorClass = { [styles.error]: showError };
  const switchSelection =
    isSelected === undefined || isSelected === null ? isChecked : isSelected;
  return (
    <div className={classNames(styles.commonSwitch, classes.root)}>
      <FormControlLabel
        classes={{
          root: styles.controlLabel,
          label: classNames(classes.label, errorClass),
        }}
        data-testid="common-switch"
        control={
          <Switch
            id={id}
            checked={switchSelection}
            classes={{
              checked: classNames(errorClass),
              colorPrimary: classNames(errorClass),
              colorSecondary: classNames(errorClass),
              track: classNames({ [styles.errorBar]: showError }),
            }}
            color={color}
            disabled={!isEnabled}
            disableRipple
            onChange={handleChange}
            value={value}
          />
        }
        label={label || null}
        {...controlProps}
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
