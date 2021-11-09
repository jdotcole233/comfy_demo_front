import React, { Fragment, useMemo } from "react";
import { Datatable, generateNewCulumns } from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { associatesColumnns } from "../columns";
import AssociateButtons from "./AssociateButtons";

const ReinsurerDetailsAssociateListing = ({ reinsurer }) => {
  //   const reinsurer = useSelector((state) => state.reinsurer.reinsurer);
  const { user } = useAuth();
  const associates = useMemo(() => {
    if (reinsurer) {
      const list = [];
      reinsurer.reinsurer_representatives.map((_reinsurer, i) => {
        const row = {
          name: `${_reinsurer.rep_first_name} ${_reinsurer.rep_last_name}`,
          phone: `${_reinsurer.rep_primary_phonenumber}, ${_reinsurer.rep_secondary_phonenumber}`,
          email: `${_reinsurer.rep_email}`,
          position: `${_reinsurer.position}`,
          actions: <AssociateButtons reinsurer={_reinsurer} data={reinsurer} />,
        };
        list.push(row);
        return reinsurer;
      });
      return list;
    }
    return [];
  }, [reinsurer]);

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
                  user?.user_role?.position
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

export default ReinsurerDetailsAssociateListing;
