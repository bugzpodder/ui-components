import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { SuggestionsOmniField } from "./suggestions-omni-field";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

// TODO(jsingh): Add more test coverage.
test("render SuggestionsOmniField", () => {
  const { container } = render(
    <TestWrapper>
      <SuggestionsOmniField
        suggestions={["option 1", "opt 2", "option (R & D)"]}
        onChange={() => {}}
        loadSuggestions={() => {}}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
