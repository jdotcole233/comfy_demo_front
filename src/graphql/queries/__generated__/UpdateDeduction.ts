/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyAssociateDeductionData } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDeduction
// ====================================================

export interface UpdateDeduction {
  updateTreatyProgramAssociateDeductions: boolean | null;
}

export interface UpdateDeductionVariables {
  deductions?: TreatyAssociateDeductionData | null;
  deduction_id?: string | null;
}
