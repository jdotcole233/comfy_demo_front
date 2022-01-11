/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Offer_status, Payment_status } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: InsurerOffers
// ====================================================

export interface InsurerOffers_insurer_all_offers_offers_offer_retrocedent_reinsurer {
  __typename: "Reinsurer";
  reinsurer_id: string | null;
  re_company_email: string;
  re_company_name: string;
  re_company_website: string | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_retrocedent {
  __typename: "Offer_retrocedent";
  reinsurer: InsurerOffers_insurer_all_offers_offers_offer_retrocedent_reinsurer | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_endorsements_offer_endorsement_detail {
  __typename: "OfferEndorsementDetail";
  offer_comment: string | null;
  currency: string | null;
  offer_endorsement_detail_id: string | null;
  offer_detail: string | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_endorsements {
  __typename: "OfferEndorsement";
  sum_insured: number | null;
  premium: number | null;
  approval_status: string | null;
  created_at: any | null;
  updated_at: any | null;
  facultative_offer: number | null;
  offer_endorsement_id: string | null;
  fac_premium: number | null;
  offer_endorsement_detail: InsurerOffers_insurer_all_offers_offers_offer_endorsements_offer_endorsement_detail | null;
  commission_amount: number | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_participant_reinsurer {
  __typename: "Reinsurer";
  re_company_name: string;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_participant_offer_participant_payment_offer_deduction_charge {
  __typename: "Offer_deduction_payment";
  offer_deduction_payment_id: string;
  nic_levy_paid: number | null;
  withholding_tax_paid: number | null;
  brokerage_amount_paid: number | null;
  commission_taken: number | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_participant_offer_participant_payment {
  __typename: "Offer_participant_payment";
  offer_participant_payment_id: string;
  offer_payment_amount: number;
  paid_details: string;
  offer_deduction_charge: InsurerOffers_insurer_all_offers_offers_offer_participant_offer_participant_payment_offer_deduction_charge | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_participant {
  __typename: "Offer_participant";
  offer_participant_id: string | null;
  participant_fac_premium: number | null;
  offer_participant_percentage: number | null;
  reinsurer: InsurerOffers_insurer_all_offers_offers_offer_participant_reinsurer;
  offer_participant_payment: (InsurerOffers_insurer_all_offers_offers_offer_participant_offer_participant_payment | null)[] | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_payment {
  __typename: "Offer_payment";
  offer_payment_id: string;
  payment_details: string;
  payment_amount: number;
  offer_payment_comment: string;
  created_at: any;
  updated_at: any;
}

export interface InsurerOffers_insurer_all_offers_offers_classofbusiness {
  __typename: "Class_of_business";
  business_name: string;
}

export interface InsurerOffers_insurer_all_offers_offers_exchange_rate {
  __typename: "ExchangeRate";
  ex_rate: number | null;
  ex_currency: string | null;
}

export interface InsurerOffers_insurer_all_offers_offers_offer_detail {
  __typename: "Offer_details";
  offer_details: string;
  policy_number: string | null;
  period_of_insurance_from: any | null;
  period_of_insurance_to: any | null;
  offer_comment: string | null;
  information_comment: string | null;
  payment_type: string | null;
  insured_by: string;
  currency: string;
}

export interface InsurerOffers_insurer_all_offers_offers_insurer {
  __typename: "Insurer";
  insurer_company_name: string | null;
}

export interface InsurerOffers_insurer_all_offers_offers {
  __typename: "Offer";
  created_at: any;
  offer_id: string;
  offer_status: Offer_status;
  sum_insured: number;
  co_insurance_share: number | null;
  rate: number | null;
  fac_sum_insured: number;
  premium: number;
  fac_premium: number;
  brokerage: number;
  facultative_offer: number;
  payment_status: Payment_status;
  commission: number;
  commission_amount: number | null;
  offer_retrocedent: InsurerOffers_insurer_all_offers_offers_offer_retrocedent | null;
  offer_endorsements: (InsurerOffers_insurer_all_offers_offers_offer_endorsements | null)[] | null;
  offer_participant: (InsurerOffers_insurer_all_offers_offers_offer_participant | null)[] | null;
  offer_payment: (InsurerOffers_insurer_all_offers_offers_offer_payment | null)[] | null;
  classofbusiness: InsurerOffers_insurer_all_offers_offers_classofbusiness | null;
  exchange_rate: InsurerOffers_insurer_all_offers_offers_exchange_rate | null;
  offer_detail: InsurerOffers_insurer_all_offers_offers_offer_detail | null;
  insurer: InsurerOffers_insurer_all_offers_offers_insurer | null;
}

export interface InsurerOffers_insurer_all_offers {
  __typename: "Offer_all";
  total: number | null;
  offers: InsurerOffers_insurer_all_offers_offers[] | null;
}

export interface InsurerOffers {
  insurer_all_offers: InsurerOffers_insurer_all_offers | null;
}

export interface InsurerOffersVariables {
  skip?: number | null;
  id?: string | null;
}
