/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentDetails } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditReinsurerTreatyPayment
// ====================================================

export interface EditReinsurerTreatyPayment {
  updateEachReinsurerPaymentDetails: boolean | null;
}

export interface EditReinsurerTreatyPaymentVariables {
  id?: string | null;
  payment?: PaymentDetails | null;
}
