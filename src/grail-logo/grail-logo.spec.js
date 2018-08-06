// @flow
import "jest-dom/extend-expect";
import React from "react";
import { GrailLogo } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

[undefined, "white", "purple", "gold"].forEach(color => {
  test(`render ${color || "default (white)"} GrailLogo`, () => {
    const { container } = render(
      <TestWrapper>
        <GrailLogo color={color} />
      </TestWrapper>,
    );
    expect(container).toMatchSnapshot();
  });
});
