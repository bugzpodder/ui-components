### Examples

```js
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const ReadOnlyTextField = require("@grail/components").ReadOnlyTextField;
const { CommonPage } = require("./index");

const ExampleCommonPage = () => {
  return (
    <CommonPage
      title="Example Common Page"
      subtitle="This is a subtitle"
      headerActions={[
        {
          content: "Button Two",
          color: "primary",
          onClick: () => console.log("Button Two was clicked."),
        },
        {
          content: "Button One",
          color: "primary",
          variant: "contained",
          onClick: () => console.log("Button One was clicked."),
        },
      ]}
    >
      <ReadOnlyTextField>Any content can go inside of CommonPage</ReadOnlyTextField>
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
const Alert = require("@grail/components").Alert;
const CommonSwitch = require("@grail/components").CommonSwitch;
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const Fragment = require("react").Fragment;
const { CommonPage } = require("./index");

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
        <Alert color="success" message="Element A!" id="elementA" />
        <Alert color="success" message="Element B!" id="elementB" />
        <Alert color="success" message="Element C!" id="elementC" />
      </div>
    </CommonPage>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```
