### Examples

```js
import { ExampleWrapper } from "../../test-utils";
import { ReadOnlyTextField } from "@grailbio/components";
import { CommonPageV2 } from "./common-page-v2";

const ExampleCommonPage = () => {
  return (
    <CommonPageV2
      title="Example Common Page"
      subtitle="This is a subtitle"
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
    >
      <ReadOnlyTextField>Any content can go inside of CommonPage</ReadOnlyTextField>
    </CommonPageV2>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```

```js
import { ExampleWrapper } from "../../test-utils";
import { ReadOnlyTextField, Alert } from "@grailbio/components";
import { CommonPageV2 } from "./common-page-v2";

const ExampleCommonPage = () => {
  return (
    <CommonPageV2
      title="Example Common Page"
      subtitle="This is a subtitle"
      primaryActions={[
        {
          content: "Button One",
          onClick: () => console.debug("Button One was clicked."),
        },
      ]}
      specialActions={<Alert color="warning" variant="text" message="Watch out!!!" />}
    >
      <ReadOnlyTextField>Any content can go inside of CommonPage</ReadOnlyTextField>
    </CommonPageV2>
  );
};

<ExampleWrapper>
  <ExampleCommonPage />
</ExampleWrapper>;
```
