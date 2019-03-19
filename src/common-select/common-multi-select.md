## Example

### Default

```js
const { Fragment, useState } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const styles = require("../test-utils/example-styles.module.scss");

const SelectExample = () => {
  const [values, setValues] = useState([]);
  return (
    <Fragment>
      <CommonMultiSelect helpertext="Choose a country" values={values} options={COUNTRIES} onChange={setValues} />
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
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const { Fragment, useState } = require("react");
const styles = require("../test-utils/example-styles.module.scss");

const SelectExample = () => {
  const [values, setValues] = useState([]);

  return (
    <Fragment>
      <CommonMultiSelect
        selectType="creatable"
        helpertext="Create or choose"
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
const { Fragment, useEffect, useState } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const styles = require("../test-utils/example-styles.module.scss");

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
        helpertext="Choose a country"
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
const { useState } = require("react");
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const Chip = require("@material-ui/core/Chip").default;
const styles = require("../test-utils/example-styles.module.scss");

const SelectExample = () => {
  const [values, setValues] = useState([]);

  return (
    <div className={styles.selectContainer}>
      <CommonMultiSelect
        classes={{
          root: styles.commonSelect,
        }}
        isFullWidth
        helpertext="Choose a country"
        values={values}
        options={COUNTRIES.map(country => ({ ...country, info: ["country", "place", "region"] }))}
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
