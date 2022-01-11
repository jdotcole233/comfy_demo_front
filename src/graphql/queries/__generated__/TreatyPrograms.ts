/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TreatyPrograms
// ====================================================

export interface TreatyPrograms_treatyPrograms_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
}

export interface TreatyPrograms_treatyPrograms_treaty_associate_deductions {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
  commission: number | null;
  withholding_tax: number | null;
  brokerage: number | null;
  nic_levy: number | null;
}

export interface TreatyPrograms_treatyPrograms {
  __typename: "TreatyProgram";
  treaty_program_id: string | null;
  insurer: TreatyPrograms_treatyPrograms_insurer | null;
  treaty_name: string | null;
  treaty_type: TreatyType | null;
  treaty_details: string | null;
  treaty_associate_deductions: (TreatyPrograms_treatyPrograms_treaty_associate_deductions | null)[] | null;
}

export interface TreatyPrograms {
  treatyPrograms: (TreatyPrograms_treatyPrograms | null)[] | null;
}
