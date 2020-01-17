import MockDate from "mockdate";
import MomentUtils from "@date-io/moment";
import React from "react";
import { DateTimeValue, DateValue, HumanizedDateTime } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";
import { wrapPickerUtilProvider } from "./picker-util-provider-hoc";

afterEach(() => {
  cleanup();
  MockDate.reset();
});

const DateValueContainer = wrapPickerUtilProvider(DateValue, MomentUtils);
const DateTimeValueContainer = wrapPickerUtilProvider(
  DateTimeValue,
  MomentUtils,
);
const HumanizedDateTimeContainer = wrapPickerUtilProvider(
  HumanizedDateTime,
  MomentUtils,
);

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateTimeValueContainer value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).toHaveTextContent(
    "2017-03-13 00:00:00",
  );
  rerender(
    <TestWrapper>
      <DateTimeValueContainer />
    </TestWrapper>,
  );
  expect(getByTestId("date-time-value")).not.toBeEmpty();
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
});

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateValueContainer value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-value")).toHaveTextContent("2017-03-13");
  rerender(
    <TestWrapper>
      <DateValueContainer />
    </TestWrapper>,
  );
  expect(getByTestId("date-value")).not.toBeEmpty();
  expect(getByTestId("date-value")).toHaveTextContent("-");
});

test("render HumanizedDateTime", async () => {
  MockDate.set(new Date("2019-04-21"));

  const { container, getByTestId } = render(
    <TestWrapper>
      <HumanizedDateTimeContainer value="2018-04-20" />
    </TestWrapper>,
  );
  expect(getByTestId("date-time-value")).toHaveTextContent("2018-04-20");
  expect(getByTestId("humanized")).toHaveTextContent("about 1 year");
  expect(container).toMatchSnapshot();
});
