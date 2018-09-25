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

export const EXAMPLE_TABLE_DATA = [
  { word: "Argle-bargle", origin: "Britain" },
  { word: "Dwaal", origin: "South Africa" },
  { word: "Floccinaucinihilipilification", origin: "General English" },
  { word: "Lollygag", origin: "North American" },
  { word: "Mouse Potato", origin: "General English" },
  { word: "Ogdoad", origin: "General English" },
  { word: "Sesquipedalian", origin: "General English" },
  { word: "Flibbertigibbet", origin: "Britain" },
  { word: "Curmudgeon", origin: "N/A" },
  { word: "Nudiustertian", origin: "Latin" },
  { word: "Tittynope", origin: "General English" },
  { word: "Pauciloquent", origin: "Britain" },
  { word: "Pneumonoultramicroscopicsilicovolcanoconiosis", origin: "General English" },
  { word: "Bijoux", origin: "Archaic" },
  { word: "Fartlek", origin: "Swedish" },
  { word: "Cruciverbalist", origin: "General English" },
  { word: "Erinaceous", origin: "General English" },
];
