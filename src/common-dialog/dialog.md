#### CommonDialogAction

```js
const Button = require("@material-ui/core/Button").default;
const { ExampleWrapper } = require("../test-utils");
const { useState } = require("react");

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
