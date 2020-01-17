### Example

```js
import { useState } from "react";
import { ExampleWrapper } from "../../test-utils";
import { ReadOnlyTextField, Alert } from "@grailbio/components";
import { SlimTabbedPage } from "./slim-tabbed-page";

const ExampleCommonPage = () => {
  const [activeTab, setActiveTab] = useState("one");
  return (
    <SlimTabbedPage
      title="Example Common Page"
      subtitle="This is a subtitle"
      activeTab={activeTab}
      onChangeActiveTab={setActiveTab}
      primaryActions={[
        {
          content: "Button One",
          onClick: () => console.debug("Button One was clicked."),
        },
      ]}
      secondaryActions={[
        {
          content: "Button Two",
          color: "primary",
          onClick: () => console.debug("Button Two was clicked."),
        },
      ]}
      pageConfigs={[
        {
          label: "Tab One",
          key: "one",
          Component: Alert,
          componentProps: {
            message: "Tab One",
            color: "success",
          },
        },
        {
          label: "Tab Two",
          key: "two",
          Component: Alert,
          componentProps: {
            message: "Tab Two",
            color: "info",
          },
        },
      ]}
    >
      <ReadOnlyTextField>Any content can go inside of CommonPage</ReadOnlyTextField>
    </SlimTabbedPage>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```
