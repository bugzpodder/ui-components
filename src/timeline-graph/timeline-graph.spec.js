// @flow
import "jest-dom/extend-expect";
import React from "react";
import moment from "moment-timezone";
import { CommonTimelineGraph } from "./index";
import { TestWrapper } from "../utils/index";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
moment.tz.setDefault("America/Los_Angeles");
const bodyUtils = bindElementToQueries(document.body);

const rows = [
  {
    date: "2018-04-20T16:20:00Z",
    content: <div>Testing</div>,
  },
];

test("render simple timeline graph", () => {
  const { container } = render(
    <TestWrapper>
      <CommonTimelineGraph rows={rows} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("test selecting an item on the timeline graph", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <CommonTimelineGraph
        onSelect={mockOnSelect}
        rows={rows}
      />
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByTestId("timeline-item-0"));
  expect(mockOnSelect.mock.results[0].value).toEqual(0);
  expect(container).toMatchSnapshot();
});

test("test unselecting an item on the timeline graph", () => {
  const mockOnSelect = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <CommonTimelineGraph
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
