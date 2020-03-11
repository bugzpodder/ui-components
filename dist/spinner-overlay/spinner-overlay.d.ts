/// <reference types="react" />
declare type Props = {
    /** determines the active state of the overlay */
    isActive?: boolean;
    /** gives a className to the component */
    className?: string;
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
export declare const SpinnerOverlay: (props: Props) => JSX.Element;
export {};
