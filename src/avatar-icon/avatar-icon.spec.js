// @flow
import "jest-dom/extend-expect";
import React from "react";
import { AvatarIcon } from ".";
import { TestWrapper } from "../test-utils";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
const bodyUtils = bindElementToQueries(document.body);

test("render avatar with menu", () => {
  const mockMenuOpen = jest.fn(result => result);
  const mockItemClick = jest.fn(result => result);
  const menuItems = [
    {
      content: "Test Item",
      onClick: mockItemClick,
    },
  ];
  const { container } = render(
    <TestWrapper>
      <AvatarIcon
        isMenuOpen
        id="avatar-icon-button"
        menuItems={menuItems}
        onClick={mockMenuOpen}
      />
    </TestWrapper>,
  );

  // TODO(nsawas): Figure out why menu items don't show up in snapshot, despite `isMenuOpen`
  // expect(getByTestId("user-menu")).toBeInTheDocument();
  fireEvent.click(bodyUtils.getByTestId("avatar-icon-button"));
  expect(mockMenuOpen).toHaveBeenCalledTimes(1);
  expect(mockMenuOpen.mock.results[0].value).toEqual(false);
  expect(container).toMatchSnapshot();
});
