import gql from "graphql-tag";

export const EMPLOYEES = gql`
  query Employees {
    employees {
      emp_abbrv
      employee_id
      employee_email
      employee_last_name
      employee_first_name
      employee_phonenumber
      user {
        position
        user_role {
          user_role_id
          position
        }
      }
      log_activities {
        device_ip
        device_type
        city
        country
        region
        created_at
      }
    }
  }
`;
