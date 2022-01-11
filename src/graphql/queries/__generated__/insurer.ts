/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Payment_status, TreatyType, TreatyAccountPeriod, Sent_status, Offer_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: insurer
// ====================================================

export interface insurer_insurer_insurer_address {
  __typename: "Insurer_address";
  suburb: string | null;
  country: string | null;
  street: string | null;
  region: string | null;
}

export interface insurer_insurer_insurer_associates {
  __typename: "Insurer_associate";
  insurer_associate_id: string;
  assoc_last_name: string;
  assoc_email: string | null;
  position: string | null;
  assoc_first_name: string;
  assoc_primary_phonenumber: string;
  assoc_secondary_phonenumber: string | null;
}

export interface insurer_insurer_insurer_overview_treaties_overview {
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

export interface insurer_insurer_insurer_overview {
  __typename: "Client_overview";
  total_paid: number | null;
  total_unpaid: number | null;
  total_closed: number | null;
  total_pending: number | null;
  total_fac_premium: string | null;
  total_brokerage_amt: string | null;
  brokerage_chart: string | null;
  treaties_overview: insurer_insurer_insurer_overview_treaties_overview | null;
}

export interface insurer_insurer_treaties_receivable_payments_treaty_participant_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
}

export interface insurer_insurer_treaties_receivable_payments_treaty_participant {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  layer_number: number | null;
  reinsurer: insurer_insurer_treaties_receivable_payments_treaty_participant_reinsurer | null;
}

export interface insurer_insurer_treaties_receivable_payments {
  __typename: "ReceivablePayment";
  receivable_payment_id: string | null;
  uuid: string | null;
  payment_amount: number | null;
  payment_detail: string | null;
  created_at: any | null;
  treaty_participant: insurer_insurer_treaties_receivable_payments_treaty_participant | null;
}

export interface insurer_insurer_treaties_treaty_program {
  __typename: "TreatyProgram";
  treaty_program_id: string | null;
  treaty_name: string | null;
  treaty_type: TreatyType | null;
  treaty_details: string | null;
}

export interface insurer_insurer_treaties_treaty_proportional_detail {
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

export interface insurer_insurer_treaties_insurer_insurer_address {
  __typename: "Insurer_address";
  suburb: string | null;
  region: string | null;
  country: string | null;
}

export interface insurer_insurer_treaties_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
  insurer_address: insurer_insurer_treaties_insurer_insurer_address | null;
}

export interface insurer_insurer_treaties_employee {
  __typename: "Employee";
  employee_last_name: string;
  employee_first_name: string;
  employee_phonenumber: string;
  employee_email: string;
}

export interface insurer_insurer_treaties_treaty_np_detail {
  __typename: "TreatyNPDetail";
  egrnpi: number | null;
  burning_cost_rate: number | null;
  loaded_burning_cost: number | null;
  pure_burning_cost: number | null;
}

export interface insurer_insurer_treaties_treaty_np_payments_treaty_participant_payment {
  __typename: "TreatyParticipantsPayment";
  treaty_participationstreaty_participation_id: string | null;
  treaty_p_paymentstreaty_p_payment_id: string | null;
  treaty_np_paymentstreaty_np_payment_id: string | null;
  brokerage_paid: number | null;
  commission_paid: number | null;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  participant_payment_amount: number | null;
}

export interface insurer_insurer_treaties_treaty_np_payments {
  __typename: "TreatyNPPayment";
  uuid: string | null;
  installment_type: number | null;
  treaty_payment_amount: number | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  created_at: any | null;
  updated_at: any | null;
  treaty_n_p_payment_id: string | null;
  treaty_participant_payment: (insurer_insurer_treaties_treaty_np_payments_treaty_participant_payment | null)[] | null;
}

export interface insurer_insurer_treaties_treaty_p_payments_treaty_participant_payment {
  __typename: "TreatyParticipantsPayment";
  treaty_participationstreaty_participation_id: string | null;
  treaty_p_paymentstreaty_p_payment_id: string | null;
  treaty_np_paymentstreaty_np_payment_id: string | null;
  brokerage_paid: number | null;
  commission_paid: number | null;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  participant_payment_amount: number | null;
}

export interface insurer_insurer_treaties_treaty_p_payments {
  __typename: "TreatyPPayment";
  treaty_p_payment_id: string | null;
  treaty_payment_amount: number | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  surpulus_uuid: string | null;
  treaty_accountstreaty_account_id: string | null;
  created_at: any | null;
  updated_at: any | null;
  treaty_participant_payment: (insurer_insurer_treaties_treaty_p_payments_treaty_participant_payment | null)[] | null;
}

export interface insurer_insurer_treaties_treaty_accounts_treaty_surpulus {
  __typename: "TreatyAccountSurpulus";
  treaty_account_surpulus_id: string | null;
  surpulus_uuid: string | null;
  gross_premium: number | null;
}

export interface insurer_insurer_treaties_treaty_accounts_treaty_account_deduction {
  __typename: "TreatyAccountDeduction";
  treaty_account_deduction_id: string | null;
  commission_amount: number | null;
  nic_levy_amount: number | null;
  gross_premium: number | null;
  brokerage_amount: number | null;
  withholding_tax_amount: number | null;
  surpulus_uuid: string | null;
}

export interface insurer_insurer_treaties_treaty_accounts_treaty_participant_deduction {
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

export interface insurer_insurer_treaties_treaty_accounts {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  claim_settled: number | null;
  account_periods: TreatyAccountPeriod | null;
  exchange_rate: string | null;
  payment_status: Payment_status | null;
  cash_loss: number | null;
  account_year: string | null;
  treaty_surpulus: (insurer_insurer_treaties_treaty_accounts_treaty_surpulus | null)[] | null;
  treaty_account_deduction: (insurer_insurer_treaties_treaty_accounts_treaty_account_deduction | null)[] | null;
  treaty_participant_deduction: (insurer_insurer_treaties_treaty_accounts_treaty_participant_deduction | null)[] | null;
}

export interface insurer_insurer_treaties_treaty_deduction {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  nic_levy: number | null;
  withholding_tax: number | null;
  brokerage: number | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
}

export interface insurer_insurer_treaties_treaty_to_associates_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
}

export interface insurer_insurer_treaties_treaty_to_associates_reinsurer_representative {
  __typename: "Reinsurer_representative";
  rep_last_name: string;
  rep_first_name: string;
  rep_primary_phonenumber: string;
  rep_secondary_phonenumber: string | null;
  rep_email: string;
}

export interface insurer_insurer_treaties_treaty_to_associates {
  __typename: "TreatyToAssociate";
  layer_number: number | null;
  sent_status: Sent_status | null;
  treaty_to_associate_id: string | null;
  reinsurer: insurer_insurer_treaties_treaty_to_associates_reinsurer | null;
  reinsurer_representative: insurer_insurer_treaties_treaty_to_associates_reinsurer_representative | null;
}

export interface insurer_insurer_treaties_treaty_claims_receivable_payments_treaty_participant_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
}

export interface insurer_insurer_treaties_treaty_claims_receivable_payments_treaty_participant {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  layer_number: number | null;
  reinsurer: insurer_insurer_treaties_treaty_claims_receivable_payments_treaty_participant_reinsurer | null;
}

export interface insurer_insurer_treaties_treaty_claims_receivable_payments {
  __typename: "ReceivablePayment";
  receivable_payment_id: string | null;
  uuid: string | null;
  payment_amount: number | null;
  payment_detail: string | null;
  created_at: any | null;
  treaty_participant: insurer_insurer_treaties_treaty_claims_receivable_payments_treaty_participant | null;
}

export interface insurer_insurer_treaties_treaty_claims {
  __typename: "TreatyClaim";
  treaty_claim_id: string | null;
  claim_date: any | null;
  claim_paid: number | null;
  claim_number: string | null;
  layer_number: number | null;
  insured_name: string | null;
  treaty_comment: string | null;
  date_of_loss: any | null;
  policy_number: string | null;
  expected_deductible: number | null;
  receivable_payments: (insurer_insurer_treaties_treaty_claims_receivable_payments | null)[] | null;
}

export interface insurer_insurer_treaties_treaty_participants_treaty_participant_payments {
  __typename: "TreatyParticipantsPayment";
  participant_payment_details: string | null;
  treaty_participants_payment_id: string | null;
}

export interface insurer_insurer_treaties_treaty_participants_treaty_participant_deductions {
  __typename: "TreatyParticipantDeduction";
  treaty_accountstreaty_account_id: string | null;
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

export interface insurer_insurer_treaties_treaty_participants_reinsurer_reinsurer_address {
  __typename: "Reinsurer_address";
  suburb: string;
  region: string;
  country: string;
}

export interface insurer_insurer_treaties_treaty_participants_reinsurer {
  __typename: "Reinsurer";
  re_abbrv: string | null;
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
  reinsurer_address: insurer_insurer_treaties_treaty_participants_reinsurer_reinsurer_address;
}

export interface insurer_insurer_treaties_treaty_participants {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  layer_number: number | null;
  treaty_participant_payments: (insurer_insurer_treaties_treaty_participants_treaty_participant_payments | null)[] | null;
  treaty_participant_deductions: (insurer_insurer_treaties_treaty_participants_treaty_participant_deductions | null)[] | null;
  reinsurer: insurer_insurer_treaties_treaty_participants_reinsurer | null;
}

export interface insurer_insurer_treaties {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_details: string | null;
  treaty_reference: string | null;
  kek_reference: string | null;
  order_hereon: number | null;
  currency: string | null;
  treaty_payment_status: Payment_status | null;
  approval_status: string | null;
  receivable_payments: (insurer_insurer_treaties_receivable_payments | null)[] | null;
  treaty_program: insurer_insurer_treaties_treaty_program | null;
  treaty_proportional_detail: insurer_insurer_treaties_treaty_proportional_detail | null;
  insurer: insurer_insurer_treaties_insurer | null;
  employee: insurer_insurer_treaties_employee | null;
  treaty_np_detail: insurer_insurer_treaties_treaty_np_detail | null;
  treaty_np_payments: (insurer_insurer_treaties_treaty_np_payments | null)[] | null;
  treaty_p_payments: (insurer_insurer_treaties_treaty_p_payments | null)[] | null;
  treaty_accounts: (insurer_insurer_treaties_treaty_accounts | null)[] | null;
  layer_limit: string | null;
  treaty_deduction: insurer_insurer_treaties_treaty_deduction | null;
  treaty_to_associates: (insurer_insurer_treaties_treaty_to_associates | null)[] | null;
  treaty_claims: (insurer_insurer_treaties_treaty_claims | null)[] | null;
  treaty_participants: (insurer_insurer_treaties_treaty_participants | null)[] | null;
}

export interface insurer_insurer_offers_offer_endorsements_offer_endorsement_detail {
  __typename: "OfferEndorsementDetail";
  offer_comment: string | null;
  offer_endorsement_detail_id: string | null;
  offer_detail: string | null;
}

export interface insurer_insurer_offers_offer_endorsements {
  __typename: "OfferEndorsement";
  sum_insured: number | null;
  premium: number | null;
  approval_status: string | null;
  created_at: any | null;
  updated_at: any | null;
  facultative_offer: number | null;
  offer_endorsement_id: string | null;
  fac_premium: number | null;
  offer_endorsement_detail: insurer_insurer_offers_offer_endorsements_offer_endorsement_detail | null;
  commission_amount: number | null;
}

export interface insurer_insurer_offers_offer_participant_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
}

export interface insurer_insurer_offers_offer_participant_offer_participant_payment_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  offer_deduction_payment_id: string;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface insurer_insurer_offers_offer_participant_offer_participant_payment {
  __typename: "Offer_participant_payment";
  offer_participant_payment_id: string;
  offer_payment_amount: number;
  paid_details: string;
  offer_deduction_charge: insurer_insurer_offers_offer_participant_offer_participant_payment_offer_deduction_charge | null;
}

export interface insurer_insurer_offers_offer_participant {
  __typename: "Offer_participant";
  offer_participant_id: string | null;
  participant_fac_premium: number | null;
  offer_participant_percentage: number | null;
  reinsurer: insurer_insurer_offers_offer_participant_reinsurer;
  offer_participant_payment: (insurer_insurer_offers_offer_participant_offer_participant_payment | null)[] | null;
}

export interface insurer_insurer_offers_offer_payment {
  __typename: "Offer_payment";
  offer_payment_id: string;
  payment_details: string;
  payment_amount: number;
  offer_payment_comment: string;
  created_at: any;
  updated_at: any;
}

export interface insurer_insurer_offers_classofbusiness {
  __typename: "Class_of_business";
  business_name: string;
}

export interface insurer_insurer_offers_offer_detail {
  __typename: "Offer_details";
  offer_details: string;
  policy_number: string | null;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  offer_comment: string | null;
  insured_by: string;
  currency: string;
}

export interface insurer_insurer_offers_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
}

export interface insurer_insurer_offers {
  __typename: "Offer";
  created_at: any;
  offer_id: string;
  offer_status: Offer_status;
  sum_insured: number;
  rate: number | null;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  brokerage: number;
  facultative_offer: number;
  payment_status: Payment_status;
  commission: number;
  commission_amount: number | null;
  offer_endorsements: (insurer_insurer_offers_offer_endorsements | null)[] | null;
  offer_participant: (insurer_insurer_offers_offer_participant | null)[] | null;
  offer_payment: (insurer_insurer_offers_offer_payment | null)[] | null;
  classofbusiness: insurer_insurer_offers_classofbusiness | null;
  offer_detail: insurer_insurer_offers_offer_detail | null;
  insurer: insurer_insurer_offers_insurer | null;
}

export interface insurer_insurer_remainders {
  __typename: "Remainder";
  remainder_id: string | null;
  offersoffer_id: string | null;
  insurersinsurer_id: string | null;
  postponed_till: any | null;
}

export interface insurer_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_abbrv: string | null;
  insurer_company_website: string | null;
  insurer_address: insurer_insurer_insurer_address | null;
  insurer_associates: (insurer_insurer_insurer_associates | null)[] | null;
  insurer_overview: insurer_insurer_insurer_overview | null;
  treaties: (insurer_insurer_treaties | null)[] | null;
  offers: (insurer_insurer_offers | null)[] | null;
  remainders: (insurer_insurer_remainders | null)[] | null;
}

export interface insurer {
  insurer: insurer_insurer;
}

export interface insurerVariables {
  id: string;
}
