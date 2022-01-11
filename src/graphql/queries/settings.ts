import gql from "graphql-tag";

export const USER_ROLES = gql`
  query UserRoles {
    user_roles {
      position
      privileges
      user_role_id
    }
  }
`;
