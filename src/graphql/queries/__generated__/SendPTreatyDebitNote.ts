/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailComponent } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendPTreatyDebitNote
// ====================================================

export interface SendPTreatyDebitNote {
  sendPTreatyDebitNote: boolean | null;
}

export interface SendPTreatyDebitNoteVariables {
  treaty_account_ids?: (string | null)[] | null;
  treaty_id?: string | null;
  email_component?: EmailComponent | null;
}
