/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status, Payment_status, Claim_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ReinstatmentOffers
// ====================================================

export interface ReinstatmentOffers_reinstate_offers_offers_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface ReinstatmentOffers_reinstate_offers_offers_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: ReinstatmentOffers_reinstate_offers_offers_offer_retrocedent_reinsurer | null;
}

export interface ReinstatmentOffers_reinstate_offers_offers_offer_detail {
  __typename: "Offer_details";
  offer_detail_id: string;
  offersoffer_id: string;
  policy_number: string | null;
  insured_by: string;
  period_of_insurance_to: any | null;
  period_of_insurance_from: any | null;
  payment_type: string | null;
  currency: string;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
}

export interface ReinstatmentOffers_reinstate_offers_offers_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_company_website: string | null;
}

export interface ReinstatmentOffers_reinstate_offers_offers_classofbusiness {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
  created_at: any;
}

export interface ReinstatmentOffers_reinstate_offers_offers {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  co_insurance_share: number | null;
  commission: number;
  commission_amount: number | null;
  brokerage: number;
  facultative_offer: number;
  placed_offer: number | null;
  sum_insured: number;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  offer_status: Offer_status;
  approval_status: string | null;
  payment_status: Payment_status;
  claim_status: Claim_status;
  offer_retrocedent: ReinstatmentOffers_reinstate_offers_offers_offer_retrocedent | null;
  offer_detail: ReinstatmentOffers_reinstate_offers_offers_offer_detail | null;
  insurer: ReinstatmentOffers_reinstate_offers_offers_insurer | null;
  classofbusiness: ReinstatmentOffers_reinstate_offers_offers_classofbusiness | null;
  created_at: any;
}

export interface ReinstatmentOffers_reinstate_offers {
  __typename: "Offer_all";
  total: number | null;
  offers: ReinstatmentOffers_reinstate_offers_offers[] | null;
}

export interface ReinstatmentOffers {
  reinstate_offers: ReinstatmentOffers_reinstate_offers | null;
}
