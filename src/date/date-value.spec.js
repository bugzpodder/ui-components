// @flow
import "jest-dom/extend-expect";
import React from "react";
import { DateTimeValue, DateValue, HumanizedDateTime } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateTimeValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).toHaveTextContent("2017-03-13 00:00:00");
  rerender(
    <TestWrapper>
      <DateTimeValue />
    </TestWrapper>,
  );
  expect(getByTestId("date-time-value")).not.toBeEmpty();
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
});

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-value")).toHaveTextContent("2017-03-13");
  rerender(
    <TestWrapper>
      <DateValue />
    </TestWrapper>,
  );
  expect(getByTestId("date-value")).not.toBeEmpty();
  expect(getByTestId("date-value")).toHaveTextContent("-");
});

test("render HumanizedDateTime", async () => {
  Date.now = jest.fn(() => new Date("2019-04-20"));
  const { rerender, container, getByTestId } = render(
    <TestWrapper>
      <HumanizedDateTime value="2018-04-20" />
    </TestWrapper>,
  );
  expect(getByTestId("date-time-value")).toHaveTextContent("2018-04-20");
  expect(getByTestId("humanized")).toHaveTextContent("a year ago");
  rerender(
    <TestWrapper>
      <HumanizedDateTime />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
  expect(getByTestId("humanized")).toHaveTextContent("a few seconds ago");
});
