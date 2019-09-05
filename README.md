## Contents

React components built using [Material-UI](https://material-ui.com/getting-started/installation/) for GRAIL's internal applications.

## Contributing

This project is open sourced. All content must be non-proprietary. For example:

- Do not include GRAIL assets, like GRAIL Logo, or commercially sourced images.
- Do not include content that has trade secrets or anything that should remain internal to GRAIL.

For common private GRAIL code, use `@grail/common-private` or other internal locations.

Modify CHANGELOG.md to reflect contributions to this code.

### Distributing to GitHub

URL: https://github.com/grailbio/ui-components

Once code is merged into GRAIL repo - `master` branch, replicate the commit to github.

TODO: Document how to use `grit`, or refer to how it automatically pushes to github using
`$GRAIL/phabricator/shipit/sync.bash`

### Publishing to NPM

URL: https://www.npmjs.com/package/@grailbio/components

You will need to be a member:
https://www.npmjs.com/settings/grailbio/members

Recommend turning on 2FA.

To publish:

- Bump the package version following semantic versioning guidelines (https://semver.org/)
- For non-patch release, update `CHANGELOG.md` version.
- `npm publish --access public`
  - Optionally, you can pass in 2FA code using `--otp ######`

#### **Installation**

- `yarn add react`
- `yarn add @material-ui/core @material-ui/icons @material-ui/styles`
- To use the `DateInput` and `DateTimeInput` components:
  - Wrap your application in the `wrapPickerUtilProvider` component.

###### **GRAIL Theme**

- Wrap your application in the `StyleWrapper` component.

#### **Running StyleGuide**

```bash
cd $GRAIL/ui/components
yarn styleguide
```

#### **Using Released Components**

- `import { COMPONENT } from "@grail/components";`
- See `@grail/lib` for GRAIL utilities and constants. e.g. `import { UTILITY } from "@grail/lib";`

#### **Using Dev Components**

- `import { DEV_COMPONENT } from "../dev";`
  NOTE: Dev components are unstable and may introduce breaking changes at any given time.

#### **Implementing New Components**

Add/maintain new components to `$GRAIL/ui/components/src/dev` until they are thoroughly tested and approved
for production.
Update `styleguide.config.js` to add the V2 component.
Update `$GRAIL/ui/lims/client/cypress/integration/styleguide` to add the new component.

#### **Implementing V2 Components**

To add a V2 version of an existing component, separate the V1 and V2 files into their own folder.
e.g.

```
src/
  some-component/
    index.js /* export v1 and v2 components. */
    v1/
      /* the V1 component jsx, CSS, unit test files. */
    v2/
      /* the V2 component jsx, CSS, unit test files. */
```

Follow the guidelines for building new components for building V2 component.

#### **Production Component Approval Criteria**

- Unit tests.
  - At least 25% line coverage.
- `README.md`
  - Working examples showing all use cases and functionality.
- Component jsx file
  - Comments above each prop explaining the prop.
- Cypress tests for any interactive components.
  - Note: These Cypress tests rely on working examples in the `README`s.

When introducing new code, you must include an `index.js`, which exports to the
`index.js` of the `src` directory.

Include `flow-typed` files as needed and categorized between ones
written for npm packages, and ones written for GRAIL's custom utility functions.

#### **Building**

```bash
yarn build # follow instructions from the prompt
```
