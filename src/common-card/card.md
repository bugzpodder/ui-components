### Example

```js
import { ExampleWrapper } from "../test-utils";
import { Button } from "@material-ui/core";
import { CommonCard } from "./";
<ExampleWrapper>
  <CommonCard
    title="New Instrument"
    subheader="This is a subheader"
    classes={{
      root: "main-container",
      body: "content-container",
    }}
    headerActions={
      <>
        <Button>First</Button>
        <Button color="primary" variant="contained">
          Second
        </Button>
      </>
    }
    secondaryActions={[
      {
        id: "secondary-one",
        color: "primary",
        onClick: () => console.log("one"),
        content: "Secondary One",
      },
      {
        id: "secondary-two",
        color: "primary",
        onClick: () => console.log("two"),
        content: "Secondary Two",
      },
    ]}
    footerActions={<Button>OK</Button>}
  >
    Your Card's content goes here, ideally in a Grid for easier styling
  </CommonCard>
</ExampleWrapper>;
```
