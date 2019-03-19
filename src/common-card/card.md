### Example

```js
const { ExampleWrapper } = require("../test-utils");
const { Fragment } = require("react");
const Button = require("@material-ui/core/Button").default;

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
