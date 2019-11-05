import React from "react";
export declare type Props = {
    /** id passed to span element wrapping date value */
    id?: string;
    /** The date value rendered */
    value?: string;
    /** classname applied to span wrapping date value */
    className?: string;
    /** format (defaults to YYYY-MM-DD) */
    format?: string;
};
/** DateTimeValue formats a datetime value. */
export declare const DateTimeValue: React.FC<Props>;
