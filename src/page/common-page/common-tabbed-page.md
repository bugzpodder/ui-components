### Example

```js
import { Alert } from "@material-ui/lab";
import { CommonTabbedPage } from "./";
import { ExampleBlock, ExampleWrapper } from "../test-utils";
import { useState } from "react";

const ExampleTabbedCard = () => {
  const [activeTab, setActiveTab] = useState("one");
  return (
    <>
      <CommonTabbedPage
        title="Example Tabbed Page"
        subtitle="This is a subtitle"
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
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
        pageConfigs={[
          {
            label: "Tab One",
            key: "one",
            Component: Alert,
            componentProps: {
              color: "success",
              message: "Tab One!",
            },
          },
          {
            label: "Tab Two",
            key: "two",
            Component: Alert,
            componentProps: {
              color: "warning",
              message: "Tab Two!",
            },
          },
        ]}
      />
      <ExampleBlock strongHeader="state " content={activeTab} />
    </>
  );
};

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```

Here is an example with a side menu as well. Note that clicking on the
menu will typically cause the page to scroll to the element whose `id`
matches the `key` given in the object in `menuContents`. However, it
uses CSS anchors and these do not work on styleguidist.

```js
import { useState } from "react";
import { CommonSwitch, CommonTabbedPage } from "../../;
import { ExampleBlock, ExampleWrapper } from "../../test-utils";
import { Alert } from "@material-ui/lab";

const TabOneComponent = () => {
  return (
    <>
      <Alert severity="success" id="elementA">
        Tab One Element A!
      </Alert>
      <Alert severity="success" id="elementB">
        Tab One Element B!
      </Alert>
      <Alert severity="success" id="elementC">
        Tab One Element C!
      </Alert>
    </>
  );
};

const TabTwoComponent = () => {
  return (
    <>
      <Alert severity="warning" id="elementI">
        Tab Two Element I!
      </Alert>
      <Alert severity="warning" id="elementII">
        Tab Two Element II!
      </Alert>
      <Alert severity="warning" id="elementIII">
        Tab Two Element III!
      </Alert>
    </>
  );
};

const ExampleTabbedCard = () => {
  const [activeTab, setActiveTab] = useState("one");
  return (
    <>
      <CommonTabbedPage
        title="Example With Menu"
        subtitle="Another subtitle"
        activeTab={activeTab}
        onChangeActiveTab={setActiveTab}
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
        pageConfigs={[
          {
            label: "Tab One",
            key: "one",
            Component: TabOneComponent,
            componentProps: {},
            menuContents: [
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
            ],
          },
          {
            label: "Tab Two",
            key: "two",
            Component: TabTwoComponent,
            componentProps: {},
            menuContents: [
              {
                label: "Element I",
                key: "elementI",
              },
              {
                label: "Element II",
                key: "elementII",
              },
              {
                label: "Element III",
                key: "elementIII",
              },
            ],
          },
        ]}
      />
      <ExampleBlock strongHeader="state " content={activeTab} />
    </>
  );
};

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```
