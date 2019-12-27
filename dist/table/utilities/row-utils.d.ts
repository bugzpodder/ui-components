import { HighlightRowProps } from "../../types/paged-table";
import { KeyboardEvent } from "react";
export declare const getRowId: (idKey: string | number, instance: Record<string, any>, index: number) => string;
export declare const getIndexOffset: (event: KeyboardEvent<HTMLElement>) => number;
export declare const handleKeyboardHighlight: (event: KeyboardEvent<HTMLElement>, props: HighlightRowProps) => void;
