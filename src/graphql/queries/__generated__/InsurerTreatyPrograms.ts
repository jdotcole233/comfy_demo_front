/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: InsurerTreatyPrograms
// ====================================================

export interface InsurerTreatyPrograms_insurerTreatyProgram_treaty_associate_deductions {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  brokerage: number | null;
  nic_levy: number | null;
  withholding_tax: number | null;
  treaty_period_from: any | null;
  treaty_period_to: any | null;
}

export interface InsurerTreatyPrograms_insurerTreatyProgram {
  __typename: "TreatyProgram";
  treaty_name: string | null;
  treaty_details: string | null;
  treaty_program_id: string | null;
  treaty_type: TreatyType | null;
  treaty_associate_deductions: (InsurerTreatyPrograms_insurerTreatyProgram_treaty_associate_deductions | null)[] | null;
}

export interface InsurerTreatyPrograms {
  insurerTreatyProgram: (InsurerTreatyPrograms_insurerTreatyProgram | null)[] | null;
}

export interface InsurerTreatyProgramsVariables {
  id?: string | null;
}
