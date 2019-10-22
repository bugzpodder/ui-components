### Example SignInPage

```js
import { ExampleWrapper } from "../test-utils";
import styles from "../test-utils/example-styles.module.scss";
import { SignInPage } from "./";
import backgroundImage from "./spec-background.png";

<ExampleWrapper>
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "500px",
    }}
  >
    <SignInPage
      logo={<h2>Import `GrailLogo` from `@grail/common-private` Package</h2>}
      backgroundImage={backgroundImage}
      subheader={"Non-default message"}
    />
  </div>
</ExampleWrapper>;
```
