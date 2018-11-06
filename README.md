React components built using [Material-UI](https://material-ui.com/getting-started/installation/) for GRAIL's internal applications.

#### **Installation**

- `yarn add react`
- `yarn add material-ui`
- To use the `DateInput` and `DateTimeInput` components:
  - `yarn add material-ui-pickers`.
  - Wrap your application in the `wrapPickerUtilProvider` component.

###### **GRAIL Theme**

- Wrap your application in the `StyleWrapper` component.

#### **Running StyleGuidist**

- If you are _not_ doing `cd $GRAIL/ui; yarn start:client`, you will have to manually build `lib` and `components`

```
cd $GRAIL/ui/lib
yarn build:client
cd $GRAIL/ui/components
yarn build:client
yarn start
```

If you make code changes in `lib` or `components`, you will have to re-build.
Alternatively, you can do `yarn start:client &`, instead of `yarn build:client` which will watch for code changes and rebuild.

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

#### **Production Component Approval Criteria**

- Unit tests.
  - At least 25% line coverage.
- `README.md`
  - Working examples showing all use cases and functionality.
- Component jsx file
  - Comments above each prop explaining the prop.
- Cypress tests for any interactive components.
  - Note: These Cypress tests rely on working examples in the `README`s.
