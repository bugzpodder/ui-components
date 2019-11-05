import React, { ReactNode } from "react";
declare type Props = {
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
export declare const ValidatedReadOnlyTextField: React.FC<Props>;
export {};
