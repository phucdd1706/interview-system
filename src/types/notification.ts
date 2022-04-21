export interface NotificationStateProps {
  notifications: Notification;
  error: object | string | null;
}

export type Notification = {
  email: boolean;
  desktop: boolean;
  attempted: boolean;
};
