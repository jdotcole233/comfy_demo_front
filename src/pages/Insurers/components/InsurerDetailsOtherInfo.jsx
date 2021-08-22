import React from "react";
// import { useSelector } from "react-redux";
import { useInsurerProps } from "../providers/InsurerProvider";

const InsurerDetailsOtherInfo = ({ insurer }) => {
  // const { insurer } = useInsurerProps();
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Other Information</h4>

        <div className="table-responsive">
          <table className="table table-nowrap mb-0">
            <tbody>
              <tr>
                <th scope="row">Region:</th>
                <td>{insurer?.insurer_address.region}</td>
              </tr>
              <tr>
                <th scope="row">City :</th>
                <td>{insurer?.insurer_address.suburb}</td>
              </tr>
              <tr>
                <th scope="row">E-mail :</th>
                <td>{insurer?.insurer_company_email}</td>
              </tr>
              <tr>
                <th scope="row">Website :</th>
                <td>{insurer?.insurer_company_website}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsurerDetailsOtherInfo;
