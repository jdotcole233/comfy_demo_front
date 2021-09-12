import { Datatable } from "../../../components";
import React, { useMemo } from "react";
import BrokerButtons from "./BrokerButtons";
import { brokersColumns } from "./columns";

const InsureDetailsParticipationgBrokers = ({ brokers = [], treaty }) => {
  const rows = useMemo(() => {
    if (treaty && treaty.re_broker_treaties_participation) {
      return treaty.re_broker_treaties_participation.map((broker) => ({
        ...broker,
        ...broker.re_broker,
        actions: <BrokerButtons {...{ ...broker, treaty }} />,
      }));
    }
    return [];
  }, [treaty]);
  return (
    <div className="card">
      <div className="col-md-12 card-body">
        <span className="card-title">Effected with (Brokers)</span>
      </div>
      <div className="card-body col-md-12">
        <Datatable columns={brokersColumns} data={rows} />
      </div>
    </div>
  );
};

export default InsureDetailsParticipationgBrokers;
