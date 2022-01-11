/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRoles
// ====================================================

export interface UserRoles_user_roles {
  __typename: "UserRole";
  position: string | null;
  privileges: string | null;
  user_role_id: string | null;
}

export interface UserRoles {
  user_roles: (UserRoles_user_roles | null)[] | null;
}
