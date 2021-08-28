import gql from "graphql-tag";


export const CREATE_USER_ROLE = gql`
mutation createUserRole($position: String,$privileges:String) {
  createUserRole(position: $position,privileges:$privileges)
}
`

export const UPDATE_USER_ROLE = gql`
mutation updateUserRole($position: String,$privileges:String) {
  updateUserRole(position: $position,privileges:$privileges)
}`