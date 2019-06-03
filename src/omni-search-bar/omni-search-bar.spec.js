// @flow
import "jest-dom/extend-expect";
import MomentUtils from "@date-io/moment";
import React from "react";
import keycode from "keycode";
import { DATETIME_SEARCH_TYPE, DATE_SEARCH_TYPE, LIKE_TEXT_SEARCH_TYPE } from "@grail/lib";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { OmniSearchBar } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const searchDefs: OmniSearchDefs = [
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
    type: LIKE_TEXT_SEARCH_TYPE,
    aliases: ["lot"],
    description: "e.g. L00001 (GRAIL lot number) or ZRC203172 (vendor lot number)",
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

const renderWrapper = () => {
  const onSearch = jest.fn();
  const props = render(
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
  const omniField = props.getByPlaceholderText("Search here or use dropdown");
  return {
    ...props,
    onSearch,
    omniField,
  };
};

describe("OmniSearchBar", () => {
  it("renders properly", () => {
    const { getByPlaceholderText, container } = renderWrapper();
    expect(getByPlaceholderText("Search here or use dropdown")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("doesn't render omniDialog or backdrop", () => {
    const { queryByTestId } = renderWrapper();
    expect(queryByTestId("dialog-backdrop")).toBeNull();
    expect(queryByTestId("omni-dialog")).toBeNull();
  });
  it("opens and closes omniDialog & backdrop when toggled", () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = renderWrapper();
    let backdrop = queryByTestId("dialog-backdrop");
    expect(backdrop).toBeNull();
    expect(queryByTestId("omni-dialog")).toBeNull();
    fireEvent.click(getByTestId("search-options-expander"));
    backdrop = queryByTestId("dialog-backdrop");
    let omniDialog = queryByTestId("omni-dialog");
    expect(backdrop).toBeInTheDocument();
    expect(omniDialog).toBeInTheDocument();
    expect(getByPlaceholderText("e.g. G0000")).toBeInTheDocument();
    fireEvent.click(backdrop);
    backdrop = queryByTestId("dialog-backdrop");
    omniDialog = queryByTestId("omni-dialog");
    expect(backdrop).not.toBeInTheDocument();
    expect(omniDialog).toBeNull();
  });
  it("opens and closes omniDialog when clicking expander", () => {
    const { getByTestId, queryByTestId } = renderWrapper();
    let omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
    fireEvent.click(getByTestId("search-options-expander"));
    omniDialog = getByTestId("omni-dialog");
    expect(omniDialog).toBeInTheDocument();
    fireEvent.click(getByTestId("search-options-expander"));
    omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
  });
  it("opens and closes omniDialog when typing up/down arrows", () => {
    const { getByTestId, queryByTestId, omniField } = renderWrapper();
    let omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
    fireEvent.keyDown(omniField, { keyCode: keycode("Down") });
    omniDialog = getByTestId("omni-dialog");
    expect(omniDialog).toBeInTheDocument();
    fireEvent.keyDown(omniField, { keyCode: keycode("Up") });
    omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
  });
  it("does not open omniDialog when focusing", () => {
    const { queryByTestId, omniField } = renderWrapper();
    let omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
    fireEvent.focus(omniField);
    omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
  });
  it("closes omniDialog after pressing enter", () => {
    const { getByTestId, queryByTestId, omniField } = renderWrapper();
    let omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
    fireEvent.click(getByTestId("search-options-expander"));
    omniDialog = getByTestId("omni-dialog");
    expect(omniDialog).toBeInTheDocument();
    fireEvent.keyDown(omniField, { keyCode: keycode("Enter") });
    omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
  });
  it("opens omniDialog when clicking expander, leaving open when clicking in omniDialog", () => {
    const { getByTestId, queryByTestId } = renderWrapper();
    let omniDialog = queryByTestId("omni-dialog");
    expect(omniDialog).toBeNull();
    fireEvent.click(getByTestId("search-options-expander"));
    omniDialog = getByTestId("omni-dialog");
    expect(omniDialog).toBeInTheDocument();
    fireEvent.click(omniDialog);
    omniDialog = getByTestId("omni-dialog");
    expect(omniDialog).toBeInTheDocument();
  });
});
