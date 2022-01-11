/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Payment_status, Offer_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ReinsurerOffers
// ====================================================

export interface ReinsurerOffers_reinsurer_all_offers_offers_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_offer_detail {
  __typename: "Offer_details";
  currency: string;
  policy_number: string | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_offer_extra_charges {
  __typename: "Offer_extra_charges";
  offer_extra_charge_id: string;
  withholding_tax: number;
  agreed_commission: number | null;
  nic_levy: number;
  agreed_brokerage_percentage: number;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_offer_participant_payment_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  offer_deduction_payment_id: string;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_offer_participant_payment {
  __typename: "Offer_participant_payment";
  offer_participant_payment_id: string;
  offer_payment_amount: number;
  paid_details: string;
  offer_participant_payment_comment: string;
  payment_status: Payment_status;
  created_at: any;
  updated_at: any;
  offer_deduction_charge: ReinsurerOffers_reinsurer_all_offers_offers_offer_participant_payment_offer_deduction_charge | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_classofbusiness {
  __typename: "Class_of_business";
  business_name: string;
  class_of_business_id: string;
  business_details: string;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_offer_detail {
  __typename: "Offer_details";
  insured_by: string;
  currency: string;
  policy_number: string | null;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  premium: number;
  brokerage: number;
  fac_premium: number;
  facultative_offer: number;
  co_insurance_share: number | null;
  commission: number;
  fac_sum_insured: number;
  sum_insured: number;
  created_at: any;
  offer_status: Offer_status;
  payment_status: Payment_status;
  classofbusiness: ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_classofbusiness | null;
  insurer: ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_insurer | null;
  offer_detail: ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only_offer_detail | null;
}

export interface ReinsurerOffers_reinsurer_all_offers_offers {
  __typename: "Offer_participant";
  offersoffer_id: string | null;
  reinsurer: ReinsurerOffers_reinsurer_all_offers_offers_reinsurer;
  offer_participant_id: string | null;
  offer_detail: ReinsurerOffers_reinsurer_all_offers_offers_offer_detail | null;
  offer_participant_percentage: number | null;
  participant_fac_premium: number | null;
  offer_extra_charges: ReinsurerOffers_reinsurer_all_offers_offers_offer_extra_charges | null;
  offer_participant_payment: (ReinsurerOffers_reinsurer_all_offers_offers_offer_participant_payment | null)[] | null;
  reinsurer_offers_only: ReinsurerOffers_reinsurer_all_offers_offers_reinsurer_offers_only | null;
}

export interface ReinsurerOffers_reinsurer_all_offers {
  __typename: "Offer_all_re";
  offers: ReinsurerOffers_reinsurer_all_offers_offers[] | null;
  total: number | null;
}

export interface ReinsurerOffers {
  reinsurer_all_offers: ReinsurerOffers_reinsurer_all_offers | null;
}

export interface ReinsurerOffersVariables {
  skip?: number | null;
  id?: string | null;
}
