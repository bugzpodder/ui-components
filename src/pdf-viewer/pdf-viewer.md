### Example

```js
import { ExampleWrapper } from "../test-utils";
import { PDFViewer } from "./pdf-viewer";
import SamplePDF from "./sample.pdf";

const PDFViewerContainer = () => {
  return (
    <div>
      <PDFViewer
        pdf={SamplePDF}
        width={500}
      />
    </div>
  );
};

<ExampleWrapper>
  <PDFViewerContainer />
</ExampleWrapper>;
```
