/// <reference types="react" />
declare type Props = {
    message: string;
    time: string;
    type: string;
    notificationIndex: number;
    removeNotification: (x0: number) => any;
};
export declare const NotificationCard: (props: Props) => JSX.Element;
export {};
