/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Reinsurer_representative_data } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTreatyDistribution
// ====================================================

export interface CreateTreatyDistribution {
  createReinsurersDistribution: boolean | null;
}

export interface CreateTreatyDistributionVariables {
  ids?: (Reinsurer_representative_data | null)[] | null;
  treaty_id?: string | null;
  layer_number?: (number | null)[] | null;
  treaty_associate_deduction_id?: string | null;
}
