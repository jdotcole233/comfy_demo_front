import gql from "graphql-tag";

export const ENDORSEMENTS = gql`
{
  allUnapprovedEndorsements {
    offer {
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
        offer_endorsement_detail {
          offer_comment
          offer_endorsement_detail_id
          offer_detail
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
    offer_endorsement_id
    rate
    commission
    commission_amount
    brokerage
    facultative_offer
    classofbusiness {
      business_name
    }
    co_insurance_share
    sum_insured
    fac_sum_insured
    premium
    fac_premium
    endorsement_status
    approval_status
    offer_endorsement_detail {
      offer_endorsement_detail_id
      policy_number
      insured_by
      period_of_insurance_from
      period_of_insurance_to
      currency
      offer_comment
      information_comment
      offer_detail
    }
    created_at
    updated_at
    insurer {
      insurer_id
      insurer_company_name
      insurer_company_email
      insurer_company_website
      insurer_abbrv
      insurer_address {
        region
        country
        suburb
        street
      }
    }
  }
}


`