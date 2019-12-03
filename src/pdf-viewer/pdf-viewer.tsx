import React, { useState } from "react";
// importing from /dist/entry.webpack due to https://github.com/mozilla/pdf.js/issues/7612
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { PDFViewerClasses } from "../types/pdf-viewer";

type Props = {
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

export const PDFViewer: React.FC<Props> = props => {
  const { pdf, width, classes = {} } = props;
  const [numPages, setNumPages] = useState(0);

  const pages = [];
  for (let i = 0; i < numPages; i++) {
    const pageNumber = i + 1;
    pages.push(
      <Page
        key={pageNumber}
        pageNumber={pageNumber}
        className={classes.pdfPage}
        width={width}
      />,
    );
  }

  return (
    <Document
      className={classes.pdfDocument}
      file={pdf || ""}
      error="PDF could not be displayed"
      onLoadSuccess={({ numPages: pages }): void => setNumPages(pages)}
    >
      {numPages > 0 && pages}
    </Document>
  );
};
