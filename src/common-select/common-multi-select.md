## Example

### Default

```js
import { Fragment, useState } from "react";
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import { CommonMultiSelect } from "./";

const SelectExample = () => {
  const [values, setValues] = useState([]);
  return (
    <Fragment>
      <CommonMultiSelect
        data-testid="countries-chooser"
        helperText="Choose a country"
        values={values}
        options={COUNTRIES}
        onChange={setValues}
      />
      <ExampleBlock strongHeader="state " content={values} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Creatable

```js
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import { Fragment, useState } from "react";
import { CommonMultiSelect } from "./";

const SelectExample = () => {
  const [values, setValues] = useState([]);

  return (
    <Fragment>
      <CommonMultiSelect
        selectType="creatable"
        helperText="Create or choose"
        createMessage={inputValue => `Invent a new country called "${inputValue}"`}
        options={COUNTRIES}
        values={values}
        onChange={setValues}
      />
      <ExampleBlock strongHeader="state " content={values} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Asynchronous

```js
import { Fragment, useEffect, useState } from "react";
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import { CommonMultiSelect } from "./";

const SelectExample = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setTimeout(() => setValues(COUNTRIES.slice(4, 7)), 1200);
  }, []);

  const filterCOUNTRIES = inputValue => {
    return new Promise(resolve => {
      const newCOUNTRIES = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      ).slice(0, 5);
      setTimeout(() => resolve(newCOUNTRIES), 500);
    });
  };

  return (
    <Fragment>
      <CommonMultiSelect
        isFullWidth
        helperText="Choose a country"
        selectType="async"
        values={values}
        initialOptions={COUNTRIES.slice(5, 10)}
        initialMessage="Think of a country between A and B..."
        loadOptions={filterCOUNTRIES}
        onChange={setValues}
      />
      <ExampleBlock strongHeader="state " content={values} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Custom

```js
import { useState } from "react";
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import Chip from "@material-ui/core/Chip";
import styles from "../test-utils/example-styles.module.scss";
import { CommonMultiSelect } from "./";

const SelectExample = () => {
  const [values, setValues] = useState([]);

  return (
    <div className={styles.selectContainer}>
      <CommonMultiSelect
        id="countries-select"
        label="Countries"
        variant="outlined"
        classes={{
          root: styles.commonSelect,
        }}
        isFullWidth
        helperText="Choose a country"
        values={values}
        options={COUNTRIES.map(country => ({
          ...country,
          info: ["country", "place", "region"],
        }))}
        onChange={setValues}
        formatOption={item => (
          <div>
            <span>{item.label}</span>
            <div>
              {item.info.map(info => (
                <Chip label={info} />
              ))}
            </div>
          </div>
        )}
      />
      <ExampleBlock strongHeader="state " content={values} />
    </div>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```
