/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status, Payment_status, Claim_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: dashboard
// ====================================================

export interface dashboard_offers_offers_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface dashboard_offers_offers_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: dashboard_offers_offers_offer_retrocedent_reinsurer | null;
}

export interface dashboard_offers_offers_offer_detail {
  __typename: "Offer_details";
  offersoffer_id: string;
  policy_number: string | null;
  insured_by: string;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  payment_type: string | null;
  currency: string;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
}

export interface dashboard_offers_offers_offer_participant_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
}

export interface dashboard_offers_offers_offer_participant {
  __typename: "Offer_participant";
  reinsurer: dashboard_offers_offers_offer_participant_reinsurer;
}

export interface dashboard_offers_offers_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_company_website: string | null;
}

export interface dashboard_offers_offers_classofbusiness {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
  created_at: any;
}

export interface dashboard_offers_offers {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  commission: number;
  co_insurance_share: number | null;
  commission_amount: number | null;
  brokerage: number;
  facultative_offer: number;
  sum_insured: number;
  fac_sum_insured: number;
  offer_retrocedent: dashboard_offers_offers_offer_retrocedent | null;
  premium: number;
  fac_premium: number;
  offer_status: Offer_status;
  payment_status: Payment_status;
  claim_status: Claim_status;
  offer_detail: dashboard_offers_offers_offer_detail | null;
  offer_participant: (dashboard_offers_offers_offer_participant | null)[] | null;
  insurer: dashboard_offers_offers_insurer | null;
  classofbusiness: dashboard_offers_offers_classofbusiness | null;
  created_at: any;
}

export interface dashboard_offers {
  __typename: "Offer_all";
  offers: dashboard_offers_offers[] | null;
}

export interface dashboard {
  offerOverview: string;
  dashboardByPieChartData: string | null;
  offers: dashboard_offers | null;
}

export interface dashboardVariables {
  year?: string | null;
  month?: string | null;
}
