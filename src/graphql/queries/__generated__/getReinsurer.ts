/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status, Payment_status, TreatyType, TreatyAccountPeriod } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getReinsurer
// ====================================================

export interface getReinsurer_reinsurer_reinsurer_address {
  __typename: "Reinsurer_address";
  street: string;
  suburb: string;
  region: string;
  country: string;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: getReinsurer_reinsurer_offer_retrocedents_offer_offer_retrocedent_reinsurer | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_endorsements_offer_endorsement_detail {
  __typename: "OfferEndorsementDetail";
  offer_comment: string | null;
  currency: string | null;
  offer_endorsement_detail_id: string | null;
  offer_detail: string | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_endorsements {
  __typename: "OfferEndorsement";
  sum_insured: number | null;
  premium: number | null;
  approval_status: string | null;
  created_at: any | null;
  updated_at: any | null;
  facultative_offer: number | null;
  offer_endorsement_id: string | null;
  fac_premium: number | null;
  offer_endorsement_detail: getReinsurer_reinsurer_offer_retrocedents_offer_offer_endorsements_offer_endorsement_detail | null;
  commission_amount: number | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_offer_participant_payment_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  offer_deduction_payment_id: string;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_offer_participant_payment {
  __typename: "Offer_participant_payment";
  offer_participant_payment_id: string;
  offer_payment_amount: number;
  paid_details: string;
  offer_deduction_charge: getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_offer_participant_payment_offer_deduction_charge | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant {
  __typename: "Offer_participant";
  offer_participant_id: string | null;
  participant_fac_premium: number | null;
  offer_participant_percentage: number | null;
  reinsurer: getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_reinsurer;
  offer_participant_payment: (getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant_offer_participant_payment | null)[] | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_payment {
  __typename: "Offer_payment";
  offer_payment_id: string;
  payment_details: string;
  payment_amount: number;
  offer_payment_comment: string;
  created_at: any;
  updated_at: any;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_classofbusiness {
  __typename: "Class_of_business";
  business_name: string;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_exchange_rate {
  __typename: "ExchangeRate";
  ex_rate: number | null;
  ex_currency: string | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_offer_detail {
  __typename: "Offer_details";
  offer_details: string;
  policy_number: string | null;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  offer_comment: string | null;
  information_comment: string | null;
  payment_type: string | null;
  insured_by: string;
  currency: string;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents_offer {
  __typename: "Offer";
  created_at: any;
  offer_id: string;
  offer_status: Offer_status;
  sum_insured: number;
  co_insurance_share: number | null;
  rate: number | null;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  brokerage: number;
  facultative_offer: number;
  payment_status: Payment_status;
  commission: number;
  commission_amount: number | null;
  offer_retrocedent: getReinsurer_reinsurer_offer_retrocedents_offer_offer_retrocedent | null;
  offer_endorsements: (getReinsurer_reinsurer_offer_retrocedents_offer_offer_endorsements | null)[] | null;
  offer_participant: (getReinsurer_reinsurer_offer_retrocedents_offer_offer_participant | null)[] | null;
  offer_payment: (getReinsurer_reinsurer_offer_retrocedents_offer_offer_payment | null)[] | null;
  classofbusiness: getReinsurer_reinsurer_offer_retrocedents_offer_classofbusiness | null;
  exchange_rate: getReinsurer_reinsurer_offer_retrocedents_offer_exchange_rate | null;
  offer_detail: getReinsurer_reinsurer_offer_retrocedents_offer_offer_detail | null;
  insurer: getReinsurer_reinsurer_offer_retrocedents_offer_insurer | null;
}

export interface getReinsurer_reinsurer_offer_retrocedents {
  __typename: "Offer_retrocedent";
  offer: getReinsurer_reinsurer_offer_retrocedents_offer | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_program {
  __typename: "TreatyProgram";
  treaty_name: string | null;
  treaty_type: TreatyType | null;
  treaty_program_id: string | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_employee {
  __typename: "Employee";
  employee_last_name: string;
  employee_first_name: string;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_deduction {
  __typename: "TreatyAssociateDeduction";
  treaty_associate_deduction_id: string | null;
  commission: number | null;
  withholding_tax: number | null;
  nic_levy: number | null;
  treaty_period_to: any | null;
  treaty_period_from: any | null;
  brokerage: number | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_np_payments_treaty_participant_payment {
  __typename: "TreatyParticipantsPayment";
  treaty_participants_payment_id: string | null;
  treaty_participationstreaty_participation_id: string | null;
  treaty_np_paymentstreaty_np_payment_id: string | null;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  participant_payment_amount: number | null;
  brokerage_paid: number | null;
  commission_paid: number | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_np_payments {
  __typename: "TreatyNPPayment";
  created_at: any | null;
  updated_at: any | null;
  uuid: string | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  treaty_payment_amount: number | null;
  treaty_n_p_payment_id: string | null;
  treaty_participant_payment: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_np_payments_treaty_participant_payment | null)[] | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_p_payments_treaty_participant_payment {
  __typename: "TreatyParticipantsPayment";
  treaty_participants_payment_id: string | null;
  treaty_participationstreaty_participation_id: string | null;
  treaty_p_paymentstreaty_p_payment_id: string | null;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  participant_payment_amount: number | null;
  brokerage_paid: number | null;
  commission_paid: number | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_p_payments {
  __typename: "TreatyPPayment";
  created_at: any | null;
  updated_at: any | null;
  treaty_p_payment_id: string | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  treaty_accountstreaty_account_id: string | null;
  treaty_payment_amount: number | null;
  treaty_participant_payment: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_p_payments_treaty_participant_payment | null)[] | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_accounts_treaty_account_deduction {
  __typename: "TreatyAccountDeduction";
  commission_amount: number | null;
  nic_levy_amount: number | null;
  brokerage_amount: number | null;
  withholding_tax_amount: number | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_treaty_accounts {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  claim_settled: number | null;
  account_periods: TreatyAccountPeriod | null;
  gross_premium: number | null;
  treaty_account_deduction: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_accounts_treaty_account_deduction | null)[] | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty {
  __typename: "Treaty";
  treaty_id: string | null;
  treaty_reference: string | null;
  currency: string | null;
  layer_limit: string | null;
  treaty_details: string | null;
  treaty_payment_status: Payment_status | null;
  treaty_program: getReinsurer_reinsurer_treaty_participations_treaty_treaty_program | null;
  employee: getReinsurer_reinsurer_treaty_participations_treaty_employee | null;
  treaty_deduction: getReinsurer_reinsurer_treaty_participations_treaty_treaty_deduction | null;
  treaty_np_payments: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_np_payments | null)[] | null;
  treaty_p_payments: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_p_payments | null)[] | null;
  treaty_accounts: (getReinsurer_reinsurer_treaty_participations_treaty_treaty_accounts | null)[] | null;
}

export interface getReinsurer_reinsurer_treaty_participations_treaty_participant_payments {
  __typename: "TreatyParticipantsPayment";
  treaty_participants_payment_id: string | null;
  treaty_participationstreaty_participation_id: string | null;
  treaty_p_paymentstreaty_p_payment_id: string | null;
  treaty_np_paymentstreaty_np_payment_id: string | null;
  participant_payment_status: Payment_status | null;
  participant_payment_details: string | null;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  participant_payment_amount: number | null;
  surpulus_uuid: string | null;
  brokerage_paid: number | null;
  commission_paid: number | null;
  created_at: any | null;
  updated_at: any | null;
}

export interface getReinsurer_reinsurer_treaty_participations {
  __typename: "TreatyParticipation";
  treaty_participation_id: string | null;
  treaty_participation_percentage: number | null;
  treaty: getReinsurer_reinsurer_treaty_participations_treaty | null;
  treaty_participant_payments: (getReinsurer_reinsurer_treaty_participations_treaty_participant_payments | null)[] | null;
}

export interface getReinsurer_reinsurer_reinsurer_overview_treaties_overview {
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

export interface getReinsurer_reinsurer_reinsurer_overview {
  __typename: "Client_overview";
  brokerage_chart: string | null;
  total_paid: number | null;
  total_unpaid: number | null;
  total_closed: number | null;
  total_pending: number | null;
  total_fac_premium: string | null;
  total_brokerage_amt: string | null;
  total_nic_tax: string | null;
  total_withholding_tax: string | null;
  treaties_overview: getReinsurer_reinsurer_reinsurer_overview_treaties_overview | null;
}

export interface getReinsurer_reinsurer_reinsurer_representatives {
  __typename: "Reinsurer_representative";
  reinsurer_representative_id: string | null;
  rep_first_name: string;
  rep_last_name: string;
  rep_primary_phonenumber: string;
  rep_secondary_phonenumber: string | null;
  rep_email: string;
  position: string;
}

export interface getReinsurer_reinsurer_offers_participant_offer_detail {
  __typename: "Offer_details";
  currency: string;
  policy_number: string | null;
}

export interface getReinsurer_reinsurer_offers_participant_offer_extra_charges {
  __typename: "Offer_extra_charges";
  offer_extra_charge_id: string;
  withholding_tax: number;
  agreed_commission: number | null;
  nic_levy: number;
  agreed_brokerage_percentage: number;
}

export interface getReinsurer_reinsurer_offers_participant_offer_participant_payment_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  offer_deduction_payment_id: string;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface getReinsurer_reinsurer_offers_participant_offer_participant_payment {
  __typename: "Offer_participant_payment";
  offer_participant_payment_id: string;
  offer_payment_amount: number;
  paid_details: string;
  offer_participant_payment_comment: string;
  payment_status: Payment_status;
  created_at: any;
  updated_at: any;
  offer_deduction_charge: getReinsurer_reinsurer_offers_participant_offer_participant_payment_offer_deduction_charge | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_retrocedent_reinsurer | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_classofbusiness {
  __typename: "Class_of_business";
  business_name: string;
  class_of_business_id: string;
  business_details: string;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_exchange_rate {
  __typename: "ExchangeRate";
  ex_rate: number | null;
  ex_currency: string | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_detail {
  __typename: "Offer_details";
  insured_by: string;
  currency: string;
  policy_number: string | null;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
  payment_type: string | null;
}

export interface getReinsurer_reinsurer_offers_participant_reinsurer_offers_only {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  premium: number;
  brokerage: number;
  fac_premium: number;
  facultative_offer: number;
  commission: number;
  co_insurance_share: number | null;
  offer_retrocedent: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_retrocedent | null;
  fac_sum_insured: number;
  sum_insured: number;
  created_at: any;
  offer_status: Offer_status;
  payment_status: Payment_status;
  classofbusiness: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_classofbusiness | null;
  insurer: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_insurer | null;
  exchange_rate: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_exchange_rate | null;
  offer_detail: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only_offer_detail | null;
}

export interface getReinsurer_reinsurer_offers_participant {
  __typename: "Offer_participant";
  offersoffer_id: string | null;
  offer_participant_id: string | null;
  offer_detail: getReinsurer_reinsurer_offers_participant_offer_detail | null;
  offer_participant_percentage: number | null;
  participant_fac_premium: number | null;
  offer_extra_charges: getReinsurer_reinsurer_offers_participant_offer_extra_charges | null;
  offer_participant_payment: (getReinsurer_reinsurer_offers_participant_offer_participant_payment | null)[] | null;
  reinsurer_offers_only: getReinsurer_reinsurer_offers_participant_reinsurer_offers_only | null;
}

export interface getReinsurer_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
  re_abbrv: string | null;
  re_company_email: string;
  re_company_website: string | null;
  reinsurer_id: string | null;
  reinsurer_address: getReinsurer_reinsurer_reinsurer_address;
  offer_retrocedents: (getReinsurer_reinsurer_offer_retrocedents | null)[] | null;
  treaty_participations: (getReinsurer_reinsurer_treaty_participations | null)[] | null;
  reinsurer_overview: getReinsurer_reinsurer_reinsurer_overview | null;
  reinsurer_representatives: (getReinsurer_reinsurer_reinsurer_representatives | null)[] | null;
  offers_participant: (getReinsurer_reinsurer_offers_participant | null)[] | null;
}

export interface getReinsurer {
  reinsurer: getReinsurer_reinsurer;
}

export interface getReinsurerVariables {
  id: string;
}
