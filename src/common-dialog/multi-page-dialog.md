#### CommonDialogActions

```js
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { CommonMultiPageDialog } from "./";

const MultiPageDialogDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [<div> Page 1 Content </div>, <div> Page 2 Content </div>];
  return (
    <div>
      <Button onClick={() => setIsVisible(true)}>Open multi page dialog</Button>
      <CommonMultiPageDialog
        title="Example Dialog"
        hideModal={() => setIsVisible(false)}
        isVisible={isVisible}
        actions={[
          {
            name: "Next page",
            callback: () => {
              setPageIndex(pageIndex + 1);
            },
            isEnabled: true,
            variant: "contained",
            icon: "arrow_forward",
            color: "primary",
            pages: [0],
          },
          {
            name: "Alert & Close",
            callback: () => {
              alert("No more pages!");
              setIsVisible(false);
            },
            isEnabled: true,
            variant: "contained",
            color: "primary",
            pages: [1],
          },
        ]}
        pages={pages}
        pageIndex={pageIndex}
        setPage={setPageIndex}
      />
    </div>
  );
};

<MultiPageDialogDemo />;
```
