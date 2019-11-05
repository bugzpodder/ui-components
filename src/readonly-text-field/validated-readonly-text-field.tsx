import React, { ReactNode } from "react";

import classNames from "classnames";
import styles from "./readonly-text-field.module.scss";
import { ReadOnlyTextField } from "./readonly-text-field";

type Props = {
  /** Value of the input field. */
  children: ReactNode;
  /** if True, has a check font. */
  isValid: boolean;
  /** Id of the element. */
  id?: string;
  /** Additional classnames for the element. */
  className?: string;
  /** If True, allows "N/A" to show up as main text. */
  isNA?: boolean;
};

/**
 * Provides a styled component for displaying read-only input fields with a validation icon.
 */
export const ValidatedReadOnlyTextField: React.FC<Props> = props => {
  const {
    id,
    children,
    className,
    isValid,
    isNA = false,
    ...otherProps
  } = props;
  let textClassName = "";
  let icon = "";
  const cssClassName = className || "";
  if (!isNA) {
    textClassName = `${isValid ? styles.success : styles.fail}`;
    icon = isValid ? "done" : "clear";
  }
  return (
    <ReadOnlyTextField
      id={id}
      className={classNames(textClassName, cssClassName)}
      icon={icon}
      {...otherProps}
    >
      {children}
    </ReadOnlyTextField>
  );
};
