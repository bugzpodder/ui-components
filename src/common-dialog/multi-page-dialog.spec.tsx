import "@testing-library/jest-dom/extend-expect";
import React, { useState } from "react";
import { CommonMultiPageDialog } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestMultiPageModal: React.FC<any> = props => {
  const { mockSetPage, mockHide } = props;
  const [pageIndex, setPageIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const setPage = (pageIndex): void => {
    mockSetPage(pageIndex);
    setPageIndex(pageIndex);
  };
  const setHide = (): void => {
    mockHide();
    setIsVisible(!isVisible);
  };
  return (
    <TestWrapper>
      <CommonMultiPageDialog
        actions={[
          { id: "action-button", name: "action one", callback: jest.fn() },
          {
            id: "action-button",
            name: "action two",
            isLeftButton: true,
            callback: jest.fn(),
            isEnabled: false,
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
        isVisible={isVisible}
        hideModal={setHide}
        pages={[
          <div key="0" data-testid="page">
            Page 1
          </div>,
          <div key="1" data-testid="page">
            Page 2
          </div>,
        ]}
        pageIndex={pageIndex}
        setPage={setPage}
      />
    </TestWrapper>
  );
};

test("render multi page dialog", () => {
  const mockSetPage = jest.fn(result => result);
  const mockHide = jest.fn(result => result);
  const { getByText, getByTestId } = render(
    <TestMultiPageModal mockSetPage={mockSetPage} mockHide={mockHide} />,
  );
  expect(getByTestId("dialog-content")).not.toHaveTextContent("Page 1");
  expect(getByTestId("dialog-content")).toHaveTextContent("Page 2");
  fireEvent.click(getByText("Back"));
  expect(mockSetPage).toBeCalled();
  // Retrieved pageIndex should be one less than the pageIndex the modal is currently on.
  expect(mockSetPage.mock.results[0].value).toEqual(0);
  expect(getByTestId("dialog-content")).toHaveTextContent("Page 1");
  expect(getByTestId("dialog-content")).not.toHaveTextContent("Page 2");

  fireEvent.click(getByText("Close"));
  expect(mockHide).toBeCalled();
  // TODO(nsawas): Figure out how to test modals not being visible anymore.
});
