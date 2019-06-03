#### CommonDialogAction

```js
import Button from "@material-ui/core/Button";
import { ExampleWrapper } from "../test-utils";
import { useState } from "react";
import { CommonDialog } from "./";

const DialogDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsVisible(true)}>Open simple dialog</Button>
      <CommonDialog
        title="Example Dialog"
        classes={{
          root: "root-class",
          title: "title-class",
          content: "content-class",
          actions: "actions-class",
        }}
        hideModal={() => setIsVisible(false)}
        isVisible={isVisible}
        actions={[
          {
            name: "Go Back",
            callback: () => setIsVisible(false),
            isEnabled: true,
            color: "secondary",
            isLeftButton: true,
          },
          {
            name: "Button 1",
            callback: () => setIsVisible(false),
            icon: "done",
            isEnabled: true,
            variant: "contained",
            color: "primary",
          },
        ]}
      >
        <div>Put something cool in here</div>
      </CommonDialog>
    </div>
  );
};

<ExampleWrapper>
  <DialogDemo />
</ExampleWrapper>;
```
