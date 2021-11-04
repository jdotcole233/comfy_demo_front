import gql from "graphql-tag";


export const ReinsitementOffers = gql`
query ReinstatmentOffers {
  reinstate_offers {
    total
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
      offer_retrocedent {
        reinsurer {
          reinsurer_id
          re_company_email
          re_company_name
          re_company_website
        }
      }
      offer_detail {
        offer_detail_id
        offersoffer_id
        policy_number
        insured_by
        period_of_insurance_to
        period_of_insurance_from
        payment_type
        currency
        offer_comment
        information_comment
        offer_details
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