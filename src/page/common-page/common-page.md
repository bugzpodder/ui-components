### Examples

```js
import { ExampleWrapper } from "../test-utils";
import { ReadOnlyTextField, CommonPage } from "../../";

const ExampleCommonPage = () => {
  return (
    <CommonPage
      title="Example Common Page"
      subtitle="This is a subtitle"
      headerActions={[
        {
          content: "Button Two",
          color: "primary",
          onClick: () => console.debug("Button Two was clicked."),
        },
        {
          content: "Button One",
          color: "primary",
          variant: "contained",
          onClick: () => console.debug("Button One was clicked."),
        },
      ]}
    >
      <ReadOnlyTextField>
        Any content can go inside of CommonPage
      </ReadOnlyTextField>
    </CommonPage>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```

Here is an example with a side menu as well. Note that clicking on the
menu will typically cause the page to scroll to the element whose `id`
matches the `key` given in the object in `menuContents`. However, it
uses CSS anchors and these do not work on styleguidist.

```js
import { CommonSwitch, CommonPage } from "../../";
import { ExampleWrapper } from "../test-utils";
import { Alert } from "@material-ui/lab";

const ExampleCommonPage = () => {
  return (
    <CommonPage
      title="Example With Menu"
      subtitle="Another subtitle"
      headerActions={[
        {
          Component: CommonSwitch,
          componentProps: {
            label: "CUSTOM ACTION",
            onChange: () => {},
            color: "secondary",
          },
        },
      ]}
      menuContents={[
        {
          label: "Element A",
          key: "elementA",
        },
        {
          label: "Element B",
          key: "elementB",
        },
        {
          label: "Element C",
          key: "elementC",
        },
      ]}
    >
      <div>
        <Alert serverity="success" id="elementA">
          Element A!
        </Alert>
        <Alert severity="success" id="elementB">
          Element B!
        </Alert>
        <Alert severity="success" id="elementC">
          Element C!
        </Alert>
      </div>
    </CommonPage>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```
