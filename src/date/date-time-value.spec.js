// @flow
import "jest-dom/extend-expect";
import React from "react";
import { DateTimeValue } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render datetime value with no datetime", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <DateTimeValue />
    </TestWrapper>,
  );
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
  expect(container).toMatchSnapshot();
});

test("render datetime value with datetime", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <DateTimeValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).toHaveTextContent("2017-03-13 00:00:00");
});
