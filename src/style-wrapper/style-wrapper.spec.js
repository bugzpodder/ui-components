// @flow
import "jest-dom/extend-expect";
import Button from "@material-ui/core/Button";
import React from "react";
import { StyleWrapper } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render style wrapper", () => {
  const { container } = render(
    <TestWrapper>
      <StyleWrapper>
        <Button color="primary">Primary</Button>
        <Button
          variant="contained"
          color="secondary"
        >
          Secondary
        </Button>
      </StyleWrapper>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
