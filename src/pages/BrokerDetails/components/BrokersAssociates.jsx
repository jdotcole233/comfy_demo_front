import { Datatable, generateNewCulumns } from "components";
import { useAuth } from "context/AuthContext";
import React, { useMemo } from "react";
import { Fragment } from "react";
import AssociateButtons from "./AssociateButtons";
import { associatesColumnns } from "./columns";

const BrokersAssociates = ({ broker }) => {
  const { user } = useAuth();
  const associates = useMemo(() => {
    if (broker) {
      const list = [];
      broker.reinsurer_representatives.map((_reinsurer, i) => {
        const row = {
          name: `${_reinsurer.rep_first_name} ${_reinsurer.rep_last_name}`,
          phone: `${_reinsurer.rep_primary_phonenumber}, ${_reinsurer.rep_secondary_phonenumber}`,
          email: `${_reinsurer.rep_email}`,
          position: `${_reinsurer.position}`,
          actions: <AssociateButtons reinsurer={_reinsurer} data={broker} />,
        };
        list.push(row);
        return _reinsurer;
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
