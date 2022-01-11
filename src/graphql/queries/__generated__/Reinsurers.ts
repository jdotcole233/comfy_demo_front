/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Reinsurers
// ====================================================

export interface Reinsurers_reinsurers_reinsurer_address {
  __typename: "Reinsurer_address";
  region: string;
  suburb: string;
  street: string;
  country: string;
}

export interface Reinsurers_reinsurers_reinsurer_representatives {
  __typename: "Reinsurer_representative";
  reinsurer_representative_id: string | null;
  rep_email: string;
  rep_last_name: string;
  rep_first_name: string;
  rep_primary_phonenumber: string;
  position: string;
  rep_secondary_phonenumber: string | null;
}

export interface Reinsurers_reinsurers {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_abbrv: string | null;
  re_company_name: string;
  re_company_email: string;
  re_company_website: string | null;
  reinsurer_address: Reinsurers_reinsurers_reinsurer_address;
  reinsurer_representatives: (Reinsurers_reinsurers_reinsurer_representatives | null)[] | null;
}

export interface Reinsurers {
  reinsurers: Reinsurers_reinsurers[];
}
