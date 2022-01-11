/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailComponent } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SendTreatyClaimDebitNote
// ====================================================

export interface SendTreatyClaimDebitNote {
  sendTreatyClaimDebitNote: boolean | null;
}

export interface SendTreatyClaimDebitNoteVariables {
  single_document?: number | null;
  treaty_participant_id?: string | null;
  reinsurer_id?: string | null;
  paged?: number | null;
  treaty_id?: string | null;
  email_component?: EmailComponent | null;
}
