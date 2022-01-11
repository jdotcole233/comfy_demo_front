/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Claim_status {
  CLAIMED = "CLAIMED",
  UNCLAIMED = "UNCLAIMED",
}

export enum Expiry_status {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export enum Offer_status {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  PENDING = "PENDING",
}

export enum Payment_status {
  PAID = "PAID",
  PARTPAYMENT = "PARTPAYMENT",
  UNPAID = "UNPAID",
}

export enum Renewal_status {
  NOTRENEWED = "NOTRENEWED",
  RENEWED = "RENEWED",
}

export enum Sent_status {
  SENT = "SENT",
  UNSENT = "UNSENT",
}

export enum TreatyAccountPeriod {
  FIRSTQUARTER = "FIRSTQUARTER",
  FOURTHQUARTER = "FOURTHQUARTER",
  SECONDQUARTER = "SECONDQUARTER",
  THIRDQUARTER = "THIRDQUARTER",
}

export enum TreatyType {
  NONPROPORTIONAL = "NONPROPORTIONAL",
  PROPORTIONAL = "PROPORTIONAL",
}

export interface Convert_type {
  currency?: string | null;
  rate?: number | null;
}

export interface Deductions {
  commission?: number | null;
  nic_levy?: number | null;
  withholding_tax?: number | null;
  brokerage?: number | null;
  participating_percentage?: number | null;
}

export interface EmailComponent {
  subject?: string | null;
  email_content?: string | null;
  copied_email?: (string | null)[] | null;
  attachments?: (any | null)[] | null;
}

export interface ExtendedTreatyDetails {
  type?: TreatyType | null;
  proportional_detail?: TreatyProportionalDetailInput | null;
  np_detail?: TreatyNPDetailInput | null;
}

export interface LimitData {
  treaty_id?: string | null;
  limit?: string | null;
}

export interface NPTreatyData {
  email_component?: EmailComponent | null;
  limit?: number | null;
  m_and_d_premium?: number | null;
  total_participation_percentage?: number | null;
  installment_type?: number | null;
  layer?: number | null;
  treaty_id?: number | null;
  participant_id?: number | null;
  uuid?: string | null;
}

export interface PaymentDetails {
  payment_amount: number;
  treaty_id?: string | null;
  treaty_account_id?: string | null;
  payment_id?: string | null;
  payment_details: string;
  payment_comment?: string | null;
  payment_status: string;
  uuid?: string | null;
  installment_type?: number | null;
  auto_payment_receipt?: boolean | null;
}

export interface PortFolioEntry {
  withdrawal_percentage?: number | null;
  withdrawal_loss_percentage?: number | null;
  assumption_percentage?: number | null;
  assumption_loss_percentage?: number | null;
}

export interface Query_data {
  client_type?: string | null;
  from?: any | null;
  to?: any | null;
  payment_status?: (string | null)[] | null;
  offer_status?: (string | null)[] | null;
  period_status?: (string | null)[] | null;
  reinsurer_id?: string | null;
  insurer_id?: string | null;
  business_id?: (string | null)[] | null;
  convert_from?: (Convert_type | null)[] | null;
  convert_to?: string | null;
}

export interface ReceivablePaymentInput {
  payment_amount?: number | null;
  treaty_participation_id?: string | null;
  treaty_claimstreaty_claim_id?: string | null;
  uuid?: string | null;
  payment_detail?: string | null;
}

export interface ReinsurerParticipationUpdate {
  treaty_participant_deduction_id?: (string | null)[] | null;
  participant_id?: string | null;
  deductions?: Deductions | null;
}

export interface Reinsurer_representative_data {
  reinsurer_id: string;
  representatives_ids: string[];
}

export interface TreatyAccountData {
  treatiestreaty_id: string;
  account_year?: string | null;
  account_periods?: TreatyAccountPeriod | null;
  participant_deduction_id?: string | null;
  exchange_rate?: string | null;
  surpulus_data?: (TreatyAccountSurpulusInput | null)[] | null;
}

export interface TreatyAccountSurpulusInput {
  surpulus_uuid: string;
  gross_premium: number;
  claim_settled?: number | null;
  cash_loss?: number | null;
  account_deduction_id?: string | null;
}

export interface TreatyAssociateDeductionData {
  commission?: number | null;
  brokerage: number;
  nic_levy: number;
  withholding_tax: number;
  treaty_period_from: any;
  treaty_period_to: any;
  treaty_programstreaty_program_id: string;
}

export interface TreatyClaimData {
  policy_number?: string | null;
  claim_number?: string | null;
  insured_name: string;
  date_of_loss?: any | null;
  claim_date?: any | null;
  claim_paid: number;
  layer_number: number;
  expected_deductible?: number | null;
  treaty_comment?: string | null;
  treaty_claim_details?: string | null;
}

export interface TreatyData {
  treaty_details?: string | null;
  currency?: string | null;
  order_hereon?: number | null;
  treaty_reference?: string | null;
  kek_reference?: string | null;
  insurersinsurer_id?: string | null;
  treaty_programstreaty_program_id?: string | null;
  treaty_associate_deductionstreaty_associate_deduction_id?: string | null;
  layer_limit?: string | null;
  installment_type?: number | null;
  m_and_d_premium?: number | null;
  treaty_extended_details?: ExtendedTreatyDetails | null;
}

export interface TreatyNPDetailInput {
  egrnpi?: number | null;
  adjustment_created?: boolean | null;
}

export interface TreatyPaymentDistribution {
  payment_details?: string | null;
  payment_comment?: string | null;
  participant_payment_id?: string | null;
}

export interface TreatyProgramData {
  treaty_type?: TreatyType | null;
  treaty_name: string;
  treaty_details?: string | null;
  insurersinsurer_id?: string | null;
}

export interface TreatyProportionalDetailInput {
  treaty_id?: string | null;
  profit_commission?: number | null;
  re_mgmt_expense?: number | null;
  portfolio_entry?: PortFolioEntry | null;
  ernpi?: number | null;
  overall_gross_premium?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
