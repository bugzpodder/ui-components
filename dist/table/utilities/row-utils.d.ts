import { HighlightRowProps } from "../../types/paged-table";
import { KeyboardEvent } from "react";
export declare const getRowId: (idKey: string | number, instance: {
    [x: string]: any;
}, index: number) => any;
export declare const getIndexOffset: (event: KeyboardEvent<HTMLElement>) => 1 | -1 | 0;
export declare const handleKeyboardHighlight: (event: KeyboardEvent<HTMLElement>, props: HighlightRowProps) => void;
