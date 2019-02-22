// @flow
import "jest-dom/extend-expect";
import React from "react";
import { SuggestionsOmniField } from "./suggestions-omni-field";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

// TODO(jsingh): Add more test coverage.
test("render SuggestionsOmniField", () => {
  const { container } = render(
    <TestWrapper>
      <SuggestionsOmniField
        id="test-common-suggest"
        suggestions={["option 1", "opt 2", "option (R & D)"]}
        value=""
        onChange={() => {}}
        onEnter={() => {}}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
