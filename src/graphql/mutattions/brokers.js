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

export const UDPATE_BROKER_ASSOCIATE = gql`
mutation updateBrokerAssociate($id: ID, $input: ReBrokerAssociateInput) {
  updateReBrokerAssociates(re_broker_assoc_id: $id, re_broker_associate: $input)
}`;

export const REMOVE_BROKER_ASSOCIATE = gql`
mutation removeBrokerAssociate($id: ID) {
  deleteReBrokerAssociates(re_broker_assoc_id: $id)
}`;

export const CREATE_BROKER_DISTRIBUTION_LIST = gql`
mutation createBrokersDistribution($brokers_list: BrokerDistributionList) {
  createReBrokerListForTreaty(brokers_list: $brokers_list)
}
`;

export const REMOVE_BROKER_FROM_TREATY = gql`
mutation removeReBokerAssocFromTreatyList($id: ID) {
  removeReBokerAssocFromTreatyList(participation_to_broker_associate_id: $id)
}`;