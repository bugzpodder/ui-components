### Example

```js
import { ExampleBlock, ExampleWrapper } from "../test-utils";
import styles from "../test-utils/example-styles.module.scss";
import { useState } from "react";
import { CommonSwitch } from "./";

const TestCommonSwitch = () => {
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [showError, setShowError] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (checked, val) => {
    const value = checked ? val : "";
    if (val === "first") {
      setCheckedA(checked);
      setCheckedB(false);
      setValue(value);
    } else {
      setCheckedA(false);
      setCheckedB(checked);
      setValue(value);
    }
  };

  return (
    <div className={styles.container}>
      <CommonSwitch label="Primary" onChange={() => {}} />

      <CommonSwitch label="Secondary" color="secondary" value="secondary" onChange={() => {}} />

      <CommonSwitch
        label="Error"
        value="error"
        showError={showError}
        helperText="some helper text"
        onChange={setShowError}
      />

      <CommonSwitch className={styles.spacing} label="Disabled" isEnabled={false} onChange={setShowError} />
      <br />

      <CommonSwitch color="primary" value="first" isSelected={checkedA} onChange={handleChange} />

      <CommonSwitch value="second" isSelected={checkedB} onChange={handleChange} />

      <ExampleBlock strongHeader="Switch value" content={value} />
    </div>
  );
};

<ExampleWrapper>
  <TestCommonSwitch />
</ExampleWrapper>;
```
