## 1.0.0 - 2019-##-

1. Bug fixes and improved unit tests.
2. Update react peer dependency to 16.8 for hooks usage.
3. Update to Material-UI 3.9.3
4. Fix sidebar to grow and shrink using flex-grow/shrink.
5. Add `isFullBleed` to `PagedTable` to allow for non-card based paged table that expands to 100% of the height of the parent element.
6. Add `hasTableMargin` to `PagedTable` to enable/disable table margin.
7. Add `DateValue`, `DateTimeValue`, and `HumanizedDateTime`.
8. Standardize CommonPage-based components subtitle size.
9. `CommonPage` now takes `children`, allowing shared components to be held or displayed across pages.
10. `CommonTabbedPage` tabs now take a `tabClasses` prop to specify classes for each individual tab.
11. `CommonTabbedPage` now has `SpinnerOverlay` built-in. If `isLoading` is provided and true, the overlay will be displayed over
    the page content.
12. `CommonTypeahead` removed from dev components.
13. Add `SelectionGrid`.
14. `CollapsableList` is now identified as a specific component of NavBar.
15. `NavBar` sidebar does not support placeholders anymore.
16. Update `CommonDialog` and `CommonMultiPageDialog` to use `body` scrolling by default, and correct style to match latest Material UI.
    Delete unneeded `enableOverflow`.
17. Update CSS of `TwoColumnGrid` so that padding doesn't obscure clickable areas.

## 0.10.0 - 2019-04-01

1. `TabbedTimelineCard` tabs are now fixed at the top of the card.
2. Fix timeline card styling to properly handle custom heights.
3. Timelines now support displaying the day of the week (Mon Tue Wed)
4. TabbedTimelineCard now takes objects for each key which specify content,
   isTimeVisible, and isDayVisible
5. Refactor to use new Api search types like `SearchOptionsV2`. See D24185
6. Add `LargeSimpleTable` to render lots (100-millions) of rows of
   tabular data, performantly. Similar signature to `SimpleTable`.
7. Make very minor adjustment to padding of `SimpleTable` checkboxes.
8. Ensure that `CommonSelect` logs exceptions in `loadOptions` callback.
9. Add `Clear` button to `CommonSuggest` and remove button padding.
10. Add max-height and overflow to `CommonSuggest` popdown.
11. Move value suggest logic to common lib.
12. Deprecate `Selector` component.
13. Add Export to CSV button in `PagedTable`. Can be disabled by passing includeExportAsCsvButton={false}.
14. Add `ExportTableButton` which exports a CSV containing any generic data that is passed into it.
15. Add `UploadButton` component to handle file uploads through a Button component.
16. Add file utils to extract content from uploaded files.
17. Un-export components that are used internally for testing (e.g. ExampleBlock, TestWrapper, ExampleWrapper).

## 0.9.0 - 2019-01-17

1. Add a hidden element to `Sidebar` to collapse all content. This allows tests to consistently control the sidebar state.
2. Dialog buttons are now `variant="text"` when disabled.
3. Added more options for `PagedTable` pagination numbers.
4. Add ability to use custom `Component`s in `CommonPage` headeractions.
5. Add `TabbedTimelineCard`.
6. Add `isClearable` to `CommonSelect`
7. Allow the user to choose falsey values for `CommonSelect`.
8. Cleanup Flow types.
9. Include flow definitions in build.
10. Bug fixes.
11. Test updates.
12. Styleguidist updates.
13. When rendering an omnibar on page that has been searched before, restore the last used search values. See T14858

## 0.8.0 - 2018-11-07

1. Deprecate old TimelineGraph component.
2. Rename `CommonTimelineGraph` to `TimelineGraph`.
3. Fix TimelineGraph bug where width of content did not match the width
   of the card, displaying the username in different places along the
   timeline graph.
4. Add `OmniChip` component, and communication mechanism for `OmniSearchBar`.
5. No longer open omni dropdown on focus or click.
6. `OmniSearchBar` localStorage now includes `omni-` prefix.
7. If omni search values don't change, don't trigger a search request.
8. Add `CommonPage` which provides a skeleton for a page with a title, subtitle, and optional side menu (with links to
   anchors on the page).
9. Add `CommonTabbedPage` which extends `CommonPage` to allow for tabs.
10. Add classes object to `Alert` component to allow more custom styling.
11. For `CommonDialog`, changed color of "Close" button to "primary"
12. Add `CommonSuggest`, development implementation of a free form text input with suggestions. (Dev)
13. Add read-only functionality to `CommonSelect`.

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
