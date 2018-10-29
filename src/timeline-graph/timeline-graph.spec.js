// @flow
import "jest-dom/extend-expect";
import React from "react";
import moment from "moment-timezone";
import { TestWrapper } from "../utils/index";
import { TimelineCard, TimelineGraph } from "./index";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
moment.tz.setDefault("America/Los_Angeles");
const bodyUtils = bindElementToQueries(document.body);

const rows = [
  {
    date: "2018-04-20T16:20:00",
    content: <div>Testing</div>,
  },
];

test("render simple timeline graph", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <TimelineGraph rows={rows} />
    </TestWrapper>,
  );
  expect(getByTestId("timeline-year-0")).toHaveTextContent("2018");
  expect(getByTestId("timeline-date-0")).toHaveTextContent("20 Apr");
  expect(container).toMatchSnapshot();
});

test("render simple timeline graph with time", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <TimelineGraph
        rows={rows}
        isTimeVisible
      />
    </TestWrapper>,
  );
  expect(getByTestId("timeline-time-0")).toHaveTextContent("16:20");
  expect(container).toMatchSnapshot();
});

test("test selecting an item on the timeline card", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <TimelineCard
        onSelect={mockOnSelect}
        rows={rows}
      />
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByTestId("timeline-item-0"));
  expect(mockOnSelect.mock.results[0].value).toEqual(0);
  expect(container).toMatchSnapshot();
});

test("test unselecting an item on the timeline card", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <TimelineCard
        onSelect={mockOnSelect}
        selectedItem={0}
        rows={rows}
      />
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByTestId("timeline-item-0"));
  expect(mockOnSelect.mock.results[0].value).toEqual(null);
  expect(container).toMatchSnapshot();
});
