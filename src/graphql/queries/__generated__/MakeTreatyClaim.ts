/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyClaimData } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: MakeTreatyClaim
// ====================================================

export interface MakeTreatyClaim {
  manuallyCreateClaims: boolean | null;
}

export interface MakeTreatyClaimVariables {
  id?: string | null;
  claims?: (TreatyClaimData | null)[] | null;
}
