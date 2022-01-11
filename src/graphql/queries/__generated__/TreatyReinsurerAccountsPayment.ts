/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TreatyAccountPeriod } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TreatyReinsurerAccountsPayment
// ====================================================

export interface TreatyReinsurerAccountsPayment_treatyReinsurerAccountsPayment_treaty_p_payments {
  __typename: "TreatyPPayment";
  treaty_p_payment_id: string | null;
  treaty_payment_amount: number | null;
  treaty_payment_details: string | null;
  treaty_payment_comment: string | null;
  created_at: any | null;
  updated_at: any | null;
  surpulus_uuid: string | null;
  treaty_accountstreaty_account_id: string | null;
}

export interface TreatyReinsurerAccountsPayment_treatyReinsurerAccountsPayment {
  __typename: "TreatyAccount";
  treaty_account_id: string | null;
  account_periods: TreatyAccountPeriod | null;
  gross_premium: number | null;
  claim_settled: number | null;
  treaty_p_payments: (TreatyReinsurerAccountsPayment_treatyReinsurerAccountsPayment_treaty_p_payments | null)[] | null;
}

export interface TreatyReinsurerAccountsPayment {
  treatyReinsurerAccountsPayment: (TreatyReinsurerAccountsPayment_treatyReinsurerAccountsPayment | null)[] | null;
}

export interface TreatyReinsurerAccountsPaymentVariables {
  treaty_id?: string | null;
  treaty_participation_id?: string | null;
}
