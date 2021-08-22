import { gql } from "@apollo/client";

export const TREATIES = gql`
  {
    treatyPrograms {
      treaty_program_id
      insurer {
        insurer_id
        insurer_company_name
      }
      treaty_name
      treaty_type
      treaty_details
      treaty_associate_deductions {
        treaty_associate_deduction_id
        treaty_period_to
        treaty_period_from
        commission
        withholding_tax
        brokerage
        nic_levy
      }
    }
  }
`;

export const CREATE_TREATY = gql`
  mutation createTreatyProgram($program: TreatyProgramData) {
    createTreatyProgram(program: $program)
  }
`;

export const UPDATE_TREATY = gql`
  mutation updateTreaty($program: TreatyProgramData, $id: ID) {
    updateTreatyProgram(program: $program, program_id: $id)
  }
`;

export const ADD_DEDUCTION_TO_TREATY = gql`
  mutation createDeductionForTreaty($deductions: TreatyAssociateDeductionData) {
    createTreatyProgramAssociateDeductions(deductions: $deductions)
  }
`;

export const DELETE_TREATY_DEDUCTION = gql`
  mutation deleteDeudction($id: ID) {
    deleteTreatyProgramAssociateDeductions(deduction_id: $id)
  }
`;

export const UPDATE_TREATY_DEDUCTION = gql`
  mutation updateDeduction(
    $deductions: TreatyAssociateDeductionData
    $deduction_id: ID
  ) {
    updateTreatyProgramAssociateDeductions(
      deductions: $deductions
      deduction_id: $deduction_id
    )
  }
`;

export const INSURER_TREATY_PROGRAMS = gql`
  query insurerTreatyPrograms($id: ID) {
    insurerTreatyProgram(insurer_id: $id) {
      treaty_name
      treaty_details
      treaty_program_id
      treaty_type
      treaty_associate_deductions {
        treaty_associate_deduction_id
        commission
        brokerage
        nic_levy
        withholding_tax
        treaty_period_from
        treaty_period_to
      }
    }
  }
`;

export const CREATE_TREATY_FOR_INSURER = gql`
  mutation createTreaty($treaty: TreatyData) {
    createTreaty(treaty: $treaty)
  }
`;

export const INSURER_TREATIES = gql`
  query treaties($id: ID) {
    treaties(insurer_id: $id) {
      treaty_id
      treaty_reference
      currency
      layer_limit
      treaty_details
      treaty_payment_status
      treaty_deduction {
        treaty_associate_deduction_id
        commission
        withholding_tax
        nic_levy
        treaty_period_to
        treaty_period_from
        brokerage
      }
      treaty_np_payments {
        created_at
        updated_at
        uuid
        treaty_payment_details
        treaty_payment_comment
        treaty_payment_amount
      }

      treaty_p_payments {
        created_at
        updated_at
        treaty_payment_id
        treaty_payment_details
        treaty_payment_comment
        treaty_payment_amount
      }
      treaty_accounts {
        
        treaty_account_id
        claim_settled
        account_periods
        gross_premium
        treaty_account_deduction {
          commission_amount
          nic_levy_amount
          brokerage_amount
          withholding_tax_amount
        }
      }
    treaty_to_associates {
      layer_number
      sent_status
      treaty_to_associate_id
      reinsurer {
        reinsurer_id
        re_company_name
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
      # Payments
      treaty_participant_payments {
          participant_payment_details
          treaty_participants_payment_id
        }
        treaty_participant_deductions {
          treaty_accountstreaty_account_id
          uuid
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

export const DISTRIBUTE_PAYMENT_FOR_TREATY = gql`
mutation distributePaymentForTreaty(
  $id: ID
  $data: [TreatyPaymentDistribution]
) {
  distributePaymentForTreaty(treaty_id: $id, payment_information: $data)
}
`

export const UPDATE_INSURER_TREATY = gql`
  mutation updateInsurerTreaty($treaty: TreatyData, $treaty_id: ID) {
    updateTreaty(treaty: $treaty, treaty_id: $treaty_id)
  }
`;

export const TREATY = gql`
query treaty($treaty_id: ID) {
  treaty(treaty_id: $treaty_id) {
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
`;


export const REMOVE_RECEIVABLE_PAYMENT = gql`
mutation deleteReceivablePayment($id: ID) {
  deleteReceivablePayment(receivable_payment_id: $id)
}
`

export const UPDATE_RECEIVABLE_PAYMENT = gql`
mutation updatePayment(
  $receivable_payment_id: ID
  $receivable_payments: ReceivablePaymentInput
  $treaty_id:ID
) {
  updateReceivablePayment(
    receivable_payment_id: $receivable_payment_id
    receivable_payments: $receivable_payments
    treaty_id:$treaty_id
  )
}
`

export const REMOVE_ASOCIATE_TREATY = gql`
mutation removeTreatyAssociate($id: ID) {
  removeAssociateFromTreaty(treaty_to_associate_id: $id)
}
`

export const SEND_TREATY_EMAIL = gql`
  mutation sendTreatyEmail($data: P_Treaty_data!) {
    sendTreatyEmail(email_data: $data)
  }
`;

export const CREATE_TREATY_DISTRIBUTION = gql`
  mutation createTreatyDistribution($ids: [Reinsurer_representative_data], $treaty_id: ID, $layer_number:[Int],$treaty_associate_deduction_id:ID) {
    createReinsurersDistribution(reinsurer_ids: $ids, treaty_id: $treaty_id,layer_number:$layer_number,treaty_associate_deduction_id:$treaty_associate_deduction_id)
  }
`;

export const ADD_TREATY_PERCENTAGE = gql`
  mutation addPerctenage($treaty_participation_id: ID, $percentage: Float, $treaty_id:ID, $associate_deduction_id:ID,$layer_number:Int) {
    addReinsurersParticipationPercentage(
      treaty_participation_id: $treaty_participation_id
      participation_percentage: $percentage
      treaty_id:$treaty_id
      layer_number: $layer_number
      associate_deduction_id: $associate_deduction_id
    )
  }
`;

export const ADD_QUARTER = gql`
  mutation createQuarter($data: TreatyAccountData) {
    addQuarterForTreaty(treaty_account: $data)
  }
`;

export const UPDATE_QUARTER = gql`
  mutation updateQuarter($data: TreatyAccountData, $id: ID) {
    updateQuarterForTreaty(treaty_account: $data, treaty_account_id: $id)
  }
`;

export const REMOVE_REINSURER_FROM_TREATY_PARTICIPATION = gql`
  mutation removeTreatyParticipant($ids: [ID], $id: ID) {
  removeParticipantFromTreaty(
    treaty_to_associate_ids: $ids
    treaty_participant_id: $id
  )
}
`;

export const CREATE_AND_UPDATE_PORTFOLIO_STATEMENT = gql`
mutation createAndUpdatePortfolioStatment(
  $treaty_proportional_detail_id: ID
  $overall_gross_premium: Float
  $losses: Float
) {
  createAndUpdatePortfolioStatment(
    treaty_proportional_detail_id: $treaty_proportional_detail_id
    overall_gross_premium: $overall_gross_premium
    losses_outstanding: $losses
  )
}
`

export const REMOVE_QUARTER = gql`
  mutation removeNote($treaty_account_id: ID) {
    removeQuarterForTreaty(treaty_account_id: $treaty_account_id)
  }
`;
export const UPDATE_REINSURER_TREATY_PAYMENT = gql`
mutation editPayment($id: ID, $payment: PaymentDetails) {
  updateEachReinsurerPaymentDetails(
    treaty_participants_payment_id: $id
    payment: $payment
  )
}
`

export const TREATY_CLAIMS = gql`
  {
    all_treaties {
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

export const MANUAL_CREATE_CLAIM = gql`
mutation makeTreatyClaim($id: ID, $claims: [TreatyClaimData]) {
  manuallyCreateClaims(treaty_id: $id, claims: $claims)
}
`

export const UPDATE_PROPORTIONAL_TREATY_PAYMENT = gql`
mutation updateProportionalPayment($data: PaymentDetails) {
  updateProportionalPayment(payment: $data)
}
`

export const UPDATE_NONPROPORTIONAL_TREATY_PAYMENT = gql`
mutation updateNonProportionalTreatyPayment($data: PaymentDetails) {
  updateNonProportionalPayment(payment: $data)
}
`

export const MODIFY_TREATY_DEDUCTIONS = gql`
mutation updateReinsurerDeductions(
  $data: [ReinsurerParticipationUpdate]
  $account_ids: [ID]
  $layer: String
  $isProp: Boolean
) {
  updateReinsurerDeductions(
    data: $data
    account_ids: $account_ids
    layer: $layer
    isProp: $isProp
  )
}
`

export const UPDATE_TREATY_CLAIM = gql`
mutation updateTreatyClaim($id: ID, $claims: TreatyClaimData) {
  updateClaimCreated(treaty_claim_id: $id, claims: $claims)
}

`

export const DELETE_TREATY_CLAIM = gql`
mutation removeTreatyClaim($id: ID) {
  deleteClaimCreated(treaty_claim_id: $id)
}
`

export const UPDATE_LIMIT_LAYER = gql`
  mutation updatelayer($limit: LimitData) {
    updateLimitLayer(limit: $limit)
  }
`;


export const MAKE_PROPORTIONAL_PAYMENT = gql`
mutation makeProportionalTreatyPayment($input: PaymentDetails) {
  makeProportionalPayment(payment: $input)
}
`

export const MAKE_NON_PROPORTIONAL_PAYMENT = gql`
mutation makeNonProportionalTreatyPayment($data:PaymentDetails) {
  makeNonProportionalPayment(payment:$data)
}
`


export const MAKE_RECEIVABLE_PAYMENT = gql`
mutation makePayment(
  $treaty_id: ID
  $receivable_payments: [ReceivablePaymentInput]
) {
  recordReceivablePayment(
    treaty_id: $treaty_id
    receivable_payments: $receivable_payments
  )
}
`

export const REMOVE_PROPORTIONAL_PAYMENT = gql`
mutation removeProportionalPayment($id: ID) {
  removeProportionalPayment(payment_id: $id)
}
`;

export const REMOVE_NONPROPORTIONAL_PAYMENT = gql`
mutation removeNonProportionalPayment($id: ID) {
  removeNonProportionalPayment(payment_id: $id)
}
`;

export const UPLOAD_CLAIMS = gql`
mutation uploadClaims(
  $treaty_id: ID
  $layer_number: Int
  $start_at: Int
  $custom_headers: String
  $file: Upload
) {
  automateCreateClaims(
    treaty_id: $treaty_id
    layer_number: $layer_number
    start_at: $start_at
    custom_headers: $custom_headers
    file: $file
  )
}

`

export const DELETE_TREATY = gql`
mutation deleteTreaty($id: ID, $treaty_type: TreatyType) {
  deleteTreaty(treaty_id: $id,treaty_type:$treaty_type)
}
`

export const DELETE_TREATY_PROGRAM = gql`
mutation deleteTreatyProgram($id: ID) {
  deleteTreatyProgram(program_id: $id)
}
`

export const SEND_NP_DEBIT_NOTE = gql`
mutation sendNpDebitNOte($data: NPTreatyData) {
  sendNPTreatyDebitNote(nptreatydata: $data)
}
`

export const SEND_P_DEBIT_NOTE = gql`
mutation sendPTreatyDebitNote(
  $treaty_account_ids: [ID]
  $treaty_id: ID
  $email_component: EmailComponent
) {
  sendPTreatyDebitNote(
    treaty_id: $treaty_id
    email_component: $email_component
    treaty_account_id: $treaty_account_ids
  )
}
`

export const SEND_NP_CREDIT_NOTE = gql`
mutation sendNpDebitNOte($data: NPTreatyData) {
  sendNPTreatyCreditNote(nptreatydata: $data)
}
`

export const SEND_TREATY_CREDIT_AND_STATEMENTS_NOTE = gql`
mutation sendPTreatyCreditAndStatementNote(
  $treaty_account_id: [ID]
  $participant_id: ID
  $docType:[String]
  $treaty_id: ID
  $email_component: EmailComponent
) {
  sendPTreatyCreditAndStatementNote(
    treaty_account_id: $treaty_account_id
    email_component: $email_component
    treaty_id: $treaty_id
    participant_id: $participant_id
    type: $docType
  )
}
`

export const SEND_TREATY_CLAIM_DEBIT_NOTE = gql`
mutation sendTreatyClaimDebitNote(
  $single_document: Int
  $treaty_participant_id: ID
  $reinsurer_id: ID
  $paged: Int
  $treaty_id: ID
  $email_component: EmailComponent
) {
  sendTreatyClaimDebitNote(
    treaty_id: $treaty_id
    email_component: $email_component
    single_document: $single_document
    reinsurer_id: $reinsurer_id
    paged: $paged
    treaty_participant_id: $treaty_participant_id
  )
}
`

export const CREATE_ADJUSTMENT_STATEMENT = gql`
mutation createAdjustment($treaty_id: ID, $outstanding_payment:Float, $claim_paid:Float,$treaty_np_detail_id:ID) {
  createOrUpdateAdjustmentStatment(
    treaty_id: $treaty_id,
    claims_paid:$claim_paid, 
    outstanding_payment:$outstanding_payment,
    treaty_np_detail_id:$treaty_np_detail_id
    )
}
`

export const DELETE_ADJUSTMENT_STATEMENT = gql`
mutation deleteAdjustmentStatment($treaty_id: ID, $treaty_np_detail_id: ID) {
  deleteAdjustmentStatment(
    treaty_id: $treaty_id
    treaty_np_detail_id: $treaty_np_detail_id
  )
}
`




export const REINSURER_PROPORTIONAL_TREATY_PAYMENTS = gql`
query treatyReinsurerAccountsPayment($treaty_id:ID, $treaty_participation_id:ID){
  treatyReinsurerAccountsPayment(treaty_id:$treaty_id, treaty_participation_id:$treaty_participation_id){
    treaty_account_id
    account_periods
    gross_premium
    claim_settled
    treaty_p_payments {
      treaty_p_payment_id
      treaty_payment_amount
      treaty_payment_details
      treaty_payment_comment
      created_at
      updated_at
      surpulus_uuid
      treaty_accountstreaty_account_id
    }
  }
}

`