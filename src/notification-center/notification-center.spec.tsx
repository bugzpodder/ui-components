import React, { useState } from "react";
import format from "date-fns/format";
import { Notification } from "../types/notification";
import { NotificationCenter } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);
const testUtcTime = "2019-04-20T23:20:00+00:00";

const TestNotificationCenter: React.FC<any> = props => {
  const { mockRemoveAllNotifications, mockRemoveNotification } = props;
  const [notifications] = useState<Notification[]>([
    {
      message: "test",
      time: testUtcTime,
      type: "error",
    },
    {
      message: "test",
      time: "2018-04-20T23:20:00+00:00",
      type: "warning",
    },
    {
      message: "test",
      time: "2017-04-20T23:20:00+00:00",
      type: "primary",
    },
    {
      message: "test",
      time: "2016-04-20T23:20:00+00:00",
      type: "unknown",
    },
  ]);
  return (
    <TestWrapper>
      <NotificationCenter
        notifications={notifications}
        removeNotification={mockRemoveNotification}
        removeAllNotifications={mockRemoveAllNotifications}
      />
    </TestWrapper>
  );
};

test("render notification center", () => {
  const mockRemoveNotification = jest.fn(result => result);
  const mockRemoveAllNotifications = jest.fn(result => result);
  const { container, getByTestId, queryByTestId } = render(
    <TestNotificationCenter
      mockRemoveNotification={mockRemoveNotification}
      mockRemoveAllNotifications={mockRemoveAllNotifications}
    />,
  );

  // Notification center should be closed.
  expect(container).toMatchSnapshot();
  expect(queryByTestId(`notification-${testUtcTime}`)).not.toBeInTheDocument();

  // Open notification center.
  fireEvent.click(getByTestId("notifications-button"));
  expect(container).toMatchSnapshot();
  expect(getByTestId(`notification-${testUtcTime}`)).toBeInTheDocument();
  expect(getByTestId("notification-type-error")).toBeInTheDocument();
  expect(getByTestId(`message-${testUtcTime}`)).toHaveTextContent("test");
  const expectedTime = format(new Date(testUtcTime), "yyyy-MM-dd HH:mm:ss");
  expect(getByTestId(`time-${testUtcTime}`)).toHaveTextContent(expectedTime);

  // Clear buttons.
  fireEvent.click(getByTestId("notifications-button"));
  fireEvent.click(getByTestId(`close-notification-${testUtcTime}`));
  expect(mockRemoveNotification).toHaveBeenCalledTimes(1);
  fireEvent.click(getByTestId("notifications-clear-all"));
  expect(mockRemoveAllNotifications).toHaveBeenCalledTimes(1);
});
