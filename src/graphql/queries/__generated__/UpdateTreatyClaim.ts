/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyClaimData } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTreatyClaim
// ====================================================

export interface UpdateTreatyClaim {
  updateClaimCreated: boolean | null;
}

export interface UpdateTreatyClaimVariables {
  id?: string | null;
  claims?: TreatyClaimData | null;
}
