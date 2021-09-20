import gql from "graphql-tag";


export const UPDATE_TREATY_DETAILS = gql`
mutation updateTreatyForPlaingAndCover(
    $treaty_id: ID
    $treaty_details: String
  ) {
    updateTreatyForPlaingAndCover(
      treaty_id: $treaty_id
      treaty_details: $treaty_details
    )
  }
`;