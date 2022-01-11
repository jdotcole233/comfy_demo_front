/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: brokers
// ====================================================

export interface brokers_brokers_re_broker_associates {
  __typename: "ReBrokerAssociate";
  re_broker_associate_id: string | null;
}

export interface brokers_brokers_re_broker_address {
  __typename: "ReBrokerAddress";
  region: string | null;
  country: string | null;
  city: string | null;
  re_primary_phone: string | null;
  re_secondary_phone: string | null;
  re_broker_address_id: string | null;
}

export interface brokers_brokers {
  __typename: "ReBroker";
  re_broker_id: string | null;
  re_broker_name: string | null;
  re_broker_email: string | null;
  re_broker_website: string | null;
  re_broker_associates: (brokers_brokers_re_broker_associates | null)[] | null;
  re_broker_address: brokers_brokers_re_broker_address | null;
}

export interface brokers {
  brokers: (brokers_brokers | null)[] | null;
}
