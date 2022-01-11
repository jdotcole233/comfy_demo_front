/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Endorsement
// ====================================================

export interface Endorsement_singleEndorsement_classofbusiness {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
}

export interface Endorsement_singleEndorsement_insurer_insurer_address {
  __typename: "Insurer_address";
  insurer_address_id: string | null;
  region: string | null;
  country: string | null;
  street: string | null;
  suburb: string | null;
}

export interface Endorsement_singleEndorsement_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_email: string | null;
  insurer_company_name: string | null;
  insurer_address: Endorsement_singleEndorsement_insurer_insurer_address | null;
}

export interface Endorsement_singleEndorsement_offer_endorsement_detail {
  __typename: "OfferEndorsementDetail";
  offer_detail: string | null;
  information_comment: string | null;
  offer_comment: string | null;
  currency: string | null;
  insured_by: string | null;
  policy_number: string | null;
  period_of_insurance_to: any | null;
  period_of_insurance_from: any | null;
  offer_endorsement_detail_id: string | null;
}

export interface Endorsement_singleEndorsement {
  __typename: "OfferEndorsement";
  offer_endorsement_id: string | null;
  rate: number | null;
  commission: number | null;
  brokerage: number | null;
  commission_amount: number | null;
  facultative_offer: number | null;
  co_insurance_share: number | null;
  sum_insured: number | null;
  fac_sum_insured: number | null;
  premium: number | null;
  fac_premium: number | null;
  endorsement_status: Offer_status | null;
  approval_status: string | null;
  classofbusiness: Endorsement_singleEndorsement_classofbusiness | null;
  insurer: Endorsement_singleEndorsement_insurer | null;
  offer_endorsement_detail: Endorsement_singleEndorsement_offer_endorsement_detail | null;
}

export interface Endorsement {
  singleEndorsement: Endorsement_singleEndorsement | null;
}

export interface EndorsementVariables {
  id?: string | null;
}
