import { gql } from "@apollo/client";

export const TREATY_CLAIMS = gql`
  query UnapporvedTreatyClaims($status: String, $treaty_type: [String]) {
    all_treaties(status: $status, treaty_type: $treaty_type) {
      treaty_id
      treaty_reference
      currency
      layer_limit
      treaty_details
      treaty_payment_status
      # insurer
      insurer {
        insurer_id
        insurer_company_name
        insurer_company_email
      }
      # end of isnurer
      treaty_claims {
        treaty_claim_id
        policy_number
        claim_number
        insured_name
        date_of_loss
        expected_deductible
        claim_date
        claim_paid
        layer_number
        treaty_comment
      }
      treaty_participants {
        treaty_participation_id
        treaty_participation_percentage
        layer_number
        # treaty
        treaty {
          treaty_id
          treaty_details
          currency
          layer_limit
          treaty_program {
            treaty_name
          }
          treaty_reference
          # Insurer
          insurer {
            insurer_company_name
            insurer_id
          }
        }
        treaty_claims {
          treaty_claim_id
          claim_date
          claim_paid
          claim_number
          layer_number
          insured_name
          treaty_comment
          date_of_loss
          expected_deductible
        }
        reinsurer {
          re_abbrv
          reinsurer_id
          re_company_name
          re_company_email
        }
      }
      treaty_deduction {
        treaty_associate_deduction_id
        commission
        withholding_tax
        nic_levy
        treaty_period_to
        treaty_period_from
        brokerage
      }
      treaty_program {
        treaty_name
        treaty_type
        treaty_program_id
      }
      employee {
        employee_last_name
        employee_first_name
      }
    }
  }
`;
