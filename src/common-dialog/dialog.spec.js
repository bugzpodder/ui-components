// @flow
import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { bindElementToQueries } from "dom-testing-library";
import { TestWrapper } from "../utils";
import { CommonDialog, CommonMultiPageDialog } from "./index";

afterEach(cleanup);

const bodyUtils = bindElementToQueries(document.body);

test("render dialog", () => {
  const mockCallback = jest.fn();
  render(
    <TestWrapper>
      <CommonDialog
        actions={[
          { id: "action-button", name: "action one", callback: jest.fn() },
          { name: "action two", isLeftButton: true, callback: jest.fn() },
        ]}
        title="test"
        isVisible
        hideModal={mockCallback}
      >
        Test Content
      </CommonDialog>
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByText("Close"));
  expect(mockCallback).toBeCalled();
  expect(document.body).toMatchSnapshot();
});

test("render multi page dialog", () => {
  const mockCallback = jest.fn();
  render(
    <TestWrapper>
      <CommonMultiPageDialog
        actions={[
          { id: "action-button", name: "action one", callback: jest.fn() },
          {
            id: "action-button",
            name: "action two",
            isLeftButton: true,
            callback: jest.fn(),
            pages: [1],
          },
          {
            id: "action-button",
            name: "action three",
            icon: "arrow_forward",
            callback: jest.fn(),
            pages: [0],
          },
          {
            id: "action-button",
            name: "action four",
            icon: "arrow_backward",
            callback: jest.fn(),
            pages: [1],
          },
        ]}
        title="test"
        isVisible
        hideModal={jest.fn()}
        pages={[
          <div
            key="0"
            data-testid="page"
          >
            Page 1
          </div>,
          <div
            key="1"
            data-testid="page"
          >
            Page 2
          </div>,
        ]}
        pageIndex={1}
        setPage={mockCallback}
      >
        Test Content
      </CommonMultiPageDialog>
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByText("Back"));
  expect(mockCallback).toBeCalled();
  expect(document.body).toMatchSnapshot();
});
