/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";

const LayerDebitNote = ({
  layer,
  treaty,
  note,
  insurer,
  percentage,
  index,
}) => {
  const url = `${BASE_URL_LOCAL}/treaty_np_debit_note/${Buffer.from(
    JSON.stringify({
      treaty_id: treaty?.treaty_id,
      limit: layer?.limit,
      layer: index,
      m_and_d_premium: layer?.m_and_d_premium,
      total_participation_percentage: 100 - percentage,
      installment_type: layer?.installment_type,
    })
  ).toString("base64")}`;

  return (
    <>
      <div className="row m-2">
        {/* <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_np_debit_note/${btoa(
            JSON.stringify({
              treaty_id: treaty?.treaty_id,
              limit: layer?.limit,
              layer: index,
              m_and_d_premium: layer?.m_and_d_premium,
              total_participation_percentage: 100 - percentage,
              installment_type: layer?.installment_type,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a> */}
      </div>
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        title="Debit Note"
        src={url}
        frameborder="0"
      ></iframe>
      {/* <div className="preview-card container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-6 col-6"></div>
          <PreviewLogo />
          <div
            className="col-md-12 col-12"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <p style={{ color: "#000" }}>
              Date: {moment().format("DD MMMM YYYY")}
            </p>
          </div>
          <div className="col-md-12">
            <address>
              Our Reference: {treaty?.treaty_reference} <br /> <br />
              {moment().format("DD MMMM YYYY")} <br />
              The Managing Director <br />
              {insurer?.insurer_company_name}, <br />
              {insurer?.insurer_address.suburb} <br />
              {insurer?.insurer_address.region} <br />
              {insurer?.insurer_address.country}. <br /> <br />
              Dear sir
            </address>
          </div>
          <div className="col-md-6"></div>

          <div className="col-md-12 mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 18,
                textDecoration: "underline",
                fontWeight: "bolder",
              }}
            >
              Debit Note
            </h3>
          </div>
          <div className="col-md-12 mr-4 ml-4">
            <Row label="REINSURED" value={insurer?.insurer_company_name} />
            <Row label="COVER" value={treaty?.treaty_program?.treaty_name} />
            <Row label="LIMIT" value={money(parseFloat(layer?.limit))} />
            <Row
              label="Period"
              value={`${moment(
                treaty?.treaty_deduction?.treaty_period_from
              ).format("Do MMMM, YYYY")}${" "}
                to${" "}
                ${moment(treaty?.treaty_deduction?.treaty_period_to).format(
                  "Do MMMM, YYYY"
                )}`}
            />
            <Row label="Treaty Number" value={treaty?.treaty_reference} />
            <Row
              label="100% Gross Minimum
              And Deposit Premium"
              child={
                <table className="table table-borderless">
                  <tbody>
                    {JSON.parse(treaty?.layer_limit ?? "[]")?.map(
                      (layer, index) => (
                        <tr key={index}>
                          <td>{toLayerPosition((index + 1).toString())}</td>
                          <td>
                            {treaty?.currency}{" "}
                            {money(parseFloat(layer.m_and_d_premium))}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              }
            />
            <Row label="Our Order" value={`${100 - percentage} %`} />
          </div>

          <div className="col-md-12 mr-4 ml-3">
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
                    <td>{money(amountForOrder / parseInt(_fig))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    */}
    </>
  );
};

export default LayerDebitNote;

export const Row = ({ label, value, child }) => {
  return (
    <div className="reference">
      <div className="reference-header">
        <p style={{ color: "#000", fontWeight: "bold" }} className="text-bold">
          {label}
        </p>
      </div>
      <div className="reference-value">
        {child && child}
        {!child && (
          <p style={{ color: "#000" }}>
            {""} {value}
          </p>
        )}
      </div>
    </div>
  );
};
