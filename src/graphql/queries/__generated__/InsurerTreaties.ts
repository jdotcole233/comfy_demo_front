/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Payment_status, TreatyAccountPeriod, Sent_status, TreatyType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: InsurerTreaties
// ====================================================

export interface InsurerTreaties_treaties_treaty_deduction {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  withholding_tax: number | null;
  nic_levy: number | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
  brokerage: number | null;
}

export interface InsurerTreaties_treaties_treaty_np_payments {
  __typename: "TreatyNPPayment";
  created_at: any | null;
  updated_at: any | null;
  uuid: string | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  treaty_payment_amount: number | null;
}

export interface InsurerTreaties_treaties_treaty_p_payments {
  __typename: "TreatyPPayment";
  created_at: any | null;
  updated_at: any | null;
  treaty_p_payment_id: string | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  treaty_payment_amount: number | null;
}

export interface InsurerTreaties_treaties_treaty_accounts_treaty_account_deduction {
  __typename: "TreatyAccountDeduction";
  commission_amount: number | null;
  nic_levy_amount: number | null;
  brokerage_amount: number | null;
  withholding_tax_amount: number | null;
}

export interface InsurerTreaties_treaties_treaty_accounts {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  claim_settled: number | null;
  account_periods: TreatyAccountPeriod | null;
  gross_premium: number | null;
  treaty_account_deduction: (InsurerTreaties_treaties_treaty_accounts_treaty_account_deduction | null)[] | null;
}

export interface InsurerTreaties_treaties_treaty_to_associates_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
}

export interface InsurerTreaties_treaties_treaty_to_associates_reinsurer_representative {
  __typename: "Reinsurer_representative";
  rep_last_name: string;
  rep_first_name: string;
  rep_primary_phonenumber: string;
  rep_secondary_phonenumber: string | null;
  rep_email: string;
}

export interface InsurerTreaties_treaties_treaty_to_associates {
  __typename: "TreatyToAssociate";
  layer_number: number | null;
  sent_status: Sent_status | null;
  treaty_to_associate_id: string | null;
  reinsurer: InsurerTreaties_treaties_treaty_to_associates_reinsurer | null;
  reinsurer_representative: InsurerTreaties_treaties_treaty_to_associates_reinsurer_representative | null;
}

export interface InsurerTreaties_treaties_treaty_participants_treaty_participant_payments {
  __typename: "TreatyParticipantsPayment";
  participant_payment_details: string | null;
  treaty_participants_payment_id: string | null;
}

export interface InsurerTreaties_treaties_treaty_participants_treaty_participant_deductions {
  __typename: "TreatyParticipantDeduction";
  treaty_accountstreaty_account_id: string | null;
  uuid: string | null;
  nic_levy_amount: number | null;
  withholding_tax_amount: number | null;
  commission_amount: number | null;
  treaty_participation_share: number | null;
  brokerage_amount: number | null;
}

export interface InsurerTreaties_treaties_treaty_participants_reinsurer_reinsurer_address {
  __typename: "Reinsurer_address";
  suburb: string;
  region: string;
  country: string;
}

export interface InsurerTreaties_treaties_treaty_participants_reinsurer {
  __typename: "Reinsurer";
  re_abbrv: string | null;
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
  reinsurer_address: InsurerTreaties_treaties_treaty_participants_reinsurer_reinsurer_address;
}

export interface InsurerTreaties_treaties_treaty_participants {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  treaty_participant_payments: (InsurerTreaties_treaties_treaty_participants_treaty_participant_payments | null)[] | null;
  treaty_participant_deductions: (InsurerTreaties_treaties_treaty_participants_treaty_participant_deductions | null)[] | null;
  reinsurer: InsurerTreaties_treaties_treaty_participants_reinsurer | null;
}

export interface InsurerTreaties_treaties_treaty_program {
  __typename: "TreatyProgram";
  treaty_name: string | null;
  treaty_type: TreatyType | null;
  treaty_program_id: string | null;
}

export interface InsurerTreaties_treaties_employee {
  __typename: "Employee";
  employee_last_name: string;
  employee_first_name: string;
}

export interface InsurerTreaties_treaties {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_reference: string | null;
  currency: string | null;
  layer_limit: string | null;
  treaty_details: string | null;
  treaty_payment_status: Payment_status | null;
  treaty_deduction: InsurerTreaties_treaties_treaty_deduction | null;
  treaty_np_payments: (InsurerTreaties_treaties_treaty_np_payments | null)[] | null;
  treaty_p_payments: (InsurerTreaties_treaties_treaty_p_payments | null)[] | null;
  treaty_accounts: (InsurerTreaties_treaties_treaty_accounts | null)[] | null;
  treaty_to_associates: (InsurerTreaties_treaties_treaty_to_associates | null)[] | null;
  treaty_participants: (InsurerTreaties_treaties_treaty_participants | null)[] | null;
  treaty_program: InsurerTreaties_treaties_treaty_program | null;
  employee: InsurerTreaties_treaties_employee | null;
}

export interface InsurerTreaties {
  treaties: (InsurerTreaties_treaties | null)[] | null;
}

export interface InsurerTreatiesVariables {
  id?: string | null;
}
