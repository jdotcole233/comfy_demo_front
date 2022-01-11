/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Expiry_status, Renewal_status, Offer_status, Payment_status, Claim_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Offers
// ====================================================

export interface Offers_offers_offers_employee {
  __typename: "Employee";
  emp_abbrv: string | null;
}

export interface Offers_offers_offers_document_messages_employee {
  __typename: "Employee";
  emp_abbrv: string | null;
  employee_id: string;
}

export interface Offers_offers_offers_document_messages {
  __typename: "Document_message";
  offersoffer_id: string | null;
  document_message: string | null;
  created_at: any | null;
  employee: Offers_offers_offers_document_messages_employee | null;
}

export interface Offers_offers_offers_exchange_rate {
  __typename: "ExchangeRate";
  ex_currency: string | null;
  ex_rate: number | null;
}

export interface Offers_offers_offers_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface Offers_offers_offers_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: Offers_offers_offers_offer_retrocedent_reinsurer | null;
}

export interface Offers_offers_offers_offer_detail {
  __typename: "Offer_details";
  offer_detail_id: string;
  offersoffer_id: string;
  policy_number: string | null;
  insured_by: string;
  period_of_insurance_to: any | null;
  period_of_insurance_from: any | null;
  payment_type: string | null;
  currency: string;
  offer_comment: string | null;
  information_comment: string | null;
  offer_details: string;
}

export interface Offers_offers_offers_offer_claims_offer_claim_participants {
  __typename: "Offer_claim_participant";
  offer_claimsoffer_claim_id: string | null;
  offer_claim_participant_id: string | null;
  reinsurer_id: string | null;
  offer_participantsoffer_participant_id: string | null;
  offer_participant_percentage: number | null;
  re_company_name: string | null;
  claim_share: number;
  created_at: any;
}

export interface Offers_offers_offers_offer_claims {
  __typename: "Offer_claim";
  offer_claim_id: string | null;
  claim_amount: number | null;
  claim_comment: string | null;
  claim_date: any | null;
  created_at: any | null;
  offer_claim_participants: (Offers_offers_offers_offer_claims_offer_claim_participants | null)[] | null;
}

export interface Offers_offers_offers_offer_endorsements_offer_endorsement_detail {
  __typename: "OfferEndorsementDetail";
  offer_comment: string | null;
  offer_endorsement_detail_id: string | null;
  offer_detail: string | null;
  currency: string | null;
}

export interface Offers_offers_offers_offer_endorsements {
  __typename: "OfferEndorsement";
  sum_insured: number | null;
  premium: number | null;
  approval_status: string | null;
  created_at: any | null;
  updated_at: any | null;
  facultative_offer: number | null;
  offer_endorsement_id: string | null;
  fac_premium: number | null;
  fac_sum_insured: number | null;
  offer_endorsement_detail: Offers_offers_offers_offer_endorsements_offer_endorsement_detail | null;
  commission_amount: number | null;
}

export interface Offers_offers_offers_offer_participant_offer_extra_charges {
  __typename: "Offer_extra_charges";
  nic_levy: number;
  agreed_brokerage_percentage: number;
  withholding_tax: number;
  agreed_commission: number | null;
  agreed_commission_amount: number | null;
  brokerage_amount: number;
  nic_levy_amount: number;
  withholding_tax_amount: number;
}

export interface Offers_offers_offers_offer_participant_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface Offers_offers_offers_offer_participant_reinsurer_reinsurer_address {
  __typename: "Reinsurer_address";
  country: string;
}

export interface Offers_offers_offers_offer_participant_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_name: string;
  re_company_email: string;
  reinsurer_address: Offers_offers_offers_offer_participant_reinsurer_reinsurer_address;
}

export interface Offers_offers_offers_offer_participant {
  __typename: "Offer_participant";
  offer_participant_id: string | null;
  offer_participant_percentage: number | null;
  offer_amount: number | null;
  participant_fac_premium: number | null;
  participant_fac_sum_insured: number | null;
  offer_extra_charges: Offers_offers_offers_offer_participant_offer_extra_charges | null;
  offer_deduction_charge: Offers_offers_offers_offer_participant_offer_deduction_charge | null;
  reinsurer: Offers_offers_offers_offer_participant_reinsurer;
}

export interface Offers_offers_offers_insurer_insurer_address {
  __typename: "Insurer_address";
  suburb: string | null;
  region: string | null;
  country: string | null;
}

export interface Offers_offers_offers_insurer {
  __typename: "Insurer";
  insurer_id: string | null;
  insurer_company_name: string | null;
  insurer_company_email: string | null;
  insurer_company_website: string | null;
  insurer_address: Offers_offers_offers_insurer_insurer_address | null;
}

export interface Offers_offers_offers_classofbusiness {
  __typename: "Class_of_business";
  class_of_business_id: string;
  business_name: string;
  business_details: string;
  created_at: any;
}

export interface Offers_offers_offers {
  __typename: "Offer";
  offer_id: string;
  rate: number | null;
  co_insurance_share: number | null;
  commission: number;
  commission_amount: number | null;
  expiry_status: Expiry_status;
  renewal_status: Renewal_status;
  brokerage: number;
  facultative_offer: number;
  placed_offer: number | null;
  sum_insured: number;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  offer_status: Offer_status;
  approval_status: string | null;
  payment_status: Payment_status;
  claim_status: Claim_status;
  employee: Offers_offers_offers_employee | null;
  document_messages: (Offers_offers_offers_document_messages | null)[] | null;
  exchange_rate: Offers_offers_offers_exchange_rate | null;
  offer_retrocedent: Offers_offers_offers_offer_retrocedent | null;
  offer_detail: Offers_offers_offers_offer_detail | null;
  offer_claims: (Offers_offers_offers_offer_claims | null)[] | null;
  offer_endorsements: (Offers_offers_offers_offer_endorsements | null)[] | null;
  offer_participant: (Offers_offers_offers_offer_participant | null)[] | null;
  insurer: Offers_offers_offers_insurer | null;
  classofbusiness: Offers_offers_offers_classofbusiness | null;
  created_at: any;
}

export interface Offers_offers {
  __typename: "Offer_all";
  offers: Offers_offers_offers[] | null;
}

export interface Offers {
  offers: Offers_offers | null;
  offerOverview: string;
}

export interface OffersVariables {
  offer_status: (string | null)[];
  skip?: number | null;
  approval_status?: string | null;
}
