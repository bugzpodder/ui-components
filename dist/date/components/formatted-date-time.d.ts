import React from "react";
declare type FormatProps = {
    format: string;
    id?: string;
    value?: string;
    className?: string;
};
export declare const formatDate: (value: any, format: string) => string;
export declare const FormattedDateTime: React.FC<FormatProps>;
export {};
