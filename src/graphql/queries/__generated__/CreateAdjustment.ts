/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAdjustment
// ====================================================

export interface CreateAdjustment {
  createOrUpdateAdjustmentStatment: boolean | null;
}

export interface CreateAdjustmentVariables {
  treaty_id?: string | null;
  outstanding_payment?: number | null;
  claim_paid?: number | null;
  treaty_np_detail_id?: string | null;
}
