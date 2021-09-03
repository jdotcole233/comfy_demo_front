import React from "react";

const BrokerDetailOtherInfo = ({ broker }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Other Information</h4>
        <div className="table-responsive">
          <table className="table table-nowrap mb-0">
            <tbody>
              <tr>
                <th scope="row">Region:</th>
                <td>{broker?.broker_address?.region}</td>
              </tr>
              <tr>
                <th scope="row">City :</th>
                <td>{broker?.broker_address?.suburb}</td>
              </tr>
              <tr>
                <th scope="row">E-mail :</th>
                <td>{broker?.broker_company_email}</td>
              </tr>
              <tr>
                <th scope="row">Website :</th>
                <td>{broker?.broker_company_website}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailOtherInfo;
