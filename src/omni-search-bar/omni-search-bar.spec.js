// @flow
import "jest-dom/extend-expect";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import React from "react";
import keycode from "keycode";
import {
  DATETIME_SEARCH_TYPE,
  DATE_SEARCH_TYPE,
  LIKE_TEXT_SEARCH_TYPE,
  MULTI_FIELD_TEXT_SEARCH_TYPE,
} from "@grail/lib";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { OmniSearchBar } from "./index";
import { TestWrapper } from "../utils";
import { fireEvent, render } from "react-testing-library";

const searchDefs: SearchDefs = [
  {
    id: "part",
    name: "Part Number",
    type: LIKE_TEXT_SEARCH_TYPE,
    description: "e.g. G0000",
    searchFields: ["part"],
  },
  {
    id: "lotNumber",
    name: "Lot Number",
    type: MULTI_FIELD_TEXT_SEARCH_TYPE,
    aliases: ["lot"],
    description: "Lot Num/Vendor Lot Num",
    searchFields: ["lotNumber", "vendorLotNumber"],
  },
  {
    name: "Received Date",
    type: DATETIME_SEARCH_TYPE,
    searchFields: ["receivedDate"],
  },
  {
    name: "Expiration Date",
    type: DATE_SEARCH_TYPE,
    searchFields: ["expirationDate"],
  },
];

describe("OmniSearchBar", () => {
  const onSearch = jest.fn();
  const { getByPlaceholderText, container, getByTestId } = render(
    <TestWrapper>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <OmniSearchBar
          searchDefs={searchDefs}
          setSearchOptions={onSearch}
        >
          This is a test
        </OmniSearchBar>
      </MuiPickersUtilsProvider>
    </TestWrapper>,
  );
  const omniField = getByPlaceholderText("Search here or use dropdown");
  it("renders properly", () => {
    expect(getByPlaceholderText("Search here or use dropdown")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("doesn't render dropdown or clickaway", () => {
    expect(container.querySelector("#omni-clickaway")).toBeNull();
    expect(container.querySelector("#omni-dropdown")).toBeNull();
  });
  it("opens and closes dropdown & clickaway when toggled", () => {
    let clickaway = container.querySelector("#omni-clickaway");
    let dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).not.toBeInTheDocument();
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.click(getByTestId("search-options-expander"));
    clickaway = container.querySelector("#omni-clickaway");
    dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(getByPlaceholderText("e.g. G0000")).toBeInTheDocument();
    fireEvent.click(clickaway);
    clickaway = container.querySelector("#omni-clickaway");
    dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).not.toBeInTheDocument();
    expect(dropdown).not.toBeInTheDocument();
  });
  it("opens and closes dropdown when clicking expander", () => {
    let dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.click(getByTestId("search-options-expander"));
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(getByTestId("search-options-expander"));
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
  it("opens and closes dropdown when typing up/down arrows", () => {
    let dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.keyDown(omniField, { keyCode: keycode("Down") });
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.keyDown(omniField, { keyCode: keycode("Up") });
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
  it("opens dropdown when focusing", () => {
    let dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.focus(omniField);
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(getByTestId("search-options-expander"));
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
  it("opens and closes dropdown when focusing/entering", () => {
    let dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.focus(omniField);
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.keyDown(omniField, { keyCode: keycode("Enter") });
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
  it("opens dropdown when focusing, leaving open when clicking in dropdown", () => {
    let dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).not.toBeInTheDocument();
    fireEvent.focus(omniField);
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);
    dropdown = container.querySelector("#omni-dropdown");
    expect(dropdown).toBeInTheDocument();
  });
});
