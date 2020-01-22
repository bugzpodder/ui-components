### Examples

```js
import { ExampleWrapper } from "../../test-utils";
import { ReadOnlyTextField } from "../../";
import { SlimPage } from "./slim-page";

const ExampleSlimPage = () => {
  return (
    <SlimPage
      title="Example Slim Page"
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
      <ReadOnlyTextField>
        Any content can go inside of SlimPage
      </ReadOnlyTextField>
    </SlimPage>
  );
};

<ExampleWrapper>
  <ExampleSlimPage />
</ExampleWrapper>;
```

```js
import { ExampleWrapper } from "../../test-utils";
import { ReadOnlyTextField } from "../../";
import { SlimPage } from "./slim-page";
import { Alert } from "@material-ui/lab";

const ExampleSlimPage = () => {
  return (
    <SlimPage
      title="Example Slim Page"
      subtitle="This is a subtitle"
      primaryActions={[
        {
          content: "Button One",
          onClick: () => console.debug("Button One was clicked."),
        },
      ]}
      centerHeader={
        <Alert severity="warning" variant="text">
          Watch out!!!
        </Alert>
      }
    >
      <ReadOnlyTextField>
        Any content can go inside of SlimPage
      </ReadOnlyTextField>
    </SlimPage>
  );
};

<ExampleWrapper>
  <ExampleSlimPage />
</ExampleWrapper>;
```
