/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";
import moment from "moment";
import { money } from "./CreditNote";
import PreviewLogo from '../../../components/PreviewLogo'

const netAmount = (amountForOrder, nic, wth, brokerage) =>
  amountForOrder - (parseFloat(nic) + parseFloat(wth) + parseFloat(brokerage));

const LayerDebitNote = ({
  layer,
  treaty,
  layer_number,
  reinsurer,
  insurer,
}) => {
  const amountForOrder =
    ((reinsurer?.treaty_participation_percentage || 0) / 100) *
    parseFloat(layer?.m_and_d_premium);
  const deduction = reinsurer?.treaty_participant_deductions;
  const _netAmount = netAmount(
    amountForOrder,
    deduction?.nic_levy_amount,
    deduction?.withholding_tax_amount,
    deduction?.brokerage_amount
  );
  const _fig = parseInt(layer?.installment_type);
  const months =
    _fig === 1
      ? [1]
      : _fig === 2
      ? [1, 7]
      : _fig === 3
      ? [1, 5, 9]
      : [1, 4, 7, 10];
  return (
    <>
      <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_np_credit_note/${btoa(
            JSON.stringify({
              participant_id: reinsurer?.treaty_participation_id,
              limit: layer?.limit,
              layer: layer_number,
              uuid: layer?.uuid,
              m_and_d_premium: layer?.m_and_d_premium,
              total_participation_percentage:
                reinsurer?.treaty_participation_percentage,
              installment_type: layer?.installment_type,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div>
      <div className="preview-card container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-6 col-6"></div>
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              width={100}
              height={100}
              src={require("../../../assets/logo.png")}
              alt="company name"
            />
            <p style={{ color: "#000" }}>
              Date: {moment().format("DD MMMM YYYY")}
            </p>
          </div>
          <PreviewLogo />
          <div className="col-md-12">
            <address>
              {reinsurer?.reinsurer?.re_company_name}, <br />
              {reinsurer?.reinsurer?.reinsurer_address?.suburb} <br />
              {reinsurer?.reinsurer?.reinsurer_address?.region} <br />
              {reinsurer?.reinsurer?.reinsurer_address?.country}. <br />
            </address>
          </div>
          <div className="col-md-6"></div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <address>
              Our Reference: {treaty?.treaty_reference} <br />
              {/* Contact: {insurer?.insurer_address.suburb}  <br /> */}
              Tel: 0265375693/0558459447 <br />
              Email: samsali@visalre.com <br />
            </address>
          </div>
          <div className="col-md-12">
            <div className="reference">
              <div className="reference-header">
                <p
                  style={{ color: "#000", fontWeight: "bold" }}
                  className="text-bold"
                >
                  REINSURED
                </p>
              </div>
              <div className="reference-value">
                <p style={{ color: "#000" }}>
                  : {insurer?.insurer_company_name}{" "}
                </p>
              </div>
            </div>
            <div className="reference">
              <div className="reference-header">
                <p
                  style={{ color: "#000", fontWeight: "bold" }}
                  className="text-bold"
                >
                  TYPE
                </p>
              </div>
              <div className="reference-value">
                <p style={{ color: "#000" }}>
                  : {""} {treaty?.treaty_program?.treaty_name}
                </p>
              </div>
            </div>
            <div className="reference">
              <div className="reference-header">
                <p
                  style={{ color: "#000", fontWeight: "bold" }}
                  className="text-bold"
                >
                  LIMIT
                </p>
              </div>
              <div className="reference-value">
                <p style={{ color: "#000" }}>
                  : {""}
                  {money(parseFloat(layer?.limit))}
                </p>
              </div>
            </div>
            <div className="reference">
              <div className="reference-header">
                <p
                  style={{ color: "#000", fontWeight: "bold" }}
                  className="text-bold"
                >
                  PERIOD
                </p>
              </div>
              <div className="reference-value">
                <p style={{ color: "#000" }}>
                  : {""}{" "}
                  {moment(treaty?.treaty_deduction?.treaty_period_from).format(
                    "Do MMMM, YYYY"
                  )}{" "}
                  to{" "}
                  {moment(treaty?.treaty_deduction?.treaty_period_to).format(
                    "Do MMMM, YYYY"
                  )}
                </p>
              </div>
            </div>
            <div className="reference">
              <div className="reference-header">
                <p
                  style={{ color: "#000", fontWeight: "bold" }}
                  className="text-bold"
                >
                  Layer
                </p>
              </div>
              <div className="reference-value">
                <p style={{ color: "#000" }}>
                  : {""} {layer_number}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <h3 style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
              Credit Note
            </h3>
          </div>
          <div className="col-md-10 col-sm-12 debit-center col-xs-12 ml-md-4 px-8">
            <div style={{ color: "#000" }} className="row ">
              <div className="col-md-8 col-6 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text-1">CURRENCY:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value-1">{treaty?.currency}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-4 col-xs-4">
                <h3 className="dark-text-1">100% AMOUNT:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-8 col-xs-8">
                <h3 className="dark-text-value-1">
                  {money(parseFloat(layer?.m_and_d_premium))}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text-1">AMOUNT FOR ORDER:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value-1">{money(amountForOrder)}</h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text-1">WITHHOLDING TAX:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value-1">
                  {money(deduction?.withholding_tax_amount)}
                </h3>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text-1">NIC CONTRIBUTION:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value-1">
                  {money(deduction?.nic_levy_amount)}
                </h3>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text-1">BROKERAGE:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-value-1">
                  {money(deduction?.brokerage_amount)}
                </h3>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-8 col-6 col-sm-4 col-xs-4">
                <h3 className="dark-text-1">NET AMOUNT DUE:</h3>
              </div>
              <div className="col-md-4 col-6 col-sm-8 col-xs-8">
                <h3 className="dark-text-1">{money(_netAmount)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <table
              style={{ color: "#000", lineHeight: 0 }}
              className="table table-borderless"
            >
              <thead>
                <th>INSTALLMENT REFERENCE</th>
                <th>INSTALLMENT DUE</th>
                <th>AMOUNT </th>
              </thead>
              <tbody>
                {months.map((month, key) => (
                  <tr key={key}>
                    <td>0{key + 1}</td>
                    <td>
                      {moment(
                        `${month}/01/${moment(
                          treaty?.treaty_deduction?.treaty_period_from
                        ).get("y")}`
                      ).format("DD MMM YYYY")}
                    </td>
                    <td>{money(_netAmount / parseInt(_fig))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayerDebitNote;
