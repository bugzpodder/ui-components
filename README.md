# @grail/components

## Contents

The `@grail/components` module holds common React components that are used between GRAIL applications

Components can be generally imported from `@grail/components/components`, or they can be imported from specific
folders for leaner builds (ie. `@grail/components/components/date`).

## Contributing

**ALL COMMON COMPONENTS MUST INCLUDE UNIT TESTS**

When introducing new components, all directories should include an `index.js`, which exports to the
`index.js` of the `components` directory.

`flow-typed` files should be included as needed and categorized between ones
written for npm packages, and ones written for GRAIL's custom React components.
