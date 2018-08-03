### Example

```js
const Fragment = require("react").Fragment;
const Button = require("@material-ui/core/Button").default;
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
      <Button color="primary" variant="raised">
        Second
      </Button>
    </Fragment>
  }
  footerActions={<Button>OK</Button>}
>
  Your Card's content goes here, ideally in a Grid for easier styling
</CommonCard>;
```
