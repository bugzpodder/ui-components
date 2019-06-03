### Example

```js
import { Alert } from "@grail/components";
import { ExampleBlock, ExampleWrapper } from "../test-utils";
import { Fragment, useState } from "react";
import { CommonTabbedPage } from "./";

const ExampleTabbedCard = () => {
  const [activeTab, setActiveTab] = useState("one");
  return (
    <Fragment>
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
    </Fragment>
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
import { Fragment, useState } from "react";
import { Alert, CommonSwitch } from "@grail/components";
import { ExampleBlock, ExampleWrapper } from "../test-utils";
import { CommonTabbedPage } from "./";

const TabOneComponent = () => {
  return (
    <Fragment>
      <Alert color="success" message="Tab One Element A!" id="elementA" />
      <Alert color="success" message="Tab One Element B!" id="elementB" />
      <Alert color="success" message="Tab One Element C!" id="elementC" />
    </Fragment>
  );
};

const TabTwoComponent = () => {
  return (
    <Fragment>
      <Alert color="warning" message="Tab Two Element I!" id="elementI" />
      <Alert color="warning" message="Tab Two Element II!" id="elementII" />
      <Alert color="warning" message="Tab Two Element III!" id="elementIII" />
    </Fragment>
  );
};

const ExampleTabbedCard = () => {
  const [activeTab, setActiveTab] = useState("one");
  return (
    <Fragment>
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
    </Fragment>
  );
};

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```
