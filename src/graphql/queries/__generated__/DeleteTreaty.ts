/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteTreaty
// ====================================================

export interface DeleteTreaty {
  deleteTreaty: boolean | null;
}

export interface DeleteTreatyVariables {
  id?: string | null;
  treaty_type?: TreatyType | null;
}
