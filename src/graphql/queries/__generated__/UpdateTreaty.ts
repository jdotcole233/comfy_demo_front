/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyProgramData } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTreaty
// ====================================================

export interface UpdateTreaty {
  updateTreatyProgram: boolean | null;
}

export interface UpdateTreatyVariables {
  program?: TreatyProgramData | null;
  id?: string | null;
}
