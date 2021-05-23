import gql from 'graphql-tag';

export const FETCH_CLASS_OF_BUSINESS = gql`
  {
    classOfBusinesses {
      class_of_business_id
      business_name
      business_details
      created_at
    }
    offerOverview(filter_by: ["PENDING", "OPEN", "CLOSED"])
  }
`;

export const CLASS_OF_BUSINESS = gql`
  query singleClassOFBusienss($id: ID!) {
    singleClassOfBusiness(class_of_business_id: $id) {
      single_total_overview
      single_total_offers
      business_name
      business_details
      class_of_business_id
    }
  }
`;

export const REINSURERS = gql`
  {
    reinsurers {
      reinsurer_id
      re_abbrv
      re_company_name
      re_company_email
      re_company_website
      reinsurer_address {
        region
        suburb
        street
        country
      }
      reinsurer_representatives {
        reinsurer_representative_id
        rep_email
        rep_last_name
        rep_first_name
        rep_primary_phonenumber
        position
        rep_secondary_phonenumber
      }
    }
  }
`;

export const INSURERS = gql`
  {
    insurers {
      insurer_id
      insurer_abbrv
      insurer_company_name
      insurer_company_email
      insurer_company_website
      remainders {
        remainder_id
        offersoffer_id
        insurersinsurer_id
        postponed_till
      }
      insurer_associates {
        insurer_associate_id
      }
      insurer_address {
        suburb
        region
        country
        street
      }
    }
  }
`;

export const REINSURER = gql`
  query getReinsurer($id: ID!) {
    reinsurer(reinsurer_id: $id) {
      re_company_name
      re_abbrv
      re_company_email
      re_company_website
      reinsurer_id

      reinsurer_address {
        street
        suburb
        region
        country
      }

      reinsurer_overview {
        brokerage_chart
        total_paid
        total_unpaid
        total_closed
        total_pending
        total_fac_premium
        total_brokerage_amt
        total_nic_tax
        total_withholding_tax
      }

      reinsurer_representatives {
        reinsurer_representative_id
        rep_first_name
        rep_last_name
        rep_primary_phonenumber
        rep_secondary_phonenumber
        rep_email
        position
      }

      offers_participant {
        offersoffer_id
        offer_participant_id
        offer_detail {
          currency
          policy_number
        }
        offer_participant_percentage
        participant_fac_premium
        offer_extra_charges {
          offer_extra_charge_id
          withholding_tax
          agreed_commission
          nic_levy
          agreed_brokerage_percentage
        }
        offer_participant_payment {
          offer_participant_payment_id
          offer_payment_amount
          paid_details
          offer_participant_payment_comment
          payment_status
          created_at
          updated_at
          offer_deduction_charge {
            offer_deduction_payment_id
            nic_levy_paid
            withholding_tax_paid
            brokerage_amount_paid
            commission_taken
          }
        }
        reinsurer_offers_only {
          offer_id
          rate
          premium
          brokerage
          fac_premium
          facultative_offer
          commission
          co_insurance_share
          offer_retrocedent {
        reinsurer {
          reinsurer_id
          re_company_email
          re_company_name
          re_company_website
        }
      }
          fac_sum_insured
          sum_insured
          created_at
          offer_status
          payment_status
          classofbusiness {
            business_name
            class_of_business_id
            business_details
          }
          insurer {
            insurer_company_name
          }
          exchange_rate {
            ex_rate
            ex_currency
          }
          offer_detail {
            insured_by
            currency
            policy_number
            period_of_insurance_from
            period_of_insurance_to
            offer_comment
            information_comment
            offer_details
            payment_type
          }
        }
      }
    }
  }
`;

export const OFFERS = gql`
query getOffers(
  $offer_status: [String]!
  $skip: Int
  $approval_status: String
) {
  offers(
    offer_status: $offer_status
    skip: $skip
    approval_status: $approval_status
  ) {
    offers {
      offer_id
      rate
      co_insurance_share
      commission
      commission_amount
      brokerage
      facultative_offer
      placed_offer
      sum_insured
      fac_sum_insured
      premium
      fac_premium
      offer_status
      approval_status
      payment_status
      claim_status
      employee {
        emp_abbrv
      }
      document_messages {
        offersoffer_id
        document_message
        created_at
        employee {
          emp_abbrv
          employee_id
        }
      }
      exchange_rate {
        ex_currency
        ex_rate
      }
      offer_detail {
        offer_detail_id
        offersoffer_id
        policy_number
        insured_by
        period_of_insurance_to
        period_of_insurance_from
        currency
        offer_comment
        information_comment
        offer_details
      }
      offer_claims {
        offer_claim_id
        claim_amount
        claim_comment
        claim_date
        created_at
        offer_claim_participants {
          offer_claimsoffer_claim_id
          offer_claim_participant_id
          reinsurer_id
          offer_participantsoffer_participant_id
          offer_participant_percentage
          re_company_name
          claim_share
          created_at
        }
      }
      offer_endorsements {
        sum_insured
          premium
          approval_status
          created_at
          updated_at
          facultative_offer
          offer_endorsement_id
          fac_premium
          fac_sum_insured
          offer_endorsement_detail {
            offer_comment
            offer_endorsement_detail_id
            offer_detail
            currency
          }
          commission_amount
      }
      offer_participant {
        offer_participant_id
        offer_participant_percentage
        offer_amount
        participant_fac_premium
        participant_fac_sum_insured
        offer_extra_charges {
          nic_levy
          agreed_brokerage_percentage
          withholding_tax
          agreed_commission
          agreed_commission_amount
          brokerage_amount
          nic_levy_amount
          withholding_tax_amount
        }
        offer_deduction_charge {
          nic_levy_paid
          withholding_tax_paid
          brokerage_amount_paid
          commission_taken
        }
        reinsurer {
          reinsurer_id
          re_company_name
          re_company_email
          reinsurer_address {
            country
          }
        }
      }
      insurer {
        insurer_id
        insurer_company_name
        insurer_company_email
        insurer_company_website
        insurer_address {
          suburb
          region
          country
        }
      }
      classofbusiness {
        class_of_business_id
        business_name
        business_details
        created_at
      }
      created_at
    }
  }
  offerOverview(filter_by: $offer_status)
}
`;

export const ALLOFFERS = gql`
query getOffers(
  $offer_status: [String]!
  $skip: Int
  $approval_status: String
) {
  offers_all(
    offer_status: $offer_status
    skip: $skip
    approval_status: $approval_status
  ) {
    offers {
      offer_id
      rate
      co_insurance_share
      commission
      commission_amount
      brokerage
      facultative_offer
      placed_offer
      sum_insured
      fac_sum_insured
      premium
      fac_premium
      offer_status
      approval_status
      payment_status
      claim_status
      employee {
        emp_abbrv
      }
      document_messages {
        offersoffer_id
        document_message
        created_at
        employee {
          emp_abbrv
          employee_id
        }
      }
      exchange_rate {
        ex_currency
        ex_rate
      }
      offer_detail {
        offer_detail_id
        offersoffer_id
        policy_number
        insured_by
        period_of_insurance_to
        period_of_insurance_from
        currency
        offer_comment
        information_comment
        offer_details
      }
      offer_claims {
        offer_claim_id
        claim_amount
        claim_comment
        claim_date
        created_at
        offer_claim_participants {
          offer_claimsoffer_claim_id
          offer_claim_participant_id
          reinsurer_id
          offer_participantsoffer_participant_id
          offer_participant_percentage
          re_company_name
          claim_share
          created_at
        }
      }
      offer_endorsements {
        sum_insured
        premium
        approval_status
        created_at
        updated_at
        facultative_offer
        offer_endorsement_id
        fac_premium
        fac_sum_insured
        offer_endorsement_detail {
          offer_comment
          offer_endorsement_detail_id
          offer_detail
          currency
        }
        commission_amount
      }
      offer_participant {
        offer_participant_id
        offer_participant_percentage
        offer_amount
        participant_fac_premium
        participant_fac_sum_insured
        offer_extra_charges {
          nic_levy
          agreed_brokerage_percentage
          withholding_tax
          agreed_commission
          agreed_commission_amount
          brokerage_amount
          nic_levy_amount
          withholding_tax_amount
        }
        offer_deduction_charge {
          nic_levy_paid
          withholding_tax_paid
          brokerage_amount_paid
          commission_taken
        }
        reinsurer {
          reinsurer_id
          re_company_name
          re_company_email
          reinsurer_address {
            country
          }
        }
      }
      insurer {
        insurer_id
        insurer_company_name
        insurer_company_email
        insurer_company_website
        insurer_address {
          suburb
          region
          country
        }
      }
      classofbusiness {
        class_of_business_id
        business_name
        business_details
        created_at
      }
      created_at
    }
    total
  }
}
`;

export const INPUT_OFFER_QUERIES = gql`
  {
    insurers {
      insurer_id
      insurer_company_name
      insurer_company_email
      insurer_abbrv
    }
    reinsurers {
      reinsurer_id
      re_company_email
      re_company_name
      re_abbrv
    }
    classOfBusinesses {
      class_of_business_id
      business_name
      business_details
    }
  }
`;

export const CREATE_DISTRIBUTION_LIST_DATA = gql`
  {
    reinsurers {
      reinsurer_representatives {
        rep_last_name
        rep_first_name
        reinsurer_representative_id
        reinsurersreinsurer_id
        reinsurer {
          re_company_name
        }
      }
    }
  }
`;

export const SINGLE_OFFER = gql`
  query findOffer($offer_id: ID!) {
    findSingleOffer(offer_id: $offer_id) {
      offer_id
      rate
      commission
      # reinsurer_id
      co_insurance_share
      commission_amount
      brokerage
      facultative_offer
      placed_offer
      sum_insured
      fac_sum_insured
      premium
      fac_premium
      offer_status
      payment_status
      claim_status
      offer_retrocedent {
        reinsurer {
          reinsurer_id
          re_company_email
          re_company_name
          re_company_website
        }
      }
      document_messages {
        offersoffer_id
        document_message
        created_at
        employee {
          emp_abbrv
          employee_id
        }
      }
      exchange_rate {
        ex_currency
        ex_rate
      }
      offer_detail {
        offer_detail_id
        offersoffer_id
        policy_number
        insured_by
        period_of_insurance_to
        period_of_insurance_from
        currency
        offer_comment
        information_comment
        offer_details
        payment_type 
      }
      offer_participant {
        offer_participant_id
        offer_participant_percentage
        reinsurer {
          reinsurer_id
          re_company_name
          re_company_email
        }
      }

      classofbusiness {
        class_of_business_id
        business_name
        business_details
      }

      insurer {
        insurer_id
        insurer_company_name
        insurer_company_email
        insurer_company_website
      }

      offer_associates {
        offer_to_associate_id
        sent_status
        reinsurer_representative {
          rep_email
          rep_first_name
          rep_last_name
          rep_primary_phonenumber
          rep_secondary_phonenumber
          reinsurer {
            re_company_name
            re_company_email
          }
        }
      }
    }
  }
`;

export const DASHBOARD_PIE_DATA = gql`
  query dashboard($year: String, $month: String) {
    dashboardByPieChartData(year: $year, month: $month)
  }
`;

export const DASHBOARD = gql`
  query dashboard($year: String, $month: String) {
    offerOverview(filter_by: ["PENDING", "OPEN", "CLOSED"])
    dashboardByPieChartData(year: $year, month: $month)
    offers(offer_status: ["OPEN", "PENDING"]) {
      offers {
        offer_id
        rate
        commission
        co_insurance_share
        commission_amount
        brokerage
        facultative_offer
        sum_insured
        fac_sum_insured
        offer_retrocedent {
        reinsurer {
          reinsurer_id
          re_company_email
          re_company_name
          re_company_website
        }
      }
        premium
        fac_premium
        offer_status
        payment_status
        claim_status
        offer_detail {
          offersoffer_id
          policy_number
          insured_by
          period_of_insurance_from
          period_of_insurance_to
          payment_type
          currency
          offer_comment
          information_comment
          offer_details
        }
        offer_participant {
          reinsurer {
            re_company_name
          }
        }
        insurer {
          insurer_id
          insurer_company_name
          insurer_company_email
          insurer_company_website
        }
        classofbusiness {
          class_of_business_id
          business_name
          business_details
          created_at
        }
        created_at
      }
    }
  }
`;

export const INSURER = gql`
  query insurer($id: ID!) {
    insurer(insurer_id: $id) {
      insurer_id
      insurer_company_name
      insurer_company_email
      insurer_abbrv
      insurer_company_website
      insurer_address {
        suburb
        country
        street
        region
      }
      remainders {
        remainder_id
        offersoffer_id
        insurersinsurer_id
        postponed_till
      }
      insurer_associates {
        insurer_associate_id
        assoc_last_name
        assoc_email
        position
        assoc_first_name
        assoc_primary_phonenumber
        assoc_secondary_phonenumber
      }
      insurer_overview {
        total_paid
        total_unpaid
        total_closed
        total_pending
        total_fac_premium
        total_brokerage_amt
        brokerage_chart
      }
      offers {
        created_at
        offer_id
        offer_status
        sum_insured
        co_insurance_share
        rate
        fac_sum_insured
        premium
        fac_premium
        brokerage
        facultative_offer
        payment_status
        commission
        commission_amount
        offer_retrocedent {
        reinsurer {
          reinsurer_id
          re_company_email
          re_company_name
          re_company_website
        }
      }
        offer_endorsements {
        sum_insured
          premium
          approval_status
          created_at
          updated_at
          facultative_offer
          offer_endorsement_id
          fac_premium
          offer_endorsement_detail {
            offer_comment
            currency
            offer_endorsement_detail_id
            offer_detail
          }
          commission_amount
      }
        offer_participant {
          offer_participant_id
          participant_fac_premium
          offer_participant_percentage
          reinsurer {
            re_company_name
          }

          offer_participant_payment {
            offer_participant_payment_id
            offer_payment_amount
            paid_details
            offer_deduction_charge {
              offer_deduction_payment_id
              nic_levy_paid
              withholding_tax_paid
              brokerage_amount_paid
              commission_taken
            }
          }
        }
        offer_payment {
          offer_payment_id
          payment_details
          payment_amount
          offer_payment_comment
          created_at
          updated_at
        }
        classofbusiness {
          business_name
        }
        exchange_rate {
          ex_rate
          ex_currency
        }
        offer_detail {
          offer_details
          policy_number
          period_of_insurance_from
          period_of_insurance_to
          offer_comment
          information_comment
          payment_type
          insured_by
          currency
        }
        insurer {
          insurer_company_name
        }
      }
    }
  }
`;

export const GET_ISNURER_DEDUCTIONS = gql`
  query dd($id: ID!, $offer_id: ID, $payment_id: ID!) {
    getOfferparticipantDeductions(
      insurer_id: $id
      offer_id: $offer_id
      payment_id: $payment_id
    )
  }
`;

export const CLAIM_OVERVIEW = gql`
  {
    claimOverview(offer_status: ["CLOSED"])
  }
`;

export const INSURER_OFFERS = gql`
  # Write your query or mutation here
  query insurer_offers($skip: Int, $id: ID) {
    insurer_all_offers(skip: $skip, insurer_id: $id) {
      total
      offers {
        created_at
        offer_id
        offer_status
        sum_insured
        co_insurance_share
        rate
        fac_sum_insured
        premium
        fac_premium
        brokerage
        facultative_offer
        payment_status
        commission
        commission_amount
        offer_participant {
          offer_participant_id
          participant_fac_premium
          offer_participant_percentage
          reinsurer {
            re_company_name
          }

          offer_participant_payment {
            offer_participant_payment_id
            offer_payment_amount
            paid_details
            offer_deduction_charge {
              offer_deduction_payment_id
              nic_levy_paid
              withholding_tax_paid
              brokerage_amount_paid
              commission_taken
            }
          }
        }
        offer_payment {
          offer_payment_id
          payment_details
          payment_amount
          offer_payment_comment
          created_at
          updated_at
        }
        classofbusiness {
          business_name
        }
        offer_detail {
          offer_details
          policy_number
          period_of_insurance_from
          period_of_insurance_to
          offer_comment
          information_comment
          insured_by
          currency
        }
        insurer {
          insurer_company_name
        }
      }
    }
  }
`;

export const REINSURER_OFFERS = gql`
  query reinsurers_offers($skip: Int, $id: ID) {
    reinsurer_all_offers(reinsurer_id: $id, skip: $skip) {
      offers {
        offersoffer_id
        reinsurer {
          reinsurer_id
        }
        offer_participant_id
        offer_detail {
          currency
          policy_number
        }
        offer_participant_percentage
        participant_fac_premium
        offer_extra_charges {
          offer_extra_charge_id
          withholding_tax
          agreed_commission
          nic_levy
          agreed_brokerage_percentage
        }
        offer_participant_payment {
          offer_participant_payment_id
          offer_payment_amount
          paid_details
          offer_participant_payment_comment
          payment_status
          created_at
          updated_at
          offer_deduction_charge {
            offer_deduction_payment_id
            nic_levy_paid
            withholding_tax_paid
            brokerage_amount_paid
            commission_taken
          }
        }
        reinsurer_offers_only {
          offer_id
          rate
          premium
          brokerage
          fac_premium
          facultative_offer
          co_insurance_share
          commission
          fac_sum_insured
          sum_insured
          created_at
          offer_status
          payment_status
          classofbusiness {
            business_name
            class_of_business_id
            business_details
          }
          insurer {
            insurer_company_name
          }
          offer_detail {
            insured_by
            currency
            policy_number
            period_of_insurance_from
            period_of_insurance_to
            offer_comment
            information_comment
            offer_details
          }
        }
      }
      total
    }
  }
`;


export const GET_ENDORSEMENT_PARTICIPATION = gql`
query getEndorsementParticipants($id:ID){
  readParticipationsForEndorsement(offer_endorsement_id:$id)
}
`;

export const GET_SINGLE_ENDORSEMENT = gql`
# Write your query or mutation here
query getSingleEndorsement($id: ID){
  singleEndorsement(offer_endorsement_id:$id){
    offer_endorsement_id
    rate
    commission
    brokerage
    commission_amount
    facultative_offer
    co_insurance_share
    sum_insured
    fac_sum_insured
    premium
    fac_premium
    endorsement_status
    approval_status
    classofbusiness {
      class_of_business_id
      business_name
    }
    insurer {
      insurer_id
      insurer_company_email
      insurer_company_name
      insurer_address {
        insurer_address_id
        region
        country
        street
        suburb
      }
    }
    offer_endorsement_detail {
      offer_detail
      information_comment
      offer_comment
      currency
      insured_by
      policy_number
      period_of_insurance_to
      period_of_insurance_from
      policy_number
      offer_endorsement_detail_id
    }
  }
}
`