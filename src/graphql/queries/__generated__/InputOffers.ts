/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InputOffers
// ====================================================

export interface InputOffers_insurers {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_abbrv: string | null;
}

export interface InputOffers_reinsurers {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_abbrv: string | null;
}

export interface InputOffers_classOfBusinesses {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
}

export interface InputOffers {
  insurers: InputOffers_insurers[];
  reinsurers: InputOffers_reinsurers[];
  classOfBusinesses: InputOffers_classOfBusinesses[];
}
