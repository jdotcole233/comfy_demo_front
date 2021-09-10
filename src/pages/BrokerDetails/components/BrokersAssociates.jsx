import { Datatable, generateNewCulumns } from "components";
import { useAuth } from "context/AuthContext";
import React, { useMemo } from "react";
import { Fragment } from "react";
import { useBrokerDetailsContext } from "../provider/BrokerDetailsProvider";
import AssociateButtons from "./AssociateButtons";
import { associatesColumnns } from "./columns";

const BrokersAssociates = () => {
  const { broker } = useBrokerDetailsContext();
  const { user } = useAuth();
  const associates = useMemo(() => {
    if (broker) {
      const list = [];
      broker.re_broker_associates.map((_broker, i) => {
        const row = {
          name: `${_broker.re_broker_assoc_first_name} ${_broker.re_broker_assoc_last_name}`,
          phone: `${_broker.re_broker_assoc_primary_phone}, ${_broker.re_broker_assoc_secondary_phone}`,
          email: `${_broker.re_broker_assoc_email}`,
          position: `${_broker.re_broker_assoc_position}`,
          actions: <AssociateButtons broker={_broker} data={broker} />,
        };
        list.push(row);
        return _broker;
      });
      return list;
    }
    return [];
  }, [broker]);

  return (
    <Fragment>
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Associates</h4>
            <Datatable
              columns={generateNewCulumns(
                associatesColumnns,
                ["System Administrator", "Senior Broking Officer"].includes(
                  user?.position
                )
                  ? []
                  : ["actions"]
              )}
              data={associates}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BrokersAssociates;
