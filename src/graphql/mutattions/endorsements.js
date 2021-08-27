import gql from "graphql-tag";

export const APPROVE_ENDORSEMENT = gql`
mutation approveEndorseement(
    $id: ID, 
    $message: [String],
     $status: String,
     $offer_id:ID
     ) {
  approve_endorsement(
    offer_endorsement_id: $id
    document_message: $message
    approval_status: $status
    offer_id: $offer_id
  )
}
`;


export const SEND_ENDORSEMENT_CONTRACT_CHANGES = gql`
mutation sendContractChanges($data: EndorsementEmail) {
  sendContractChanges(endorsementInput: $data)
}
`