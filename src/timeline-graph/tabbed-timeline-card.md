### Tabbed TimelineCard

```js
import { ADAMS_DATA, EMU_DATA, ExampleWrapper } from "../test-utils";
import { TabbedTimelineCard } from "./";
const tabContents = {
  adams: { content: ADAMS_DATA },
  emus: { content: EMU_DATA },
};

<ExampleWrapper>
  <TabbedTimelineCard
    tabContents={tabContents}
    classes={{
      root: "timelinecard-root-class",
      commonCard: {
        title: "timelinecard-title-class",
        subheader: "timelinecard-subheader-class",
      },
    }}
  />
</ExampleWrapper>;
```
