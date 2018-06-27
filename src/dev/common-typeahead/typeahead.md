## Usage

- Typing (or focusing) renders a dropdown of suggestions.
- Tabbing without a specific selection will auto-complete to the first suggestion.
- Tabbing or Entering on a specific selection selects that suggestion.
- Suggestions become scrollable for long lists.

### Example

```js
const suggestions = ["LIMS", "TEAM", "IS", "BEST", "TEAM"];

<CommonTypeahead placeholder="Try it out" renderOnFocus={true} suggestions={suggestions} />;
```
