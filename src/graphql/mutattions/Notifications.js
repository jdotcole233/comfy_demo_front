import gql from "graphql-tag";

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    removeNotificationForEmployee(employee_notification_id: $id)
  }
`;

export const CLEAR_NOTIFICATIONS = gql`
  mutation clearNotifications($ids: [ID]) {
    removeAllNotificationForEmployee(employee_notification_ids: $ids)
  }
`;

export const PostPoneNotification = gql`
  mutation postponeNotification($date: Date, $ids: [String]) {
    postponeRemainderTill(date: $date, reminder_ids: $ids)
  }
`;
