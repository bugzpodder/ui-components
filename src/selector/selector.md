### Example

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const styles = require("../utils/example-styles.module.scss");

class TestCommonSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const data = [
      {
        key: "lims",
        text: "LIMS",
      },
      {
        key: "team",
        text: "Team",
      },
      {
        key: "is",
        text: "Is",
      },
      {
        key: "best",
        text: "Best",
      },
      {
        key: "team",
        text: "Team!",
      },
    ];
    return (
      <div className={styles.container}>
        <Selector data={data} onSelect={this.handleChange} value={this.state.value} className={styles.spacing} />
        <Selector
          value="error"
          data={[{ key: "error", text: "An Error!" }]}
          showError={true}
          helperText="some helper text"
        />
        <Selector
          value="disabled"
          data={[{ key: "disabled", text: "Disabled" }]}
          disabled={true}
          className={styles.spacing}
        />
        <ExampleBlock strongHeader="Selector value" content={this.state.value} />
      </div>
    );
  }
}

<ExampleWrapper>
  <TestCommonSwitch />
</ExampleWrapper>;
```
