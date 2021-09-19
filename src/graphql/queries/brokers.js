import gql from "graphql-tag";


export const BROKERS = gql`
query brokers {
    brokers {
      re_broker_id
      re_broker_name
      re_broker_email
      re_broker_website
      re_broker_address {
        region
        country
        city
        re_primary_phone
        re_secondary_phone
        re_broker_address_id
      }
    }
  }
  `;

export const BROKER_DISTRIBUTION_LIST = gql`
query brokersAsoociates {
  brokers {
    re_broker_name
    re_broker_id
		re_broker_associates {
      re_broker_assoc_email
      re_broker_associate_id
      re_broker_assoc_last_name
      re_broker_assoc_first_name
      re_broker {
        re_broker_name
      }
    }
  }
}
`;

export const BROKER = gql`
query broker($id: ID) {
  broker(broker_id: $id) {
    re_broker_id
    re_broker_name
    re_broker_email
    re_broker_website
    re_broker_address {
      region
      street
      country
      city
      re_primary_phone
      re_secondary_phone
      re_broker_address_id
    }
    broker_overview {
      total_treaties
      total_proportional
      total_nonproportional
      total_unpaid_treaties
      total_paid_treaties
      total_partpayment_treaties
      total_brokerage_amt
      brokerage_chart
    }
    re_broker_associates {
      re_broker_associate_id
      re_broker_assoc_email
      re_broker_assoc_position
      re_broker_assoc_last_name
      re_broker_assoc_first_name
      re_broker_assoc_primary_phone
      re_broker_assoc_secondary_phone
    }
    re_broker_participations {
      re_broker_treaties_participation_id
      share_percentage
      payment_status
      admin_percentage
      surplus_participation {
        re_broker_treaties_surplus_participation_id
        share_amount
        admin_charge
        treaty_account {
          treaty_account_id
          account_periods
          account_year
          gross_premium
          cash_loss
          exchange_rate
          payment_status
          claim_settled
        }
        broker_surplus_participation_payments {
          re_broker_treaties_surplus_participation_payment_id
          payment_amount
          payment_details
        }
      }
      treaty {
        treaty_id
        treaty_details
        treaty_reference

        currency
        # m_and_d_premium
        # installment_type
        treaty_payment_status
        treaty_program {
          treaty_name
          treaty_type
        }
        treaty_proportional_detail {
          treaty_proportional_detail_id
          profit_commission
          re_mgmt_expense
          ernpi
          overall_gross_premium
          losses_outstanding
          portfolio_entry
          created_at
        }
        insurer {
          insurer_company_name
          insurer_address {
            suburb
            region
            country
          }
        }
        employee {
          employee_last_name
          employee_first_name
          employee_phonenumber
          employee_email
        }

        treaty_np_detail {
          treaty_np_id
          egrnpi
          burning_cost_rate
          loaded_burning_cost
          pure_burning_cost
          adjustment_created
          created_at
          claims_paid
          outstanding_payment
        }

        treaty_accounts {
          treaty_account_id
          claim_settled
          account_periods
          exchange_rate
          # gross_premium
          cash_loss
          account_year
          # treaty_surpulus {
          #   treaty_account_surpulus_id
          #   surpulus_uuid
          #   gross_premium
          # }
          treaty_account_deduction {
            treaty_account_deduction_id
            commission_amount
            nic_levy_amount
            gross_premium
            brokerage_amount
            withholding_tax_amount
            surpulus_uuid
            # Copied
          }

          treaty_p_payments {
            treaty_p_payment_id
          }

          treaty_participant_deduction {
            treaty_participation_share
            treaty_participationstreaty_participation_id
            treaty_participant_deduction_id
            withholding_tax_amount
            nic_levy_amount
            brokerage_amount
            commission_amount
            uuid
          }
        }
        layer_limit
        treaty_deduction {
          treaty_associate_deduction_id
          commission
          nic_levy
          withholding_tax
          brokerage
          treaty_period_to
          treaty_period_from
        }
        treaty_to_associates {
          layer_number
          sent_status
          treaty_to_associate_id
          reinsurer {
            reinsurer_id
            re_company_name
            re_company_email
          }
          reinsurer_representative {
            rep_last_name
            rep_first_name
            rep_primary_phonenumber
            rep_secondary_phonenumber
            rep_email
          }
        }
        treaty_participants {
          treaty_participation_id
          treaty_participation_percentage
          layer_number
          treaty_participant_payments {
            participant_payment_details
          }
          treaty_participant_deductions {
            treaty_accountstreaty_account_id
            treaty_participant_deduction_id
            uuid
            brokerage
            commission
            nic_levy
            withholding_tax
            nic_levy_amount
            withholding_tax_amount
            commission_amount
            treaty_participation_share
            brokerage_amount
          }
          reinsurer {
            re_abbrv
            reinsurer_id
            re_company_name
            re_company_email
            reinsurer_address {
              suburb
              region
              country
            }
          }
        }
      }
    }
  }
}

  `;