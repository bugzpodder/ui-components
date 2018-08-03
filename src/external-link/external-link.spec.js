// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import { TestWrapper } from "../utils";
import { ExternalLink } from "./external-link";

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
