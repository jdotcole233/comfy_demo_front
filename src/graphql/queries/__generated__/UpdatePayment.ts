/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReceivablePaymentInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePayment
// ====================================================

export interface UpdatePayment {
  updateReceivablePayment: boolean | null;
}

export interface UpdatePaymentVariables {
  receivable_payment_id?: string | null;
  receivable_payments?: ReceivablePaymentInput | null;
  treaty_id?: string | null;
}
