## 0.7.0 - 2018-10-24

1.  Bug Fixes
2.  Improve testing
3.  Update `PagedTable` and `CommonTable`: scroll only the table body and limit the max-height
4.  Allow for highlighting of table rows in PagedTable and SimpleTable
5.  Add chips to `PagedTable` header to indicate searched fields
6.  Adjust `PagedTable` and `SimpleTable` to make scrolling more obvious. 
7.  Allow custom date formats for `DateInput` and `DateTimeInput`
8.  Convert Omni-bar field to act more like Omni search.
    The first search field will act as global search (only if its type is `OMNI_TEXT_SEARCH_TYPE`).
    This maintains backward compatibility. Ideally, we can require an omni field definition.
9.  Create New `CommonTimelineGraph` and `TimelineCard` components, which uses Material-UI components rather than SVGs, allowing for
    more customization.
10. Add classes object to some components that didn't have it before, such as `CommonPanel` and `TwoColumnGrid`
11. Make `CommonDialog` scrollable


## 0.6.0 - 2018-08-15

`CommonTypeahead` will soon be deprecated for `CommonSelect`. `CommonSelect` supports all of the same features
as `CommonTypeahead`.

1.  Added `AvatarIcon`.
2.  Added `TabbedCard`.
3.  Refactor `CommonTypeahead` to be entirely controlled.
4.  `TwoColumnGrid` rows objects now take other key-values.
5.  Pass `...otherProps` to common components.
6.  Support multi-select for async select type.
7.  Support multi-select for creatable select type.
8.  Support custom content for suggestion items (`formatOption`).
9.  Support loading initial values into async select type.
10. Add option to disable selectAll in CommonTable.

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
