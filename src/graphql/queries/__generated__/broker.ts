/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Payment_status, TreatyAccountPeriod, TreatyType, Sent_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: broker
// ====================================================

export interface broker_broker_re_broker_address {
  __typename: "ReBrokerAddress";
  region: string | null;
  street: string | null;
  country: string | null;
  city: string | null;
  re_primary_phone: string | null;
  re_secondary_phone: string | null;
  re_broker_address_id: string | null;
}

export interface broker_broker_broker_overview {
  __typename: "Treaty_overview";
  total_treaties: number | null;
  total_proportional: number | null;
  total_nonproportional: number | null;
  total_unpaid_treaties: number | null;
  total_paid_treaties: number | null;
  total_partpayment_treaties: number | null;
  total_brokerage_amt: string | null;
  brokerage_chart: string | null;
}

export interface broker_broker_re_broker_associates {
  __typename: "ReBrokerAssociate";
  re_broker_associate_id: string | null;
  re_broker_assoc_email: string | null;
  re_broker_assoc_position: string | null;
  re_broker_assoc_last_name: string | null;
  re_broker_assoc_first_name: string | null;
  re_broker_assoc_primary_phone: string | null;
  re_broker_assoc_secondary_phone: string | null;
}

export interface broker_broker_re_broker_participations_surplus_participation_treaty_account {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  account_periods: TreatyAccountPeriod | null;
  account_year: string | null;
  gross_premium: number | null;
  cash_loss: number | null;
  exchange_rate: string | null;
  payment_status: Payment_status | null;
  claim_settled: number | null;
}

export interface broker_broker_re_broker_participations_surplus_participation_broker_surplus_participation_payments {
  __typename: "ReBrokerTreatiesSurplusParticipationPayment";
  re_broker_treaties_surplus_participation_payment_id: string | null;
  payment_amount: number | null;
  payment_details: string | null;
}

export interface broker_broker_re_broker_participations_surplus_participation {
  __typename: "ReBrokerTreatiesSurplusParticipation";
  re_broker_treaties_surplus_participation_id: string | null;
  share_amount: number | null;
  admin_charge: number | null;
  treaty_account: broker_broker_re_broker_participations_surplus_participation_treaty_account | null;
  broker_surplus_participation_payments: (broker_broker_re_broker_participations_surplus_participation_broker_surplus_participation_payments | null)[] | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_program {
  __typename: "TreatyProgram";
  treaty_name: string | null;
  treaty_type: TreatyType | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_proportional_detail {
  __typename: "TreatyProportionalDetail";
  treaty_proportional_detail_id: string | null;
  profit_commission: number | null;
  re_mgmt_expense: number | null;
  ernpi: number | null;
  overall_gross_premium: number | null;
  losses_outstanding: number | null;
  portfolio_entry: string | null;
  created_at: any | null;
}

export interface broker_broker_re_broker_participations_treaty_insurer_insurer_address {
  __typename: "Insurer_address";
  suburb: string | null;
  region: string | null;
  country: string | null;
}

export interface broker_broker_re_broker_participations_treaty_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
  insurer_address: broker_broker_re_broker_participations_treaty_insurer_insurer_address | null;
}

export interface broker_broker_re_broker_participations_treaty_employee {
  __typename: "Employee";
  employee_last_name: string;
  employee_first_name: string;
  employee_phonenumber: string;
  employee_email: string;
}

export interface broker_broker_re_broker_participations_treaty_treaty_np_detail {
  __typename: "TreatyNPDetail";
  treaty_np_id: string | null;
  egrnpi: number | null;
  burning_cost_rate: number | null;
  loaded_burning_cost: number | null;
  pure_burning_cost: number | null;
  adjustment_created: boolean | null;
  created_at: any | null;
  claims_paid: number | null;
  outstanding_payment: number | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_account_deduction {
  __typename: "TreatyAccountDeduction";
  treaty_account_deduction_id: string | null;
  commission_amount: number | null;
  nic_levy_amount: number | null;
  gross_premium: number | null;
  brokerage_amount: number | null;
  withholding_tax_amount: number | null;
  surpulus_uuid: string | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_p_payments {
  __typename: "TreatyPPayment";
  treaty_p_payment_id: string | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_participant_deduction {
  __typename: "TreatyParticipantDeduction";
  treaty_participation_share: number | null;
  treaty_participationstreaty_participation_id: string | null;
  treaty_participant_deduction_id: string | null;
  withholding_tax_amount: number | null;
  nic_levy_amount: number | null;
  brokerage_amount: number | null;
  commission_amount: number | null;
  uuid: string | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_accounts {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  claim_settled: number | null;
  account_periods: TreatyAccountPeriod | null;
  exchange_rate: string | null;
  cash_loss: number | null;
  account_year: string | null;
  treaty_account_deduction: (broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_account_deduction | null)[] | null;
  treaty_p_payments: (broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_p_payments | null)[] | null;
  treaty_participant_deduction: (broker_broker_re_broker_participations_treaty_treaty_accounts_treaty_participant_deduction | null)[] | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_deduction {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  nic_levy: number | null;
  withholding_tax: number | null;
  brokerage: number | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_to_associates_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
}

export interface broker_broker_re_broker_participations_treaty_treaty_to_associates_reinsurer_representative {
  __typename: "Reinsurer_representative";
  rep_last_name: string;
  rep_first_name: string;
  rep_primary_phonenumber: string;
  rep_secondary_phonenumber: string | null;
  rep_email: string;
}

export interface broker_broker_re_broker_participations_treaty_treaty_to_associates {
  __typename: "TreatyToAssociate";
  layer_number: number | null;
  sent_status: Sent_status | null;
  treaty_to_associate_id: string | null;
  reinsurer: broker_broker_re_broker_participations_treaty_treaty_to_associates_reinsurer | null;
  reinsurer_representative: broker_broker_re_broker_participations_treaty_treaty_to_associates_reinsurer_representative | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_participants_treaty_participant_payments {
  __typename: "TreatyParticipantsPayment";
  participant_payment_details: string | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_participants_treaty_participant_deductions {
  __typename: "TreatyParticipantDeduction";
  treaty_accountstreaty_account_id: string | null;
  treaty_participant_deduction_id: string | null;
  uuid: string | null;
  brokerage: number | null;
  commission: number | null;
  nic_levy: number | null;
  withholding_tax: number | null;
  nic_levy_amount: number | null;
  withholding_tax_amount: number | null;
  commission_amount: number | null;
  treaty_participation_share: number | null;
  brokerage_amount: number | null;
}

export interface broker_broker_re_broker_participations_treaty_treaty_participants_reinsurer_reinsurer_address {
  __typename: "Reinsurer_address";
  suburb: string;
  region: string;
  country: string;
}

export interface broker_broker_re_broker_participations_treaty_treaty_participants_reinsurer {
  __typename: "Reinsurer";
  re_abbrv: string | null;
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
  reinsurer_address: broker_broker_re_broker_participations_treaty_treaty_participants_reinsurer_reinsurer_address;
}

export interface broker_broker_re_broker_participations_treaty_treaty_participants {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  layer_number: number | null;
  treaty_participant_payments: (broker_broker_re_broker_participations_treaty_treaty_participants_treaty_participant_payments | null)[] | null;
  treaty_participant_deductions: (broker_broker_re_broker_participations_treaty_treaty_participants_treaty_participant_deductions | null)[] | null;
  reinsurer: broker_broker_re_broker_participations_treaty_treaty_participants_reinsurer | null;
}

export interface broker_broker_re_broker_participations_treaty {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_details: string | null;
  treaty_reference: string | null;
  currency: string | null;
  treaty_payment_status: Payment_status | null;
  treaty_program: broker_broker_re_broker_participations_treaty_treaty_program | null;
  treaty_proportional_detail: broker_broker_re_broker_participations_treaty_treaty_proportional_detail | null;
  insurer: broker_broker_re_broker_participations_treaty_insurer | null;
  employee: broker_broker_re_broker_participations_treaty_employee | null;
  treaty_np_detail: broker_broker_re_broker_participations_treaty_treaty_np_detail | null;
  treaty_accounts: (broker_broker_re_broker_participations_treaty_treaty_accounts | null)[] | null;
  layer_limit: string | null;
  treaty_deduction: broker_broker_re_broker_participations_treaty_treaty_deduction | null;
  treaty_to_associates: (broker_broker_re_broker_participations_treaty_treaty_to_associates | null)[] | null;
  treaty_participants: (broker_broker_re_broker_participations_treaty_treaty_participants | null)[] | null;
}

export interface broker_broker_re_broker_participations {
  __typename: "ReBrokerTreatiesParticipation";
  re_broker_treaties_participation_id: string | null;
  share_percentage: number | null;
  payment_status: Payment_status | null;
  admin_percentage: number | null;
  surplus_participation: (broker_broker_re_broker_participations_surplus_participation | null)[] | null;
  treaty: broker_broker_re_broker_participations_treaty | null;
}

export interface broker_broker {
  __typename: "ReBroker";
  re_broker_id: string | null;
  re_broker_name: string | null;
  re_broker_email: string | null;
  re_broker_website: string | null;
  re_broker_address: broker_broker_re_broker_address | null;
  broker_overview: broker_broker_broker_overview | null;
  re_broker_associates: (broker_broker_re_broker_associates | null)[] | null;
  re_broker_participations: (broker_broker_re_broker_participations | null)[] | null;
}

export interface broker {
  broker: broker_broker | null;
}

export interface brokerVariables {
  id?: string | null;
}
