import gql from "graphql-tag";


export const USER_ROLES = gql`
query getRoles{
  user_roles {
    position
    privileges
    user_role_id
  }
}
`