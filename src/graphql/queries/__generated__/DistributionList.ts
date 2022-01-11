/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DistributionList
// ====================================================

export interface DistributionList_reinsurers_reinsurer_representatives_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
}

export interface DistributionList_reinsurers_reinsurer_representatives {
  __typename: "Reinsurer_representative";
  rep_last_name: string;
  rep_first_name: string;
  reinsurer_representative_id: string | null;
  reinsurersreinsurer_id: string;
  reinsurer: DistributionList_reinsurers_reinsurer_representatives_reinsurer;
}

export interface DistributionList_reinsurers {
  __typename: "Reinsurer";
  reinsurer_representatives: (DistributionList_reinsurers_reinsurer_representatives | null)[] | null;
}

export interface DistributionList {
  reinsurers: DistributionList_reinsurers[];
}
