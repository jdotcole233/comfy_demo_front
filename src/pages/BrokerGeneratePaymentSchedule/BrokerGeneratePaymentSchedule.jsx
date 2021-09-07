import { PageHeader, Selector } from "components";
import React from "react";

const BrokerGeneratePaymentSchedule = () => {
  return (
    <div className="page-content">
      <PageHeader name="Generate Payment schedule" base="Broker session" />
      <div className="card mt-4">
        <div className="card-header">
          <div className="card-title">Generate Payment schedule</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Treaty(ies)</label>
              <Selector label="Insurers" options={[]} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Treaty Program">Treaty(ies)</label>
              <Selector label="Insurers" options={[]} />
            </div>
            <div className="col-md-12 mt-4">
              <label htmlFor="Treaty Program">Treaty(ies)</label>
              <Selector label="Insurers" options={[]} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-4">
              <button className="btn btn-sm btn-primary">
                Generate schedule
              </button>
            </div>
          </div>
        </div>
      </div>

        <div className="card">
            <div className="card-header">
                <span className="card-title">Payment Schedule</span>
            </div>
            <div className="card-body">
                <table></table>
            </div>
        </div>

    </div>
  );
};

export default BrokerGeneratePaymentSchedule;
