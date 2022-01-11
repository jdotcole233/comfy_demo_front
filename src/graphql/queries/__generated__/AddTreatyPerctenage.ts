/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTreatyPerctenage
// ====================================================

export interface AddTreatyPerctenage {
  addReinsurersParticipationPercentage: boolean | null;
}

export interface AddTreatyPerctenageVariables {
  treaty_participation_id?: string | null;
  percentage?: number | null;
  treaty_id?: string | null;
  associate_deduction_id?: string | null;
  layer_number?: number | null;
}
