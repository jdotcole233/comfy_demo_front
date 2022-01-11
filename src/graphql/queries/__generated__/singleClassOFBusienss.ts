/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: singleClassOFBusienss
// ====================================================

export interface singleClassOFBusienss_singleClassOfBusiness {
  __typename: "Class_of_business";
  single_total_overview: string | null;
  single_total_offers: number | null;
  business_name: string;
  business_details: string;
  class_of_business_id: string;
}

export interface singleClassOFBusienss {
  singleClassOfBusiness: singleClassOFBusienss_singleClassOfBusiness;
}

export interface singleClassOFBusienssVariables {
  id: string;
}
