import { Loader } from "../../components";
import ErrorPage from "../../components/ErrorPage";
import { BROKER } from "../../graphql/queries/brokers";
import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BrokerDetailHeader from "./components/BrokerDetailHeader";
import BrokerDetailOtherInfo from "./components/BrokerDetailOtherInfo";
import BrokerDetailTreaties from "./components/BrokerDetailTreaties";
import BrokerDetailTreatyStats from "./components/BrokerDetailTreatyStats";
import BrokerDetailWelcome from "./components/BrokerDetailWelcome";
import BrokersAssociates from "./components/BrokersAssociates";
import { BrokerDetailsProvider } from "./provider/BrokerDetailsProvider";

const BrokerDetails = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(BROKER, {
    variables: { id: Buffer.from(id, "base64").toString("utf-8") },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorPage {...{ loading, refetch }} />;

  return (
    <BrokerDetailsProvider
      value={{
        broker: data?.broker,
        treaties: data?.broker?.re_broker_participations,
        overview: data?.broker?.broker_overview,
      }}
    >
      <div className="page-content">
        <BrokerDetailHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4">
              <BrokerDetailWelcome />
              <BrokerDetailOtherInfo />
            </div>
            <div className="col-xl-8">
              <BrokerDetailTreatyStats />
            </div>
            <div className="col-xl-12">
              <BrokerDetailTreaties />
              <BrokersAssociates />
            </div>
          </div>
        </div>
      </div>
    </BrokerDetailsProvider>
  );
};

export default BrokerDetails;
