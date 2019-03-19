### Example

```js
const { ExampleWrapper, GRAIL } = require("../test-utils");
const Button = require("@material-ui/core/Button").default;
const Typography = require("@material-ui/core/Typography").default;
const styles = require("../test-utils/example-styles.module.scss");
const { useState } = require("react");

const AvatarExample = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSergeyOpen, setIsSergeyOpen] = useState(false);
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
      variant: "contained",
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
      <Typography className={styles.inLine} variant="h6">
        Default
      </Typography>
      <AvatarIcon className={styles.inLine} menuItems={menuItems} isMenuOpen={isMenuOpen} onClick={setIsMenuOpen} />

      <Typography className={styles.inLine} variant="h6">
        With Picture
      </Typography>
      <AvatarIcon
        className={styles.inLine}
        pictureUrl={GRAIL}
        menuItems={menuItems}
        isMenuOpen={isSergeyOpen}
        onClick={setIsSergeyOpen}
      />

      <Typography className={styles.inLine} variant="h6">
        No Menu
      </Typography>
      <AvatarIcon
        className={styles.inLine}
        pictureUrl="https://grail.com/wp-content/uploads/2016/12/cropped-final-favicon.png"
      />
    </div>
  );
};

<ExampleWrapper>
  <AvatarExample />
</ExampleWrapper>;
```
