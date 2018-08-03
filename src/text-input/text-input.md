### Props

All the props of `TextField` are included for `TextInput`.

### Example

```js
const styles = require("../utils/example-styles.module.scss");
class TextInputExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: "",
      two: "",
      three: "",
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
    this.handleThird = this.handleThird.bind(this);
  }

  handleFirst(event) {
    this.setState({ one: event.currentTarget.value });
  }

  handleSecond(event) {
    this.setState({ two: event.currentTarget.value });
  }

  handleThird(event) {
    this.setState({ three: event.currentTarget.value });
  }

  render() {
    return (
      <div className={styles.container}>
        <TextInput
          placeholder="Text Input"
          value={this.state.one}
          onChange={this.handleFirst}
          className={styles.spacing}
        />
        <br />
        <TextInput
          placeholder="Text Input"
          helperText="some helper text"
          value={this.state.two}
          onChange={this.handleSecond}
          className={styles.spacing}
        />
        <br />
        <TextInput
          placeholder="Uh oh"
          helperText="an error"
          error={true}
          value={this.state.three}
          onChange={this.handleThird}
          className={styles.spacing}
        />
        <br />
        <TextInput
          placeholder="Disabled Text Input"
          helperText="you can't type"
          disabled={true}
          className={styles.spacing}
        />
        <br />
        <TextInput placeholder="Text Input" readOnly={true} value="read-only value" className={styles.spacing} />
        <br />
        <TextInput
          readOnly={true}
          ReadOnlyComponent="div"
          readOnlyComponentProps={{ className: "example-classname", style: { color: "red", fontSize: "32px" } }}
          placeholder="Text Field"
          value="read-only value"
          className={styles.spacing}
        />
      </div>
    );
  }
}

<TextInputExample />;
```
