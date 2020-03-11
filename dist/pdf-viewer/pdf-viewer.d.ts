/// <reference types="react" />
import { PDFViewerClasses } from "../types/pdf-viewer";
declare type Props = {
    /** Defines the pdf blob to display or the path to the blob */
    pdf: Blob | string;
    /** Defines the width of the pdf display */
    width: number;
    /**
     * Provides classNames to the navbar's sub-components. Options include:
     *
     *  - `pdfPage`: styling on the individual pdf page
     *
     *  - `pdfDocument`: styling on the overall document
     *
     */
    classes?: PDFViewerClasses;
};
export declare const PDFViewer: (props: Props) => JSX.Element;
export {};
