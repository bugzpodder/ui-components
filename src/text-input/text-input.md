### Props

All the props of `TextField` are included for `TextInput`.

### Example

```js
const styles = require("../test-utils/example-styles.module.scss");
const { ExampleWrapper } = require("../test-utils");
const { useState } = require("react");

const TextInputExample = () => {
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");

  const handleFirst = event => {
    setOne(event.currentTarget.value);
  };

  const handleSecond = event => {
    setTwo(event.currentTarget.value);
  };

  const handleThird = event => {
    setThree(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <TextInput placeholder="Text Input" value={one} onChange={handleFirst} className={styles.spacing} />
      <br />
      <TextInput
        placeholder="Text Input"
        helperText="some helper text"
        value={two}
        onChange={handleSecond}
        className={styles.spacing}
      />
      <br />
      <TextInput
        placeholder="Uh oh"
        helperText="an error"
        error={true}
        value={three}
        onChange={handleThird}
        className={styles.spacing}
      />
      <br />
      <TextInput
        placeholder="Disabled Text Input"
        helperText="you can't type"
        disabled={true}
        className={styles.spacing}
      />
      <br />
      <TextInput placeholder="Text Input" readOnly={true} value="read-only value" className={styles.spacing} />
      <br />
      <TextInput
        readOnly={true}
        ReadOnlyComponent="div"
        readOnlyComponentProps={{ className: "example-classname", style: { color: "red", fontSize: "32px" } }}
        placeholder="Text Field"
        value="read-only value"
        className={styles.spacing}
      />
    </div>
  );
};

<ExampleWrapper>
  <TextInputExample />
</ExampleWrapper>;
```
