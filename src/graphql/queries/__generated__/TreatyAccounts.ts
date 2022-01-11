/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TreatyAccounts
// ====================================================

export interface TreatyAccounts_fetchTreatyAccounts_surpluses {
  __typename: "AccountResponseDepth";
  gross_premium: number | null;
  claim_settled: number | null;
  cash_loss: number | null;
}

export interface TreatyAccounts_fetchTreatyAccounts {
  __typename: "AccountResponse";
  treaty_id: string | null;
  currency: string | null;
  quarters: (string | null)[] | null;
  quarter: string | null;
  account_year: string | null;
  layer_limit: string | null;
  surpluses: (TreatyAccounts_fetchTreatyAccounts_surpluses | null)[] | null;
}

export interface TreatyAccounts {
  fetchTreatyAccounts: (TreatyAccounts_fetchTreatyAccounts | null)[] | null;
}

export interface TreatyAccountsVariables {
  insurer_id?: string | null;
  treaty_program_name?: string | null;
  treaty_period_from?: any | null;
  treaty_period_to?: any | null;
  type?: boolean | null;
  quarter?: string | null;
}
