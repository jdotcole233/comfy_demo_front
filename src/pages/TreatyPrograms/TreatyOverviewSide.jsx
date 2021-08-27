import React, { Fragment } from "react";
import moment from "moment";
// import { Drawer } from '../../components'
// import SendNote from './SendNote'
// import SendNonproportionalNote from './SendNonproportionalNote'

export default function TreatyOverviewSide({ treaty }) {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title">Treaty Overview</h4>
            {/* <button onClick={() => setShowSendingNoteDrawer(prev => !prev)} className="btn btn-primary btn-sm rounded-0">Send Document</button> */}
          </div>
        </div>

        <div className="card-body">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                Treaty Program
              </h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.treaty_program?.treaty_name}
              </h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                Reference No.
              </h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.treaty_reference}
              </h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                Ceding company
              </h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.insurer?.insurer_company_name}
              </h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>Period</h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {moment(treaty?.treaty_deduction?.treaty_period_from).format(
                  "Do MMM, YYYY"
                )}{" "}
                to{" "}
                {moment(treaty?.treaty_deduction?.treaty_period_to).format(
                  "Do MMM, YYYY"
                )}
              </h3>
            </div>
          </div>
          {treaty?.treaty_program?.treaty_type !== "NONPROPORTIONAL" && (
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <div
                className="col-md-6"
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                  Comission
                </h3>
              </div>
              <div
                className="col-md-6"
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                  {treaty?.treaty_deduction?.commission}%
                </h3>
              </div>
            </div>
          )}
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>Brokerage</h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.treaty_deduction?.brokerage}%
              </h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>NIC Levy</h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.treaty_deduction?.nic_levy}%
              </h3>
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                Withholding Tax
              </h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.treaty_deduction?.withholding_tax}%
              </h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>Currency</h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ fontSize: 15, fontWeight: "lighter" }}>
                {treaty?.currency}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
