/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Payment_status, TreatyType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UnapporvedTreatyClaims
// ====================================================

export interface UnapporvedTreatyClaims_all_treaties_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_claims {
  __typename: "TreatyClaim";
  treaty_claim_id: string | null;
  policy_number: string | null;
  claim_number: string | null;
  insured_name: string | null;
  date_of_loss: any | null;
  expected_deductible: number | null;
  claim_date: any | null;
  claim_paid: number | null;
  layer_number: number | null;
  treaty_comment: string | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_treaty_program {
  __typename: "TreatyProgram";
  treaty_name: string | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
  insurer_id: string | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_details: string | null;
  currency: string | null;
  layer_limit: string | null;
  treaty_program: UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_treaty_program | null;
  treaty_reference: string | null;
  insurer: UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_insurer | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_claims {
  __typename: "TreatyClaim";
  treaty_claim_id: string | null;
  claim_date: any | null;
  claim_paid: number | null;
  claim_number: string | null;
  layer_number: number | null;
  insured_name: string | null;
  treaty_comment: string | null;
  date_of_loss: any | null;
  expected_deductible: number | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants_reinsurer {
  __typename: "Reinsurer";
  re_abbrv: string | null;
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_participants {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  layer_number: number | null;
  treaty: UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty | null;
  treaty_claims: (UnapporvedTreatyClaims_all_treaties_treaty_participants_treaty_claims | null)[] | null;
  reinsurer: UnapporvedTreatyClaims_all_treaties_treaty_participants_reinsurer | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_deduction {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  withholding_tax: number | null;
  nic_levy: number | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
  brokerage: number | null;
}

export interface UnapporvedTreatyClaims_all_treaties_treaty_program {
  __typename: "TreatyProgram";
  treaty_name: string | null;
  treaty_type: TreatyType | null;
  treaty_program_id: string | null;
}

export interface UnapporvedTreatyClaims_all_treaties_employee {
  __typename: "Employee";
  employee_last_name: string;
  employee_first_name: string;
}

export interface UnapporvedTreatyClaims_all_treaties {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_reference: string | null;
  currency: string | null;
  layer_limit: string | null;
  treaty_details: string | null;
  treaty_payment_status: Payment_status | null;
  insurer: UnapporvedTreatyClaims_all_treaties_insurer | null;
  treaty_claims: (UnapporvedTreatyClaims_all_treaties_treaty_claims | null)[] | null;
  treaty_participants: (UnapporvedTreatyClaims_all_treaties_treaty_participants | null)[] | null;
  treaty_deduction: UnapporvedTreatyClaims_all_treaties_treaty_deduction | null;
  treaty_program: UnapporvedTreatyClaims_all_treaties_treaty_program | null;
  employee: UnapporvedTreatyClaims_all_treaties_employee | null;
}

export interface UnapporvedTreatyClaims {
  all_treaties: (UnapporvedTreatyClaims_all_treaties | null)[] | null;
}

export interface UnapporvedTreatyClaimsVariables {
  status?: string | null;
  treaty_type?: (string | null)[] | null;
}
