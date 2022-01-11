import gql from "graphql-tag";

export const NOTIFICATIONS = gql`
  query Notifications($id: ID!, $first: Int!, $page: Int) {
    readSystemNotifications(employee_id: $id) {
      employee_notification(first: $first, page: $page) {
        paginatorInfo {
          count
          currentPage
          hasMorePages
          lastItem
          total
        }
        data {
          system_notification {
            system_notification_id
            notification_type
            notification_content
            created_at
          }
          employee_notification_id
        }
      }
    }
  }
`;
