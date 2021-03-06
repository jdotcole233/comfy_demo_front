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
mutation removeReBokerFromTreatyList($id: ID, $treaty_id: ID) {
  removeReBokerFromTreatyList(
    re_broker_treaties_participation_id: $id
    treaty_id: $treaty_id
  )
}
`;

export const REMOVE_BROKER_ASSOCIATE_FROM_TREATY = gql`
mutation RemoveBrokerAssociateFromTreaty($id: ID) {
  removeReBokerAssocFromTreatyList(participation_to_broker_associate_id: $id)
}`;

export const ADD_PERCENTAGE_TO_BROKER = gql`
mutation addPercentageForBroker(
  $broker_participation: ReBrokerParticipationPercentageInput
) {
  addReBrokerParticipationPercentage(
    broker_participation: $broker_participation
  )
}
`;
// TODO: change this
export const MAKE_PAYMENT_BROKER_PROP = gql`
mutation makeBrokerProportionalPayment($payment_data: Broker_payment_data) {
  makeBrokerProportionalPayment(payment_data: $payment_data)
}
`;
// TODO: change this
export const UPDATE_PAYMENT_BROKER = gql`
mutation UpdatePaymentBroker($id: ID) {
  removeReBokerAssocFromTreatyList(participation_to_broker_associate_id: $id)
}`;