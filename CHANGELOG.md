## 2.0.0

1. (BREAKING) Replace internal implementation of CommonSelect, CommonMultiSelect and CommonSuggest with Autocomplete. Upgrade dependency @material-ui/core >= 4.6.0.
2. (BREAKING) wrapPickerUtilProvider calls must pass in a @date-io/moment or @date-io/date-fns utils.
3. (BREAKING) Deprecate `getInitialValues` and related functionality in `OmniSearchBar`.
4. (BREAKING) Removed legacy value from OmniSearch search values.
5. (BREAKING) Deprecated ExportTableButton.
6. (BREAKING) Deprecated Alert. Use Alert from `@material-ui/lab` instead.
7. (BREAKING) Removed deprecated className prop from CommonCard.
8. (BREAKING) Remove deprecated Navbar and renamed NavbarV2 to Navbar.

## 1.1.0 - 2019-##-

1. Add back old date picker for backward compatibility.
2. Support `variant` for `CommonSelect`/`CommonMultiSelect`.
3. Allow styling of `DateInput`/`TimeInput` to be more customizable.
4. Support `margin` for `CommonSelect`/`CommonMultiSelect`.
5. Add `isWide` prop to `LargeSimpleTable`, which allows columns to scroll horizontally rather than
   squeezing all columns into the viewable area.
6. Add `isIconButton` to `LinkButton`.
7. Add `isLoading` to `TimelineCard`.
8. Fix major bug with the aforementioned `isLoading` prop that broke all existing `TimelineCard`s.
9. Add `ExternalDomains` type as Map or Object type.
10. Make `Navbar` and `Sidebar`s `externalDomains` optional, defaulting to dev mode Object.
11. Add `actions` to `CommonSuggest`.
12. Add accessibility text to logos. Include terms of service for GRAIL logo.
13. Change `noOptionsMessage` for `CommonMultiSelect` when a user attempts to create a duplicate value.
14. Add `sortAccessor` to `PagedTableColumn` which takes precedence over `accessor` to get passed to `onSort`.
15. Columns on `PagedTable`s that are not sortable no longer are clickable.
16. Add `CommonDropdownMenu` component.
17. Upgrade packages.
18. Add `isLoading` to `CommonPage`, and Loading Spinner when true.
19. Moved `GrailLogo` and `backgroundImage` (used for `SignInPage`) to new package `@grail/common-private`.
    When upgrading, you will need to specify `logo` and `backgroundImage` to `NavBar` and `SignInPage` as appropriate.
20. Send `{ isUserSearchAction: true }` when a user changes a value in `OmniSearchBar`.
21. Add static footer to `PagedTable` for non-paginated tables, showing number of records.
22. Add secondary actions button to `CommonCard`.
23. Add some flexibility to `CommonDropdownMenu`, namely the ability to define anchor and transform origins and styling
    parameters.
24. Add `isLoading` to `CommonSelect` and `CommonMultiSelect`, which adds an indefinite loading bar beneath the select when true.
25. Remove default sidebar content and external domains. Should specify explicit content, such as from `@grail/common-private`.
26. Add `TextInputV2` component.
27. Add `totalCount` parameter to `tableOptions` prop for `PagedTable`. This allows the display of the total number of results in table if it is known.
28. Fix bug related to table pagination. For example when showing element 61 to 70 and user changes count per row to 25 per page, we now will show elements 51 to 75.
29. Rename package to `@grailbio/components`, publish to github and npm.
30. Fix bug to pass down onFocus and onBlur props in `TextInputV2` component.
31. Update /dist folder to fix import errors.
32. Allow rows to be inverted in `SelectionGrid`.
33. Add ability to disable tabs on `CommonTabbedPageV2`.
34. Fix bug where observer call exceeding limit in `CommonTabbedPageV2`.
35. Fix `ExportButton` to take a className.
36. Fix `ExternalLinkButton` styling not to highlight like a link
37. Fix `CommonPageV2` where secondary actions were not rendering in disabled state.
38. Add optional `href` prop to actions in `CommonDropdownMenu`.
39. Make title larger in `CommonPageV2`.
40. Support `isVisible` parameter on page configs in `CommonTabbedPageV2`.
41. Add `hasColumnVisibilityChooser` prop to `SimpleTable` and `PagedTable` which, if enabled, allows user to select
    which columns should be shown/hidden.
42. Make LargeSimpleTable sortable.
43. Add `autosizeHeight` prop to `LargeSimpleTable`.
44. Add optional `subheader` prop to SignInPage.
45. `AvatarIcon` now accepts `children`.
46. Fix margins on `ExportButton`, `NotificationCard`, and the "back" button in `CommonDialog`s.
47. Add support for date-fns library for Date/Time pickers.
48. Add PDFViewer Component.
49. Simple / Paged tables can force headers to inline as opposed to wrap text.
50. Simple / Paged tables support adding padding-left to non-selectable tables.
51. Simple / Paged tables have standardized header height.
52. Add pollyfill to TabbedPageV2 for ResizeObserver.

## 1.0.0 - 2019-06-17

1. Bug fixes and improved unit tests.
2. Update react peer dependency to 16.8 for hooks usage.
3. Update to Material-UI and Material-UI date-picker to 4.0.0
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
18. Add `rowHeight` prop to `LargeSimpleTable`. Row height for the table
    rows default to 50px. `rowHeight` can either be a number or function.
19. Set default row width for `LargeSimpleTable` to 100px. This change allows a more comprehensive
    snapshot testing of the rendered table.
20. Update `CommonTabbedPage` classes and tab styling.
21. Update `breakpoints.scss` to use material-ui breakpoint values. Previously they were using bootstrap ones.
22. Introduce new `NavbarV2`, a slimmer version of the original Navbar. Tag `Navbar` as a soon-to-be-deprecated component.
23. Convert `OmniDropdown` to `OmniDialog` to correctly handle scroll.
24. Add `LinkButton` component and use it in `CommonPage`. As part of this, add `react-router-dom` as a peer dependency.
25. Add `shadeOnHover` prop to `SimpleTable` and `PagedTable` (works only when `onHighlightRow` is defined). Enables
    rows to be highlighted when hovered over.
26. Introduce CommonPageV2 and CommonTabbedPageV2 which are slimmer versions of the original CommonPage and CommonTabbedPage.
27. Add `common.scss` styles for bold purple links, etc.
28. Update `primary` colors for Material components, and default plain button color.
29. Increase button weight.
30. Replaces `ExportTableButton` with `ExportButton` which has a slightly different signature and shows
    a modal to give user options (e.g. CSV/TSV) before downloading. Mark `ExportTableButton` as deprecated (although in
    the meantime it just wraps `ExportButton`).
31. Update `PagedTable` to use new `ExportButton`.
32. Rename `PagedTable` prop from `includeExportAsCsvButton` to `includeExportButton`.
33. Add `fetchBulkExportRows` prop to PagedTable to specify bulk data to be exported when using the Export button.
34. Support input labels for `CommonSelect`/`CommonMultiSelect`.
35. Increase `padding-left` for the first column of full-bleed tables.
36. Update buggy CSS media query for `CommonDialog` and get rid of unused size CSS classes.
37. Add header option to `TwoColumnGrid`.

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
