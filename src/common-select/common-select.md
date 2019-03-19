## Example

### Default

```js
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const { Fragment, useState } = require("react");

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <Fragment>
      <CommonSelect helpertext="Choose a country" value={value} options={COUNTRIES} onChange={setValue} />
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
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const { Fragment, useState } = require("react");

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <Fragment>
      <CommonSelect
        isFullWidth
        selectType="creatable"
        helpertext="Create or choose"
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
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const { Fragment, useState } = require("react");

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
        helpertext="Choose a country"
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
const { ExampleBlock, ExampleWrapper, COUNTRIES } = require("../test-utils");
const Chip = require("@material-ui/core/Chip").default;
const { useState } = require("react");
const styles = require("../test-utils/example-styles.module.scss");

const SelectExample = () => {
  const [value, setValue] = useState({});
  return (
    <div className={styles.selectContainer}>
      <CommonSelect
        classes={{
          root: styles.commonSelect,
        }}
        isFullWidth
        helpertext="Choose a country"
        value={value}
        options={COUNTRIES.map(country => ({ ...country, info: ["country", "place", "region"] }))}
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
