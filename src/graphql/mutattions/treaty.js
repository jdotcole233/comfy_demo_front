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


export const SEND_PLACING_OR_COVER_NOTE = gql`
mutation sendNotes(
  $treaty_id: ID
  $doc_type: String
  $emaildata: EmailComponent
) {
  sendTreatyPlacingOrCovertNote(
    treaty_id: $treaty_id
    doc_type: $doc_type
    emaildata: $emaildata
  )
}
`

export const DUPLICATE_TREATY = gql`
mutation duplicateTreaty($treaty_id: ID, $currencies: [String]) {
  duplicateTreaty(treaty_id: $treaty_id, currencies: $currencies)
}`;
