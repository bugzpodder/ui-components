import React from "react";
import { Notification } from "../types/notification";
declare type Props = {
    /**
     * The array of notification objects to display in the dropdown. Each object must include:
     *
     * - message: the message to display
     *
     * - time: a Date object displaying when the notification happened
     *
     * - type: `error`, `warning`, or `info`
     *
     */
    notifications: Notification[];
    /**
     * Function to clear all notifications.
     */
    removeAllNotifications: () => any;
    /**
     * Function to clear a specific notification, it should take in the index of the notification
     * to be removed.
     */
    removeNotification: (x0: number) => any;
};
export declare const NotificationCenter: React.FC<Props>;
export {};
