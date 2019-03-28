// @flow
import "jest-dom/extend-expect";
import React from "react";
import { BreastCancerRibbon } from "./index";
import { TestWrapper } from "../../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render BreastCancerRibbon", () => {
  const { container } = render(
    <TestWrapper>
      <BreastCancerRibbon />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
