### Props

All the props of `TextField` are included for `TextInput`.

### Example

```js
<TextInput placeholder="Text Field" value="value" />
```

```js
<TextInput readOnly={true} placeholder="Text Field" value="read-only value" />
```

```js
<TextInput
	readOnly={true}
	ReadOnlyComponent="div"
	readOnlyComponentProps={{ className: "example-classname", style: { color: "red", fontSize: "32px" } }}
	placeholder="Text Field"
	value="read-only value"
/>
```
