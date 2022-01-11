/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Insurers
// ====================================================

export interface Insurers_insurers_remainders {
  __typename: "Remainder";
  remainder_id: string | null;
  offersoffer_id: string | null;
  insurersinsurer_id: string | null;
  postponed_till: any | null;
}

export interface Insurers_insurers_insurer_associates {
  __typename: "Insurer_associate";
  insurer_associate_id: string;
}

export interface Insurers_insurers_insurer_address {
  __typename: "Insurer_address";
  suburb: string | null;
  region: string | null;
  country: string | null;
  street: string | null;
}

export interface Insurers_insurers {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_abbrv: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_company_website: string | null;
  remainders: (Insurers_insurers_remainders | null)[] | null;
  insurer_associates: (Insurers_insurers_insurer_associates | null)[] | null;
  insurer_address: Insurers_insurers_insurer_address | null;
}

export interface Insurers {
  insurers: Insurers_insurers[];
}
