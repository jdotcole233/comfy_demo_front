import gql from "graphql-tag";

export const CREATE_EMPLOYEE = gql`
  mutation registerEmployee($employee: Employee_data!) {
    createEmployeeAccount(employee: $employee)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($employee_id: ID!, $employee: Employee_data!) {
    updateEmployeeAccountDetails(employee_id: $employee_id, employee: $employee)
  }
`;

export const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee($employee_id: ID!) {
    adminDeleteEmployeeAccount(employee_id: $employee_id)
  }
`;

export const RESET_CREDENTIALS = gql`
  mutation resetCredentials($employee_id: ID!) {
    adminResetEmployeePassword(employee_id: $employee_id)
  }
`;
