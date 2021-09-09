import gql from "graphql-tag";


export const CREATE_BROKER = gql`
mutation createBroker($input: ReBrokerInput) {
    createReBroker(re_broker: $input)
  }
`;


export const DELETE_BROKER = gql`
mutation deleteBroker($id: ID) {
  deleteReBroker(re_broker_id: $id)
}`;