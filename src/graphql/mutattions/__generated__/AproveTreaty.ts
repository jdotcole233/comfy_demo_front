/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AproveTreaty
// ====================================================

export interface AproveTreaty {
  setTreatyApprovalStatus: boolean | null;
}

export interface AproveTreatyVariables {
  treaty_id?: string | null;
  approval_status?: string | null;
  document_message?: (string | null)[] | null;
}
