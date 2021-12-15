import gql from "graphql-tag";

export const CREATE_CLASS_OF_BUSINESS = gql`
  mutation createClassOfBusiness(
    $businessname: String!
    $business_details: String!
  ) {
    createClassOfBusiness(
      business_name: $businessname
      business_details: $business_details
    ) {
      class_of_business_id
      business_name
      business_details
      created_at
    }
  }
`;

export const DELETE_CLASS_OF_BUSINESS = gql`
  mutation deleteClassOfBusiness($id: ID!) {
    removeSingleClassOfBusiness(class_of_business_id: $id)
  }
`;

export const UPDATE_CLASS_OF_BUSINESS = gql`
  mutation updateClassOFBusiness(
    $id: ID!
    $details: String!
    $business_name: String!
  ) {
    updateSingleClassOfBusiness(
      class_of_business_id: $id
      business_details: $details
      business_name: $business_name
    ) {
      class_of_business_id
      business_name
      business_details
    }
  }
`;

export const CREATE_REINSURER = gql`
  mutation createReinsurer(
    $re_company_name: String!
    $re_company_email: String!
    $re_company_website: String
    $street: String!
    $suburb: String!
    $region: String!
    $country: String!
  ) {
    createReinsurer(
      reinsurer: {
        region: $region
        re_company_name: $re_company_name
        re_company_email: $re_company_email
        re_company_website: $re_company_website
        street: $street
        suburb: $suburb
        country: $country
      }
    ) {
      reinsurer_id
    }
  }
`;

export const CREATE_ASSOCIATE = gql`
  mutation createAssociate(
    $reinsurer_id: ID!
    $first_name: String!
    $last_name: String!
    $phone_pri: String!
    $phone_sec: String
    $position: String!
    $email: String!
  ) {
    createReinsurerRep(
      reinsurer_rep: {
        reinsurersreinsurer_id: $reinsurer_id
        rep_first_name: $first_name
        rep_last_name: $last_name
        rep_email: $email
        position: $position
        rep_primary_phonenumber: $phone_pri
        rep_secondary_phonenumber: $phone_sec
      }
    ) {
      reinsurersreinsurer_id
    }
  }
`;

export const REMOVE_ASSOCIATE = gql`
  mutation removeAssociate($id: ID!) {
    removeReinsuereRep(reinsurer_representative_id: $id) {
      reinsurer_representative_id
    }
  }
`;

export const REMOVE_REINSURER = gql`
  mutation removeReinsurer($id: ID!) {
    removeReinsurer(reinsurer_id: $id) {
      reinsurer_id
    }
  }
`;

export const CREATE_INPUT_OFFER = gql`
  mutation CreateInputOffer(
    $class_of_business_id: ID!
    $insurer_id: ID!
    $reinsurer_id: ID
    $employee_id: ID!
    $co_insurance_share: Float
    $rate: Float
    $commission: Float!
    $brokerage: Float!
    $facultative_offer: Float!
    $sum_insured: Float!
    $premium: Float!
    $policy_number: String
    $insured_by: String!
    $period_of_insurance_from: Date
    $period_of_insurance_to: Date
    $currency: String!
    $ex_rate: Float
    $ex_currency: String
    $offer_comment: String
    $offer_details: String!
    $payment_type: Payment_type
    $information_comment: String
  ) {
    createInputOffer(
      offer_input: {
        class_of_business_id: $class_of_business_id
        insurer_id: $insurer_id
        reinsurer_id: $reinsurer_id
        employee_id: $employee_id
        payment_type: $payment_type
        rate: $rate
        commission: $commission
        brokerage: $brokerage
        facultative_offer: $facultative_offer
        sum_insured: $sum_insured
        premium: $premium
        policy_number: $policy_number
        insured_by: $insured_by
        period_of_insurance_from: $period_of_insurance_from
        period_of_insurance_to: $period_of_insurance_to
        currency: $currency
        ex_rate: $ex_rate
        ex_currency: $ex_currency
        offer_comment: $offer_comment
        offer_details: $offer_details
        information_comment: $information_comment
        co_insurance_share: $co_insurance_share
      }
    ) {
      rate
    }
  }
`;

export const CREATE_ENDORSEMENT = gql`
  mutation createEndorsement(
    $class_of_business_id: ID!
    $offer_id: ID
    $insurer_id: ID!
    $employee_id: ID!
    $co_insurance_share: Float
    $rate: Float
    $commission: Float!
    $brokerage: Float!
    $facultative_offer: Float!
    $sum_insured: Float!
    $premium: Float!
    $policy_number: String
    $insured_by: String!
    $period_of_insurance_from: Date
    $period_of_insurance_to: Date
    $currency: String!
    $ex_rate: Float
    $ex_currency: String
    $offer_comment: String
    $offer_details: String!
    $information_comment: String
  ) {
    createEndorsementOffer(
      offer_input: {
        class_of_business_id: $class_of_business_id
        insurer_id: $insurer_id
        employee_id: $employee_id
        rate: $rate
        commission: $commission
        brokerage: $brokerage
        facultative_offer: $facultative_offer
        sum_insured: $sum_insured
        premium: $premium
        policy_number: $policy_number
        insured_by: $insured_by
        period_of_insurance_from: $period_of_insurance_from
        period_of_insurance_to: $period_of_insurance_to
        currency: $currency
        ex_rate: $ex_rate
        ex_currency: $ex_currency
        offer_comment: $offer_comment
        offer_details: $offer_details
        information_comment: $information_comment
        co_insurance_share: $co_insurance_share
      }
      offer_id: $offer_id
    )
  }
`;

export const CREATE_FLEET_OFFER = gql`
  mutation CREATE_FLEET_OFFER($data: [Offer_data]) {
    createFleetOffer(offer_input: $data)
  }
`;

export const CREATE_DISTRIBUTION_LIST = gql`
  mutation createDistributionList(
    $offer_id: ID!
    $reinsurer_reps: [Reinsurer_representative_data!]!
  ) {
    createDistributionList(
      distribution_list: {
        offer_id: $offer_id
        reinsurer_reps: $reinsurer_reps
      }
    )
  }
`;

export const REMOVE_REINSURER_FROM_PARTICIPATION = gql`
  mutation removeReinsurerfromList(
    $offer_id: ID!
    $reinsurer_id: ID!
    $offer_participating_id: ID!
  ) {
    removeParticipantByReinsurer(
      offer_participating_id: $offer_participating_id
      offer_id: $offer_id
      reinsurer_id: $reinsurer_id
    )
  }
`;

export const REMOVE_ASSOCIATE_FROM_PARTICIPATION = gql`
  mutation removeAssociateFromParticipation($offer_to_associate_id: ID!) {
    removeParticipantByParticipant(
      offer_to_associate_id: $offer_to_associate_id
    )
  }
`;

export const ADD_PERCENTAGE = gql`
  mutation addPercentage(
    $offer_participant_id: ID!
    $offer_id: ID!
    $percentage: Float!
    $reopen: Boolean
  ) {
    addPrecentageToParticipant(
      offer_participant_id: $offer_participant_id
      offer_id: $offer_id
      participating_percentage: $percentage
      reopen: $reopen
    ) {
      offer_amount
    }
  }
`;

export const CLOSE_OFFER = gql`
  mutation closeOffer($offer_id: ID!, $data: [Reinsurer_extra_charge!]!) {
    createClosingForOffer(
      extra_charges: { offer_id: $offer_id, reinsurer_data: $data }
    ) {
      nic_levy_amount
    }
  }
`;

export const UPDATE_OFFER = gql`
  mutation updateOffer(
    $offer_id: ID!
    $offer_input: Offer_data!
    $offer_detail_id: ID!
  ) {
    updateInputOffer(
      offer_input: $offer_input
      offer_id: $offer_id
      offer_detail_id: $offer_detail_id
    )
  }
`;

export const CREATE_INSURER = gql`
  mutation createInsurer(
    $insurer_company_name: String!
    $insurer_company_email: String!
    $insurer_company_website: String
    $street: String!
    $suburb: String!
    $region: String!
    $country: String!
  ) {
    createInsurer(
      insurer: {
        insurer_company_name: $insurer_company_name
        insurer_company_email: $insurer_company_email
        insurer_company_website: $insurer_company_website
        street: $street
        suburb: $suburb
        region: $region
        country: $country
      }
    )
  }
`;

export const CREATE_INSURER_REP = gql`
  mutation createInsurerRep(
    $insurer_id: ID!
    $first_name: String!
    $last_name: String!
    $phone_pri: String!
    $phone_sec: String
    $email: String!
    $position: String!
  ) {
    createInsurerRep(
      insurer_rep: {
        insurersinsurer_id: $insurer_id
        rep_first_name: $first_name
        rep_last_name: $last_name
        rep_primary_phonenumber: $phone_pri
        rep_secondary_phonenumber: $phone_sec
        rep_email: $email
        position: $position
      }
    ) {
      insurer_associate_id
    }
  }
`;

export const REMOVE_INSURER = gql`
  mutation removeInsurer($id: ID!) {
    removeInsurer(insurer_id: $id)
  }
`;

export const UPDATE_INSURER = gql`
  mutation updateInsurer($insurer_id: ID!, $insurer: Insurer_data!) {
    updateInsurer(insurer_id: $insurer_id, insurer: $insurer)
  }
`;

export const UPDATE_INSURER_MANAGER = gql`
  mutation updateManager($id: ID!, $manager: Insurer_associate_data!) {
    updateInsurerRep(insurer_rep_id: $id, insurer_rep: $manager)
  }
`;

export const REMOVE_INSURER_MANAGER = gql`
  mutation removeManager($id: ID!) {
    removeInsurerRep(insurer_rep_id: $id)
  }
`;

export const UPDATE_REINSURER = gql`
  mutation updateReinsurer($reinsurer_id: ID!, $reinsurer: Reinsurer_data!) {
    updateReinsurer(reinsurer_id: $reinsurer_id, reinsurer: $reinsurer)
  }
`;

export const MAKE_PAYMENT_INSURER = gql`
  mutation createPaymentInsurer($data: Offer_payment_data!) {
    makePaymentOnOffer(payment_info: $data)
  }
`;

export const UPDATE_PAYMENT_INSURER = gql`
  mutation updatePaymentInsurer($data: Offer_payment_update_data!) {
    updatePaymentOnofferFromInsurer(payment_info: $data)
  }
`;

export const UPDATE_PAYMENT_REINSURER = gql`
  mutation updateReinsurerPayment(
    $offer_participant_payment_id: ID!
    $paid_details: String
    $Offer_payment_comment: String
  ) {
    updateReinsurerPaymentDetails(
      offer_participant_payment_id: $offer_participant_payment_id
      paid_details: $paid_details
      offer_participant_payment_comment: $Offer_payment_comment
    )
  }
`;

export const REMOVE_PAYMENT = gql`
  mutation removePayment($id: ID!) {
    deleteOfferPaymentFromInsurer(offer_payment_id: $id)
  }
`;

export const DISTRIBUTE_PAYMENT = gql`
  mutation distributePayments($data: Offer_participant_payment_update!) {
    updateOfferParticipantPayment(participant_payment_details: $data)
  }
`;

export const UPDATE_REINSURER_ASSOCIATE = gql`
  mutation updateReinsurerRep(
    $rep: Reinsurer_rep_data!
    $reinsurer_representative_id: ID!
  ) {
    updateReinsurerRep(
      reinsurer_rep: $rep
      reinsurer_representative_id: $reinsurer_representative_id
    )
  }
`;

export const MAKE_CLAIM_ON_OFFER = gql`
  mutation makeClaimOnOFfer($data: Claim_data!) {
    makeClaimOnOffer(claim_data: $data)
  }
`;

export const DELETE_OFFER = gql`
  mutation deleteOffer($id: ID!) {
    deleteOfferFromSystem(offer_id: $id)
  }
`;

export const SEND_DEBIT_AND_CREDIT = gql`
  mutation sendDebitAndCredit($data: Email_data!) {
    sendDebitAndCoverNotes(email_data: $data)
  }
`;

export const SEND_OFFER_AS_BROADCAST = gql`
  mutation sendOfferAsBroadCast(
    $data: Email_data!
    $should_send: Int
    $include_attachment: Boolean
  ) {
    sendOfferAsBroadCast(
      email_data: $data
      should_send: $should_send
      include_attachment: $include_attachment
    )
  }
`;
export const SEND_CLOSING_SLIP = gql`
  mutation SEND_CLOSING_SLIP($data: Email_data!) {
    sendClosingslip(email_data: $data)
  }
`;

export const SEND_BROKER_CLOSING_SLIP = gql`
  mutation SEND_BROKER_CLOSING_SLIP(
    $treaty_id: ID
    $treaty_account_id: ID
    $re_broker_treaties_participation_id: ID
    $emaildata: EmailComponent
  ) {
    sendTreatyBrokerNotes(
      treaty_id: $treaty_id
      treaty_account_id: $treaty_account_id
      re_broker_treaties_participation_id: $re_broker_treaties_participation_id
      emaildata: $emaildata
    )
  }
`;

export const CLAIM_REQUEST = gql`
  mutation sendClaimNotification($data: Email_data!) {
    sendClaimNotification(email_data: $data)
  }
`;

export const SEND_TREATY_CLAIM_DEBIT_NOTE = gql`
  mutation sendTreatyClaimDebitNote(
    $single_document: Int
    $treaty_id: ID
    $treaty_participant_id: ID
    $reinsurer_id: ID
    $paged: Int
    $email_component: EmailComponent
  ) {
    sendTreatyClaimDebitNote(
      single_document: $single_document
      treaty_id: $treaty_id
      treaty_participant_id: $treaty_participant_id
      reinsurer_id: $reinsurer_id
      paged: $paged
      email_component: $email_component
    )
  }
`;

export const REMOVE_CLAIM_AMOUNT = gql`
  mutation removeClaimAmount($id: ID!, $offer_id: ID!) {
    deleteClaimAmount(offer_claim_id: $id, offer_id: $offer_id)
  }
`;

export const UPDATE_CLAIM_AMOUNT = gql`
  mutation updateClaimAmount($claim_id: ID!, $data: Claim_data!) {
    updateClaimAmount(offer_claim_id: $claim_id, claim_data: $data)
  }
`;

export const PLACE_OFFER = gql`
  mutation placeOffer($offer_id: ID, $placed_offer: Float) {
    placeOfferAt(offer_id: $offer_id, placed_offer: $placed_offer)
  }
`;

export const UNPLACE_OFFER = gql`
  mutation unplaceOffer($offer_id: ID) {
    unplaceOfferPlaced(offer_id: $offer_id)
  }
`;

export const SEND_CLAIM_DEBIT_NOTE = gql`
  mutation sendClaim(
    $offer_claim_participant_id: ID!
    $offer_id: ID!
    $reinsurer_id: ID!
    $subject: String
    $copied_emails: [String]
    $message_content: String
    $attachments: [Upload]
  ) {
    sendClaimDebitNote(
      attachments: $attachments
      offer_claim_participant_id: $offer_claim_participant_id
      offer_id: $offer_id
      reinsurer_id: $reinsurer_id
      subject: $subject
      copied_emails: $copied_emails
      message_content: $message_content
    )
  }
`;

export const UPDATE_EXTRA_CHARGE = gql`
  mutation updateExtraCharge(
    $id: ID!
    $participatant_id: ID!
    $data: Offer_edit_extra_charge_data!
  ) {
    updateReinsurerExtraCharges(
      extra_charge_id: $id
      participant_id: $participatant_id
      extra_charge: $data
    )
  }
`;

export const OFFER_APPROVAL = gql`
  mutation approveOffer($offer_id: ID, $status: String, $messages: [String]) {
    setApprovalStatus(
      offer_id: $offer_id
      approval_status: $status
      document_message: $messages
    )
  }
`;

export const MAKE_COMMENT = gql`
  mutation comment($id: ID, $messages: [String]) {
    publishCommentOnDocument(offer_id: $id, document_message: $messages)
  }
`;

export const UPDATE_ENDORSEMENT = gql`
  mutation updateEndorsement(
    $class_of_business_id: ID!
    $endorsement_id: ID!
    $offer_id: ID
    $offer_endorsement_detail_id: ID
    $insurer_id: ID!
    $employee_id: ID!
    $co_insurance_share: Float
    $rate: Float
    $commission: Float!
    $brokerage: Float!
    $facultative_offer: Float!
    $sum_insured: Float!
    $premium: Float!
    $policy_number: String
    $insured_by: String!
    $period_of_insurance_from: Date!
    $period_of_insurance_to: Date!
    $currency: String!
    $ex_rate: Float
    $ex_currency: String
    $offer_comment: String
    $offer_details: String!
    $information_comment: String
  ) {
    updateEndorsementOffer(
      offer_input: {
        class_of_business_id: $class_of_business_id
        insurer_id: $insurer_id
        employee_id: $employee_id
        rate: $rate
        commission: $commission
        brokerage: $brokerage
        facultative_offer: $facultative_offer
        sum_insured: $sum_insured
        premium: $premium
        policy_number: $policy_number
        insured_by: $insured_by
        period_of_insurance_from: $period_of_insurance_from
        period_of_insurance_to: $period_of_insurance_to
        currency: $currency
        ex_rate: $ex_rate
        ex_currency: $ex_currency
        offer_comment: $offer_comment
        offer_details: $offer_details
        information_comment: $information_comment
        co_insurance_share: $co_insurance_share
      }
      offer_endorsement_detail_id: $offer_endorsement_detail_id
      offer_endorsement_id: $endorsement_id
      offer_id: $offer_id
    )
  }
`;

export const DELETE_ENDORSEMENT = gql`
  mutation deleteEndorsement(
    $offer_endorsement_detail_id: ID
    $offer_endorsement_id: ID
  ) {
    deleteEndorsementOffer(
      offer_endorsement_detail_id: $offer_endorsement_detail_id
      offer_endorsement_id: $offer_endorsement_id
    )
  }
`;

export const SEND_CONTRACT_DEBIT = gql`
  mutation sendContractDebitNote($data: EndorsementEmail) {
    sendContractChangesAndDebitNote(endorsementInput: $data)
  }
`;

export const SEND_CHANGES_AND_CLOSING_SLIP = gql`
  mutation sendChangesAndClosingNote($data: EndorsementEmail) {
    sendContractChangesAndClosingNote(endorsementInput: $data)
  }
`;
