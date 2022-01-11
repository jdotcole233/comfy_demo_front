/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Notifications
// ====================================================

export interface Notifications_readSystemNotifications_employee_notification_paginatorInfo {
  __typename: "PaginatorInfo";
  /**
   * Total count of available items in the page.
   */
  count: number;
  /**
   * Current pagination page.
   */
  currentPage: number;
  /**
   * If collection has more pages.
   */
  hasMorePages: boolean;
  /**
   * Index of last item in the current page.
   */
  lastItem: number | null;
  /**
   * Total items available in the collection.
   */
  total: number;
}

export interface Notifications_readSystemNotifications_employee_notification_data_system_notification {
  __typename: "SystemNotification";
  system_notification_id: string | null;
  notification_type: string | null;
  notification_content: string | null;
  created_at: any | null;
}

export interface Notifications_readSystemNotifications_employee_notification_data {
  __typename: "EmployeeNotification";
  system_notification: Notifications_readSystemNotifications_employee_notification_data_system_notification | null;
  employee_notification_id: string | null;
}

export interface Notifications_readSystemNotifications_employee_notification {
  __typename: "EmployeeNotificationPaginator";
  /**
   * Pagination information about the list of items.
   */
  paginatorInfo: Notifications_readSystemNotifications_employee_notification_paginatorInfo;
  /**
   * A list of EmployeeNotification items.
   */
  data: Notifications_readSystemNotifications_employee_notification_data[];
}

export interface Notifications_readSystemNotifications {
  __typename: "Employee";
  employee_notification: Notifications_readSystemNotifications_employee_notification | null;
}

export interface Notifications {
  readSystemNotifications: Notifications_readSystemNotifications | null;
}

export interface NotificationsVariables {
  id: string;
  first: number;
  page?: number | null;
}
