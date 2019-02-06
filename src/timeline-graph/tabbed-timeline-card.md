### Tabbed TimelineCard

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ADAMS_DATA = require("@grail/components/utils").ADAMS_DATA;
const EMU_DATA = require("@grail/components/utils").EMU_DATA;
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
