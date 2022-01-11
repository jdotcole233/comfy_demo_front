/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailComponent } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendPTreatyCreditAndStatementNote
// ====================================================

export interface SendPTreatyCreditAndStatementNote {
  sendPTreatyCreditAndStatementNote: boolean | null;
}

export interface SendPTreatyCreditAndStatementNoteVariables {
  treaty_account_id?: (string | null)[] | null;
  participant_id?: string | null;
  docType?: (string | null)[] | null;
  treaty_id?: string | null;
  email_component?: EmailComponent | null;
}
