React components built using [Material-UI](https://material-ui.com/getting-started/installation/) for GRAIL's internal applications.

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

Discuss questions, feature requests, or bug reports on the `#ui-eng` slack channel, or email the `ui-eng` mailing list.

#### **Building New Components**

Add/maintain new components to `$GRAIL/ui/components/src/dev` until they are thoroughly tested and approved
for production.
Update `styleguide.config.js` to add the V2 component.
Update `$GRAIL/ui/lims/client/cypress/integration/styleguide` to add the new component.

#### **Building V2 Components**

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

#### **Releasing**

```bash
cd $GRAIL/ui/lib
yarn build # follow instructions from the prompt
cd $GRAIL/ui/components
yarn build # follow instructions from the prompt
```
