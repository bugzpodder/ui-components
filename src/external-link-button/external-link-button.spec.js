// @flow
import React from "react";
import { ExternalLinkButton } from "./external-link-button";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render ExternalLink", () => {
  const { container } = render(
    <TestWrapper>
      <ExternalLinkButton
        href="https://www.grail.com"
        className="test"
      >
        GRAIL
      </ExternalLinkButton>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
