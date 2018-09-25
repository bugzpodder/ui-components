### Example

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const SERGEY = require("../utils").SERGEY;
const Button = require("@material-ui/core/Button").default;
const Typography = require("@material-ui/core/Typography").default;
const styles = require("../utils/example-styles.module.scss");

class AvatarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isSergeyOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSergey = this.handleSergey.bind(this);
  }

  handleClick(isMenuOpen) {
    this.setState({ isMenuOpen });
  }

  handleSergey(isSergeyOpen) {
    this.setState({ isSergeyOpen });
  }

  render() {
    const { isMenuOpen, isSergeyOpen } = this.state;
    const menuItems = [
      {
        content: "Lims",
        id: "one",
      },
      {
        content: "Team",
      },
      {
        content: "Is",
        id: "two",
      },
      {
        content: "Best",
        component: Button,
        color: "primary",
        variant: "raised",
      },
      {
        content: "Team",
        onClick: () => console.warn("You know it's true"),
      },
      {
        content: "Just Kidding",
        isVisible: false,
      },
    ];

    return (
      <div className={styles.avatarContainer}>
        <Typography className={styles.inLine} variant="title">
          Default
        </Typography>
        <AvatarIcon
          className={styles.inLine}
          menuItems={menuItems}
          isMenuOpen={isMenuOpen}
          onClick={this.handleClick}
        />

        <Typography className={styles.inLine} variant="title">
          With Picture
        </Typography>
        <AvatarIcon
          className={styles.inLine}
          pictureUrl={SERGEY}
          menuItems={menuItems}
          isMenuOpen={isSergeyOpen}
          onClick={this.handleSergey}
        />

        <Typography className={styles.inLine} variant="title">
          No Menu
        </Typography>
        <AvatarIcon
          className={styles.inLine}
          pictureUrl="https://grail.com/wp-content/uploads/2016/12/cropped-final-favicon.png"
        />
      </div>
    );
  }
}

<ExampleWrapper>
  <AvatarExample />
</ExampleWrapper>;
```
