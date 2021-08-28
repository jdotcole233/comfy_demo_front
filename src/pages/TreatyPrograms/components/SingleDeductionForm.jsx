import React from "react";

function SingleDeductionForm({ values, onChange, index, type }) {
  return (
    <div className="row border pt-2 mb-1">
      <div className="col-md-4 ">
        <div className="bg-white rounded px-3 sm:px-0 pt-2">
          <h3 className="dark-text text-truncate">{values?.name} </h3>
          <table className="table table-borderless">
            <tbody>
              {type === "PROPORTIONAL" && (
                <tr>
                  <th>Commission</th>
                  <td>{values?.commission || "0"}%</td>
                </tr>
              )}
              <tr>
                <th>Brokerage</th>
                <td>{values?.brokerage || "0"}%</td>
              </tr>
              <tr>
                <th>NIC Levy</th>
                <td>{values?.nic_levy || "0"}%</td>
              </tr>
              <tr>
                <th>Withholding Tax</th>
                <td>{values?.withholding_tax || "0"}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-8 row">
        {type === "PROPORTIONAL" && (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Commission">Commission</label>
              <input
                value={values?.commission}
                onChange={(e) => onChange(e, index)}
                name="commission"
                type="number"
                className="form-control"
              />
            </div>
          </div>
        )}
        <div
          className={`${type === "PROPORTIONAL" ? "col-md-6" : "col-md-12"}`}
        >
          <div className="form-group">
            <label htmlFor="Brokerage">Brokerage</label>
            <input
              value={values?.brokerage}
              onChange={(e) => onChange(e, index)}
              name="brokerage"
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="NIC Levy">NIC Levy</label>
            <input
              value={values?.nic_levy}
              onChange={(e) => onChange(e, index)}
              name="nic_levy"
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="Withholding TAx">Withholding Tax</label>
            <input
              value={values?.withholding_tax}
              onChange={(e) => onChange(e, index)}
              name="withholding_tax"
              type="number"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleDeductionForm;
