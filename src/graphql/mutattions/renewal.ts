import gql from "graphql-tag";

export const RENEW_FAC_OFFER = gql`
  mutation RenewFacOffer($id: ID) {
    renewFacOffer(offer_id: $id)
  }
`;

export const REINSTATE_FAC_OFFER = gql`
  mutation ReinstateFacOffer($id: ID) {
    reinstateFacOffer(offer_id: $id)
  }
`;

export const APPROVE_TREATY = gql`
  mutation ApproveTreaty(
    $treaty_id: ID
    $approval_status: String
    $document_message: [String]
    $approval_date: Date
  ) {
    setTreatyApprovalStatus(
      treaty_id: $treaty_id
      approval_status: $approval_status
      document_message: $document_message
      approval_date: $approval_date
    )
  }
`;
