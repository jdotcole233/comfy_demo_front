import gql from "graphql-tag";


export const CREATE_USER_ROLE = gql`
mutation createUserRole($position: String,$privileges:String) {
  createUserRole(position: $position,privileges:$privileges)
}
`