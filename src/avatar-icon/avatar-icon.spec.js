// @flow
import "jest-dom/extend-expect";
import React from "react";
import { AvatarIcon } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

test("render avatar with menu", () => {
  const menuItems = [
    {
      content: "Item One",
    },
  ];
  const mockClick = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <AvatarIcon
        isMenuOpen
        id="avatar-icon-button"
        menuItems={menuItems}
        onClick={mockClick}
      />
    </TestWrapper>,
  );

  // TODO(nsawas): figure out why menu items don't show up in snapshot, despite `isMenuOpen`
  // expect(getByTestId("user-menu")).toBeInTheDOM();
  fireEvent(
    getByTestId("avatar-icon-button"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );
  expect(mockClick).toHaveBeenCalledTimes(1);
  expect(container).toMatchSnapshot();
});

test("render simple avatar", () => {
  const mockClick = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <AvatarIcon id="avatar-icon" />
    </TestWrapper>,
  );
  fireEvent(
    getByTestId("avatar-icon"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  );
  // expect(getByTestId("user-menu")).toBeNull();
  expect(mockClick).toHaveBeenCalledTimes(0);
  expect(container).toMatchSnapshot();
});
