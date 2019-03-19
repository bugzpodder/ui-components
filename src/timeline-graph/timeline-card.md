### Simple TimelineCard

```js
const { ADAMS_DATA, ExampleWrapper } = require("../test-utils");

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
const { ExampleBlock, ExampleWrapper, ADAMS_DATA } = require("../test-utils");
const { useState } = require("react");

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
