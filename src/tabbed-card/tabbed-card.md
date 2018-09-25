### Example

#### The margins in the example extend past the example block.

#### This is because negative margins are built-in to account for the commonly-implemented navbar

```js
const Alert = require("@grail/components").Alert;
const ExampleWrapper = require("@grail/components").ExampleWrapper;

class ExampleTabbedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "one",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const tabConfigs = [
      {
        label: "Tab One",
        value: "one",
        content: <Alert color="success" message="Tab One!" />,
      },
      {
        label: "Tab Two",
        value: "two",
        content: <Alert color="warning" message="Tab Two!" />,
      },
    ];
    const headerActions = [
      {
        content: "Button Two",
        color: "primary",
        dataTestId: "header-action-two",
      },
      {
        content: "Button One",
        color: "primary",
        variant: "raised",
        dataTestId: "header-action-one",
      },
    ];
    return (
      <TabbedCard
        title="Example Tabbed Card"
        subheader="This is a subheader"
        classes={{
          root: "main-container",
          tabs: "tabs-container",
        }}
        value={this.state.value}
        onChange={this.onChange}
        headerActions={headerActions}
        tabConfigs={tabConfigs}
      />
    );
  }
}

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```
