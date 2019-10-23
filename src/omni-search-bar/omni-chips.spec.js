// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { LIKE_TEXT_SEARCH_TYPE, OMNI_KEY, SET_OMNI_FIELD_COMMAND } from "@grailbio/lib";
import { OmniChips } from "./omni-chips";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const searchOptions = [
  {
    name: OMNI_KEY,
    type: LIKE_TEXT_SEARCH_TYPE,
    values: ["test", "Test 2"],
  },
  {
    name: "Search Field",
    type: LIKE_TEXT_SEARCH_TYPE,
    values: ["test", "test 2", "test 3"],
  },
  {
    name: "Empty Search Field",
    type: LIKE_TEXT_SEARCH_TYPE,
    values: undefined,
  },
];

describe("OmniChips", () => {
  it("renders", () => {
    const { container } = render(
      <TestWrapper>
        <OmniChips searchOptions={searchOptions} />
      </TestWrapper>,
    );
    expect(container).toMatchSnapshot();
  });
  it("deletes", () => {
    const mockAddCommand = jest.fn(result => result);
    const { container } = render(
      <TestWrapper>
        <OmniChips
          searchOptions={searchOptions}
          addOmniSearchCommand={mockAddCommand}
        />
      </TestWrapper>,
    );
    expect(container).toMatchSnapshot();
    // TODO(nsawas): Fix this.
    // const deleteButton = container.querySelector("[data-testid='Search Field-1'] .MuiChip-deleteIcon");
    // fireEvent.click(deleteButton);
    // expect(mockAddCommand.mock.results[0].value).toEqual({
    //   command: SET_OMNI_FIELD_COMMAND,
    //   omniFieldName: "Search Field",
    //   omniValues: ["test", "test 3"],
    // });
    // expect(container).toMatchSnapshot();
  });
});
