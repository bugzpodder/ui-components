### Example

```js
const ExampleBlock = require("../test-utils").ExampleBlock;
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const styles = require("../test-utils/example-styles.module.scss");

class TestCommonSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: false,
      checkedB: false,
      showError: false,
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError(checked) {
    this.setState({ showError: checked });
  }

  handleChange(checked, val) {
    const value = checked ? val : "";
    if (val === "first") {
      this.setState({ checkedA: checked, checkedB: false, value });
      return;
    }
    this.setState({ checkedA: false, checkedB: checked, value });
  }

  render() {
    const { checkedA, checkedB, showError } = this.state;
    return (
      <div className={styles.container}>
        <CommonSwitch label="Primary" onChange={() => {}} />

        <CommonSwitch label="Secondary" color="secondary" value="secondary" onChange={() => {}} />

        <CommonSwitch
          label="Error"
          value="error"
          showError={showError}
          helperText="some helper text"
          onChange={this.handleError}
        />

        <CommonSwitch className={styles.spacing} label="Disabled" isEnabled={false} onChange={this.handleError} />
        <br />

        <CommonSwitch color="primary" value="first" isSelected={checkedA} onChange={this.handleChange} />

        <CommonSwitch value="second" isSelected={checkedB} onChange={this.handleChange} />

        <ExampleBlock strongHeader="Switch value" content={this.state.value} />
      </div>
    );
  }
}

<ExampleWrapper>
  <TestCommonSwitch />
</ExampleWrapper>;
```
