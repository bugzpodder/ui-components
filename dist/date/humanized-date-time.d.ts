import React from "react";
import { DateTimeValue } from "./date-time-value";
export declare type HumanizedDateTimeClasses = {
    dateTime?: string;
    humanizedText?: string;
};
export declare type Props = {
    /** id passed to span element wrapping date value */
    id?: string;
    /** The date value rendered */
    value?: string;
    /**
     * Provides classNames to the HumanizedDateTime component. Options include:
     *
     *  - `dateTime` (applied to date-time value)
     *
     *  - `humanizedField` (applied to humanized text)
     */
    classes?: HumanizedDateTimeClasses;
} & React.ComponentProps<typeof DateTimeValue>;
/** HumanizedDateTime formats a datetime value along with an expression describing the distance from the datetime
 * value and now. */
export declare const HumanizedDateTime: (props: Props) => JSX.Element;
