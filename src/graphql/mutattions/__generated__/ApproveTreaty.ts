/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApproveTreaty
// ====================================================

export interface ApproveTreaty {
  setTreatyApprovalStatus: boolean | null;
}

export interface ApproveTreatyVariables {
  treaty_id?: string | null;
  approval_status?: string | null;
  document_message?: (string | null)[] | null;
  approval_date?: any | null;
}
