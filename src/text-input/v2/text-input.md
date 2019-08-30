### Props

All the props of `TextInput` are included for `TextInputV2`.

### Example

```js
import styles from "../../test-utils/example-styles.module.scss";
import { ExampleWrapper } from "../../test-utils";
import { useState } from "react";
import { TextInputV2 } from "./text-input";

const TextInputV2Example = () => {
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");

  const handleFirst = event => {
    setOne(event.currentTarget.value);
  };

  const handleSecond = event => {
    setTwo(event.currentTarget.value);
  };

  const handleThird = event => {
    setThree(event.currentTarget.value);
  };

  const handleFourth = event => {
    setFour(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <TextInputV2
        label="some label"
        placeholder="Filled Text Input"
        value={one}
        onChange={handleFirst}
        className={styles.spacing}
      />
      <TextInputV2
        label="some label"
        placeholder="Filled Text Input"
        helperText="some helper text"
        value={two}
        onChange={handleSecond}
        className={styles.spacing}
      />
      <TextInputV2
        label="some disabled input"
        placeholder="Disabled"
        helperText="some helper text"
        disabled={true}
        className={styles.spacing}
      />
      <TextInputV2
        placeholder="Uh oh"
        helperText="an error"
        error={true}
        value={three}
        onChange={handleThird}
        className={styles.spacing}
      />
      <br />
      <TextInputV2
        label="some label"
        readOnly={true}
        placeholder="Placeholder text, won't show"
        value="filled read-only value"
        data-testid="fourth-text-input"
        className={styles.spacing}
      />
      <TextInputV2
        label="some label"
        readOnly={true}
        placeholder="Placeholder text, won't show"
        helperText="default value"
        value=""
        className={styles.spacing}
      />
      <TextInputV2
        label="some label"
        readOnly={true}
        readOnlyDefaultValue="custom default value"
        placeholder="Placeholder text, won't show"
        value=""
        className={styles.spacing}
      />
      <TextInputV2
        label="some label"
        readOnly={true}
        readOnlyDefaultValue=""
        helperText="read only show empty value"
        placeholder="Placeholder text, won't show"
        value=""
        className={styles.spacing}
      />
    </div>
  );
};

<ExampleWrapper>
  <TextInputV2Example />
</ExampleWrapper>;
```
