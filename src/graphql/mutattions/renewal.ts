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
