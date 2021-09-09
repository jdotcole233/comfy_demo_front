import gql from "graphql-tag";


export const CREATE_BROKER = gql`
mutation createBroker($input: ReBrokerInput) {
    createReBroker(re_broker: $input)
  }
`;

export const UPDATE_BROKER = gql`
mutation updateBroker($input: ReBrokerInput,$id:ID) {
  updateReBroker(re_broker: $input,re_broker_id:$id)
}
`;

export const DELETE_BROKER = gql`
mutation deleteBroker($id: ID) {
  deleteReBroker(re_broker_id: $id)
}`;


export const CREATE_BROKER_ASSOCIATE = gql`
mutation createBrokerAssociate($re_broker_associate: ReBrokerAssociateInput) {
  createReBrokerAssociates(re_broker_associate: $re_broker_associate)
}
`;