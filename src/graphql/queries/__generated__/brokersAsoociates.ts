/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: brokersAsoociates
// ====================================================

export interface brokersAsoociates_brokers_re_broker_associates_re_broker {
  __typename: "ReBroker";
  re_broker_name: string | null;
}

export interface brokersAsoociates_brokers_re_broker_associates {
  __typename: "ReBrokerAssociate";
  re_broker_assoc_email: string | null;
  re_broker_associate_id: string | null;
  re_broker_assoc_last_name: string | null;
  re_broker_assoc_first_name: string | null;
  re_broker: brokersAsoociates_brokers_re_broker_associates_re_broker | null;
}

export interface brokersAsoociates_brokers {
  __typename: "ReBroker";
  re_broker_name: string | null;
  re_broker_id: string | null;
  re_broker_associates: (brokersAsoociates_brokers_re_broker_associates | null)[] | null;
}

export interface brokersAsoociates {
  brokers: (brokersAsoociates_brokers | null)[] | null;
}
