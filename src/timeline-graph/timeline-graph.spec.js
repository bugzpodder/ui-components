// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import moment from "moment-timezone";
import { TabbedTimelineCard, TimelineCard, TimelineGraph } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);
moment.tz.setDefault("America/Los_Angeles");
const rows = [
  {
    date: "2018-04-20T16:20:00",
    content: <div>Testing</div>,
  },
  {
    date: "2018-04-20T16:20:00",
    content: <div>Testing</div>,
    user: "nsawas",
  },
];

const tabContents = {
  tabOne: { content: rows },
  tabTwo: {
    content: [
      {
        date: "2019-04-20T16:20:00",
        content: <div>Test Two</div>,
      },
    ],
  },
};

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

test("test tabbed timeline cartd", () => {
  const { container } = render(
    <TestWrapper>
      <TabbedTimelineCard tabContents={tabContents} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("test invalid timeline card", () => {
  mockConsole();
  expect(() =>
    render(
      <TestWrapper>
        <TabbedTimelineCard />
      </TestWrapper>,
    ),
  ).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("test selecting an item on the timeline card", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <TimelineCard
        onSelect={mockOnSelect}
        rows={rows}
      />
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("timeline-item-0"));
  expect(mockOnSelect.mock.results[0].value).toEqual(0);
  expect(container).toMatchSnapshot();
});

test("test unselecting an item on the timeline card", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <TimelineCard
        isDayVisible
        classes={{
          root: "naji",
        }}
        onSelect={mockOnSelect}
        selectedItem={0}
        rows={rows}
      />
    </TestWrapper>,
  );

  // TODO(nsawas): write tests for all classes.
  expect(getByTestId("timeline-day-0")).toBeInTheDocument();
  expect(getByTestId("timeline-day-0")).toHaveTextContent("Fri");
  fireEvent.click(getByTestId("timeline-item-0"));
  expect(mockOnSelect.mock.results[0].value).toEqual(null);
  expect(container).toMatchSnapshot();
});
