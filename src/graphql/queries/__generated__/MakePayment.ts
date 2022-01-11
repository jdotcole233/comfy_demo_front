/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReceivablePaymentInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: MakePayment
// ====================================================

export interface MakePayment {
  recordReceivablePayment: boolean | null;
}

export interface MakePaymentVariables {
  treaty_id?: string | null;
  receivable_payments?: (ReceivablePaymentInput | null)[] | null;
}
