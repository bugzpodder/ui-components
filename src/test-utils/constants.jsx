// @flow
import React from "react";
import { EDC, PIPELINE } from "@grail/lib";

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

export const GRAIL = "https://grail.com/wp-content/uploads/2016/12/cropped-final-favicon-32x32.png";

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

export const LARGE_EXAMPLE_TABLE_DATA = [];
for (let i = 0; i < 1000; i++) {
  // Create about 17,000 records.
  LARGE_EXAMPLE_TABLE_DATA.push(...EXAMPLE_TABLE_DATA);
}

export const EXTRA_LARGE_EXAMPLE_TABLE_DATA = [];
for (let i = 0; i < 100; i++) {
  // Create about 1,700,000 records
  EXTRA_LARGE_EXAMPLE_TABLE_DATA.push(...LARGE_EXAMPLE_TABLE_DATA);
}

export const ADAMS_DATA = [
  {
    date: "1848-02-23T16:20:00Z",
    content: <div>John Quincy Adams dies.</div>,
  },
  {
    date: "1818-04-10T12:00:00Z",
    content: (
      <div>
        John Quincy Adams tries to dig to the middle of the Earth to conduct trade with the people living there.
      </div>
    ),
  },
  {
    date: "1767-07-11T12:20:00Z",
    content: <div>John Quincy Adams is born.</div>,
  },
];

export const EMU_DATA = [
  {
    date: "1932-12-10T16:20:00Z",
    content: <div>War ends and is declared a victory for the emus.</div>,
  },
  {
    date: "1932-11-08T12:00:00Z",
    content: <div>Over 2500 rounds had been fired with the media claiming that only a few emus had been killed.</div>,
  },
  {
    date: "1932-11-02T12:20:00Z",
    content: <div>Sir George Pearce wages war on the local population of emus in Australia.</div>,
  },
];

export const ALPHABET_ANIMALS_DATA: Array<Array<?string>> = [
  ["alligator", "bat", "cat", "dog", "elephant", "fox"],
  ["goat", "horse", "iguana", "jaguar", "kangaroo", "lion"],
  ["monkey", "narwhal", "octopus", "penguin", "quail", "raccoon"],
  ["seal", "tiger", "umbrella bird", "vulture", "whale", "x-ray tetra"],
  ["yak", "zebra", null, null, null, null],
];

export const TEST_EXTERNAL_DOMAINS: Map<string, string> = new Map().set(EDC, "edc.com").set(PIPELINE, "pipeline.com");
