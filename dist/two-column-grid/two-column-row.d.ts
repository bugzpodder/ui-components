/// <reference types="react" />
import { GridRow } from "../types/grid";
import { TextAlignProperty } from "csstype";
declare type Props = {
    row: GridRow;
    rowIndex: number;
    textAlign?: TextAlignProperty[];
    labelWidth?: number;
};
export declare const TwoColumnRow: (props: Props) => JSX.Element;
export {};
