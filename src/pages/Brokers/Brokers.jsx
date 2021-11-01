import { Loader } from "../../components";
import ErrorPage from "../../components/ErrorPage";
import { BROKERS } from "../../graphql/queries/brokers";
import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import BrokersListing from "./BrokersListing";
import BrokersHeader from "./components/BrokersHeader";
import BrokersStats from "./components/BrokersStats";
import { BrokerProvider } from "./provider/BrokerProvider";

const Brokers = () => {
  const { data, loading, error, refetch } = useQuery(BROKERS);
  if (loading) return <Loader />;
  if (error) return <ErrorPage {...{ refetch, loading }} />;
  return (
    <BrokerProvider value={{ brokers: data.brokers }}>
      <div className="page-content">
        <BrokersStats />
        <BrokersHeader />
        <BrokersListing />
      </div>
    </BrokerProvider>
  );
};

export default Brokers;
