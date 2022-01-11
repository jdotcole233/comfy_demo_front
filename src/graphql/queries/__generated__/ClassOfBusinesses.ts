/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassOfBusinesses
// ====================================================

export interface ClassOfBusinesses_classOfBusinesses {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
  created_at: any;
}

export interface ClassOfBusinesses {
  classOfBusinesses: ClassOfBusinesses_classOfBusinesses[];
  offerOverview: string;
}
