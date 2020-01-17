import React from "react";
import { CommonSuggest } from "./common-suggest";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

// TODO(nsawas): Add more test coverage.
test("render CommonSuggest", () => {
  const { container } = render(
    <TestWrapper>
      <CommonSuggest
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
