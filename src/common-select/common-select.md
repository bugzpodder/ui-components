## Example

### Default

```js
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import { Fragment, useState } from "react";
import { CommonSelect } from "./";

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <Fragment>
      <CommonSelect
        data-testid="country-chooser"
        helperText="Choose a country"
        value={value}
        options={COUNTRIES}
        onChange={setValue}
      />
      <ExampleBlock strongHeader="state " content={value} />
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
import { CommonSelect } from "./";

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <Fragment>
      <CommonSelect
        isFullWidth
        selectType="creatable"
        helperText="Create or choose"
        createMessage={inputValue => `Invent a new country called "${inputValue}"`}
        options={COUNTRIES}
        value={value}
        onChange={setValue}
      />
      <ExampleBlock strongHeader="state " content={value} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Asynchronous

```js
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import { Fragment, useState } from "react";
import { CommonSelect } from "./";

const SelectExample = () => {
  const [value, setValue] = useState({});

  const filterCountries = inputValue => {
    return new Promise(resolve => {
      const newCOUNTRIES = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      ).slice(0, 5);
      setTimeout(() => resolve(newCOUNTRIES), 500);
    });
  };

  return (
    <Fragment>
      <CommonSelect
        isFullWidth
        helperText="Choose a country"
        selectType="async"
        initialMessage="Think of a country between A and B..."
        value={value}
        initialOptions={COUNTRIES.slice(5, 10)}
        loadOptions={filterCountries}
        onChange={setValue}
      />
      <ExampleBlock strongHeader="state " content={value} />
    </Fragment>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```

### Custom

```js
import { ExampleBlock, ExampleWrapper, COUNTRIES } from "../test-utils";
import Chip from "@material-ui/core/Chip";
import { useState } from "react";
import styles from "../test-utils/example-styles.module.scss";
import { CommonSelect } from "./";

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <div className={styles.selectContainer}>
      <CommonSelect
        id="country-select"
        label="Country"
        classes={{
          root: styles.commonSelect,
        }}
        variant="filled"
        isFullWidth
        helperText="Choose a country"
        value={value}
        options={COUNTRIES.map(country => ({
          ...country,
          info: ["country", "place", "region"],
        }))}
        onChange={setValue}
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
      <ExampleBlock strongHeader="state " content={value} />
    </div>
  );
};

<ExampleWrapper>
  <SelectExample />
</ExampleWrapper>;
```
