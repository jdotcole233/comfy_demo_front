/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status, Payment_status, Claim_status, Sent_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findOffer
// ====================================================

export interface findOffer_findSingleOffer_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface findOffer_findSingleOffer_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: findOffer_findSingleOffer_offer_retrocedent_reinsurer | null;
}

export interface findOffer_findSingleOffer_document_messages_employee {
  __typename: "Employee";
  emp_abbrv: string | null;
  employee_id: string;
}

export interface findOffer_findSingleOffer_document_messages {
  __typename: "Document_message";
  offersoffer_id: string | null;
  document_message: string | null;
  created_at: any | null;
  employee: findOffer_findSingleOffer_document_messages_employee | null;
}

export interface findOffer_findSingleOffer_exchange_rate {
  __typename: "ExchangeRate";
  ex_currency: string | null;
  ex_rate: number | null;
}

export interface findOffer_findSingleOffer_offer_detail {
  __typename: "Offer_details";
  offer_detail_id: string;
  offersoffer_id: string;
  policy_number: string | null;
  insured_by: string;
  period_of_insurance_to: any | null;
  period_of_insurance_from: any | null;
  currency: string;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
  payment_type: string | null;
}

export interface findOffer_findSingleOffer_offer_participant_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
}

export interface findOffer_findSingleOffer_offer_participant {
  __typename: "Offer_participant";
  offer_participant_id: string | null;
  offer_participant_percentage: number | null;
  reinsurer: findOffer_findSingleOffer_offer_participant_reinsurer;
}

export interface findOffer_findSingleOffer_classofbusiness {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
}

export interface findOffer_findSingleOffer_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_company_website: string | null;
}

export interface findOffer_findSingleOffer_offer_associates_reinsurer_representative_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
  re_company_email: string;
}

export interface findOffer_findSingleOffer_offer_associates_reinsurer_representative {
  __typename: "Reinsurer_representative";
  rep_email: string;
  rep_first_name: string;
  rep_last_name: string;
  rep_primary_phonenumber: string;
  rep_secondary_phonenumber: string | null;
  reinsurer: findOffer_findSingleOffer_offer_associates_reinsurer_representative_reinsurer;
}

export interface findOffer_findSingleOffer_offer_associates {
  __typename: "Offer_to_associates";
  offer_to_associate_id: string;
  sent_status: Sent_status;
  reinsurer_representative: findOffer_findSingleOffer_offer_associates_reinsurer_representative | null;
}

export interface findOffer_findSingleOffer {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  commission: number;
  co_insurance_share: number | null;
  commission_amount: number | null;
  brokerage: number;
  facultative_offer: number;
  placed_offer: number | null;
  sum_insured: number;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  offer_status: Offer_status;
  payment_status: Payment_status;
  claim_status: Claim_status;
  offer_retrocedent: findOffer_findSingleOffer_offer_retrocedent | null;
  document_messages: (findOffer_findSingleOffer_document_messages | null)[] | null;
  exchange_rate: findOffer_findSingleOffer_exchange_rate | null;
  offer_detail: findOffer_findSingleOffer_offer_detail | null;
  offer_participant: (findOffer_findSingleOffer_offer_participant | null)[] | null;
  classofbusiness: findOffer_findSingleOffer_classofbusiness | null;
  insurer: findOffer_findSingleOffer_insurer | null;
  offer_associates: (findOffer_findSingleOffer_offer_associates | null)[] | null;
}

export interface findOffer {
  findSingleOffer: findOffer_findSingleOffer;
}

export interface findOfferVariables {
  offer_id: string;
}
