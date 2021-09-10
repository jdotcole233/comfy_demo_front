import React from "react";
import { useBrokerDetailsContext } from "../provider/BrokerDetailsProvider";

const BrokerDetailOtherInfo = () => {
  const { broker } = useBrokerDetailsContext();
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Other Information</h4>
        <div className="table-responsive">
          <table className="table table-nowrap mb-0">
            <tbody>
              <tr>
                <th scope="row">Region:</th>
                <td>{broker?.re_broker_address?.city}</td>
              </tr>
              <tr>
                <th scope="row">City :</th>
                <td>{broker?.re_broker_address?.street}</td>
              </tr>
              <tr>
                <th scope="row">E-mail :</th>
                <td>{broker?.re_broker_email}</td>
              </tr>
              <tr>
                <th scope="row">Website :</th>
                <td>{broker?.re_broker_website ?? "NOT SPECIFIED"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailOtherInfo;
