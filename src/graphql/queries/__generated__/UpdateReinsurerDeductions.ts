/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReinsurerParticipationUpdate } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReinsurerDeductions
// ====================================================

export interface UpdateReinsurerDeductions {
  updateReinsurerDeductions: boolean | null;
}

export interface UpdateReinsurerDeductionsVariables {
  data?: (ReinsurerParticipationUpdate | null)[] | null;
  account_ids?: (string | null)[] | null;
  layer?: string | null;
  isProp?: boolean | null;
}
