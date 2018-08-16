// @flow
export const COUNTRIES: Array<Object> = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
].map(suggestion => ({
  label: suggestion.label,
  value: suggestion.label.toUpperCase().replace(" ", "_"),
}));

export const SERGEY =
  "https://media.licdn.com/dms/image/C5603AQGlBIPst1V4Ew/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=2V2knyEhbTrhRWzgydsXLZqiX8gnoD1poj8jGeFpA0w";
