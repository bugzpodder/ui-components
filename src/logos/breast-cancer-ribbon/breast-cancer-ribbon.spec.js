// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { BreastCancerRibbon } from ".";
import { TestWrapper } from "../../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("render BreastCancerRibbon", () => {
  const { container } = render(
    <TestWrapper>
      <BreastCancerRibbon />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
