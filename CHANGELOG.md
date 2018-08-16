## 0.6.0 - 2018-08-15

1.  Added `AvatarIcon`.
2.  Added `TabbedCard`.
3.  Refactor `CommonTypeahead` to be entirely controlled.
4.  `TwoColumnGrid` rows objects now take other key-values.
5.  Pass `...otherProps` to common components

`CommonTypeahead` will soon be deprecated for `CommonSelect`. `CommonSelect` supports all of the same features
as `CommonTypeahead`, with the following added in v.0.7.0:

1.  Support multi-select for async select type
2.  Support multi-select for creatable select type
3.  Support custom content for suggestion items (`formatOption`)
4.  Support loading initial values into async select type

## 0.5.0 - 2018-07-31

1.  Fix pipeline navigation links.
2.  Standardized onChange behavior for CommonTypeahead.

## 0.4.0 - 2018-07-27

1.  Upgraded CommonTypeahead to use react-select 2.0.
2.  Revamped asyc CommonTypeahead API.
3.  Pinned DatePicker to use material-ui-pickers 1.0.0-rc.11 due to babel issue.
4.  Added notification center.
5.  Add number of selected items to table header.

## 0.3.0 - 2018-07-17

1.  Add `classes` prop to `CommonCard` and `CommonDialog`.
2.  Add error handling to `Selector`.
3.  Refactor `CommonTypeahead` (src/dev).
4.  Add `MultiPageDialog`.
5.  Add `CommonSwitch`.
6.  Fix `DateInput` and `DateTimeInput` bugs.
7.  Fix `Navbar` logo.

## 0.2.0 - 2018-06-22

1.  Use @babel/plugin-transform-runtime.
2.  Renamed package to @grail/components.

## 0.1.0 - 2018-06-20

1.Initial release!
