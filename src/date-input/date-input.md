### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components`;

```js
const DateInputContainer = require("./picker-util-provider-hoc").wrapPickerUtilProvider(DateInput);
<DateInputContainer value="2017-10-03" label="Release Date" />;
```

```js
const DateInputContainer = require("./picker-util-provider-hoc").wrapPickerUtilProvider(DateInput);
<DateInputContainer placeholder="Release Date" />;
```
