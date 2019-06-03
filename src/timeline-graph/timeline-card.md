### Simple TimelineCard

```js
import { ADAMS_DATA, ExampleWrapper } from "../test-utils";
import { TimelineCard } from "./";
<ExampleWrapper>
  <TimelineCard
    rows={ADAMS_DATA}
    commonCardProps={{
      title: "America 101",
      subheader: "The life of John Quincy Adams.",
    }}
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

### Selectable TimelineCard (with Time)

```js
import { ExampleBlock, ExampleWrapper, ADAMS_DATA } from "../test-utils";
import { useState } from "react";
import { TimelineCard } from "./";

const ExampleTimelineCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div>
      <TimelineCard
        isTimeVisible
        onSelect={setSelectedItem}
        selectedItem={selectedItem}
        rows={ADAMS_DATA}
        classes={{
          root: "timelinecard-root-class",
          commonCard: {
            title: "timelinecard-title-class",
            subheader: "timelinecard-subheader-class",
          },
        }}
      />
      <ExampleBlock strongHeader="State " content={selectedItem} />
    </div>
  );
};

<ExampleWrapper>
  <ExampleTimelineCard />
</ExampleWrapper>;
```
