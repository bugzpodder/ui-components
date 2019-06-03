### Example

```js
import { ExampleWrapper } from "../test-utils";
import { Fragment } from "react";
import Button from "@material-ui/core/Button";
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
      <Fragment>
        <Button>First</Button>
        <Button color="primary" variant="contained">
          Second
        </Button>
      </Fragment>
    }
    footerActions={<Button>OK</Button>}
  >
    Your Card's content goes here, ideally in a Grid for easier styling
  </CommonCard>
</ExampleWrapper>;
```
