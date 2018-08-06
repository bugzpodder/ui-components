// @flow
import "jest-dom/extend-expect";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import React from "react";
import {
  DATETIME_SEARCH_TYPE,
  DATE_SEARCH_TYPE,
  LIKE_TEXT_SEARCH_TYPE,
  MULTI_FIELD_TEXT_SEARCH_TYPE,
} from "@grail/lib";
import { OmniSearchBar } from "./index";
import { TestWrapper } from "../utils";
import { fireEvent, render } from "react-testing-library";

const searchDefs: SearchDefs = [
  {
    id: "part",
    name: "Part Number",
    type: LIKE_TEXT_SEARCH_TYPE,
    description: "e.g. G0000",
  },
  {
    id: "lotNumber",
    name: "Lot Number",
    type: MULTI_FIELD_TEXT_SEARCH_TYPE,
    aliases: new Set(["lot"]),
    description: "Lot Num/External Ref",
    searchFields: ["lotNumber", "externalReference"],
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
  it("renders properly", () => {
    expect(getByPlaceholderText("Search part number here or use dropdown")).toBeInTheDOM();
    expect(container).toMatchSnapshot();
  });
  it("doesn't render dropdown or clickaway", () => {
    expect(container.querySelector("#omni-clickaway")).toBeNull();
    expect(container.querySelector("#omni-dropdown")).toBeNull();
  });
  it("opens and closes dropdown & clickaway when toggled", () => {
    let clickaway = container.querySelector("#omni-clickaway");
    let dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).not.toBeInTheDOM();
    expect(dropdown).not.toBeInTheDOM();
    fireEvent.click(getByTestId("menu-test"));
    clickaway = container.querySelector("#omni-clickaway");
    dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).toBeInTheDOM();
    expect(dropdown).toBeInTheDOM();
    expect(getByPlaceholderText("e.g. G0000")).toBeInTheDOM();
    fireEvent.click(clickaway);
    clickaway = container.querySelector("#omni-clickaway");
    dropdown = container.querySelector("#omni-dropdown");
    expect(clickaway).not.toBeInTheDOM();
    expect(dropdown).not.toBeInTheDOM();
    fireEvent.click(getByTestId("menu-test"));
    expect(dropdown).not.toBeInTheDOM();
  });
});
