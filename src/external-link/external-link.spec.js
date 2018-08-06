// @flow
import React from "react";
import { ExternalLink } from "./external-link";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render ExternalLink", () => {
  const { container } = render(
    <TestWrapper>
      <ExternalLink
        href="https://www.grail.com"
        className="test"
      >
        GRAIL
      </ExternalLink>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
