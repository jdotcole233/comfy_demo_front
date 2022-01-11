/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyPaymentDistribution } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DistributePaymentForTreaty
// ====================================================

export interface DistributePaymentForTreaty {
  distributePaymentForTreaty: boolean | null;
}

export interface DistributePaymentForTreatyVariables {
  id?: string | null;
  data?: (TreatyPaymentDistribution | null)[] | null;
}
