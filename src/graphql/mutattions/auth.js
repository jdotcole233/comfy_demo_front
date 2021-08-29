import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
      refresh_token
      expires_in
      token_type
      user {
        user_id
        position
        first_time_signin
        user_role {
          user_role_id
          position
          privileges 
        }
        employee {
          emp_abbrv
          employee_id
          employee_email
          employee_last_name
          employee_first_name
          employee_phonenumber
          # total_offers {
          #   facultative_offer
          # }
          # log_activities {
          #   device_ip
          #   device_type
          #   city
          #   country
          #   region
          #   created_at
          # }
        }
      }
    }
  }
`;

export const EMPLOYEE = gql`
  query employee($id: ID!) {
    employee(employee_id: $id) {
      employee_id
      user {
        position
      }
      total_offers {
        offer_id
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

export const LOGOUT = gql`
  mutation {
    logout {
      message
      status
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($id: ID!, $password: String!) {
    changePasswordByEmployee(employee_id: $id, new_password: $password)
  }
`;
