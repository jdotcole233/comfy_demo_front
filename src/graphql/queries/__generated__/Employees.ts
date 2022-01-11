/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Employees
// ====================================================

export interface Employees_employees_user_user_role {
  __typename: "UserRole";
  user_role_id: string | null;
  position: string | null;
}

export interface Employees_employees_user {
  __typename: "User";
  position: string;
  user_role: Employees_employees_user_user_role | null;
}

export interface Employees_employees_log_activities {
  __typename: "Log_activity";
  device_ip: string | null;
  device_type: string | null;
  city: string | null;
  country: string | null;
  region: string | null;
  created_at: any | null;
}

export interface Employees_employees {
  __typename: "Employee";
  emp_abbrv: string | null;
  employee_id: string;
  employee_email: string;
  employee_last_name: string;
  employee_first_name: string;
  employee_phonenumber: string;
  user: Employees_employees_user;
  log_activities: (Employees_employees_log_activities | null)[] | null;
}

export interface Employees {
  employees: Employees_employees[];
}
