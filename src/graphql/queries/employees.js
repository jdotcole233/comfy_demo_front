import gql from "graphql-tag";

export const EMPLOYEES = gql`
  {
    employees {
      emp_abbrv
      employee_id
      employee_email
      employee_last_name
      employee_first_name
      employee_phonenumber
      user {
        position
      }
    }
  }
`;
