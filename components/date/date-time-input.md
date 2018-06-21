### Example

##### NOTE: To use this component across any app, the app must be wrapped in the `wrapPickerUtilProvider` function imported from `@grail/components/components`;

```js
const DateTimeInputContainer = require("./picker-util-provider-hoc").wrapPickerUtilProvider(DateTimeInput);
<DateTimeInputContainer value="2017-10-03 10:30:00" label="Release Date & Time" />;
```
