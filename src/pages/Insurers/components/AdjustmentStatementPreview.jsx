/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from "react";
import { BASE_URL_LOCAL } from "../../../graphql";

const AdjustmentStatementPreview = ({ reinsurer, treaty }) => {
  return (
    <Fragment>
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        title="Adjustment Statement Preview"
        src={`${BASE_URL_LOCAL}/treaty_adjustment_statement/${btoa(
          JSON.stringify({
            treaty_participation_id: reinsurer?.treaty_participation_id,
            treaty_id: treaty?.treaty_id,
          })
        )}`}
        frameborder="0"
      ></iframe>
      {/* <div className="container-fluid p-4 text-black bg-white"> */}
      {/* <div className="row">
          <div className="col-md-6 col-6"></div>
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
              src={require("../../../assets/banner.png")}
              alt="company name"
            />
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <h3
              style={{
                textAlign: "center",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Treaty Closing
            </h3>
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <table className="table text-black table-condensed table-bordered">
              <tbody>
                <tr>
                  <td className="dark-text-value-ps col-md-3">Date</td>
                  <td className="dark-text-value-ps col-md-3">
                    {new Date().toDateString()}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">To:</td>
                  <td className="dark-text-value-ps col-md-3">
                    {reinsurer?.reinsurer?.re_company_name}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">Reinsured:</td>
                  <td className="dark-text-value-ps col-md-3">
                    {treaty?.insurer?.insurer_company_name}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">Treaty</td>
                  <td className="dark-text-value-ps col-md-3">
                    {treaty?.treaty_program?.treaty_name}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td colSpan={3} className="dark-text-value-ps border-0">
                    {new Date(details?.created_at).getFullYear()} Excess of Loss
                    Adjustment Statements
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">Cuurency</td>
                  <td className="dark-text-value-ps col-md-3">
                    {treaty?.currency}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>

                <tr>
                  <td className="dark-text-value-ps col-md-3">
                    Figures for 100%:
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps  col-md-3">
                    Retained Premium Income
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(details?.egrnpi)}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">
                    Losses Incurred
                  </td>
                  <td className="dark-text-value-ps col-md-3">Paid</td>
                  <td className="dark-text-value-ps col-md-3">Outstanding</td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps  col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(parseFloat(details?.claims_paid))}
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(parseFloat(details?.outstanding_payment))}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps  col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(parseFloat(details?.outstanding_payment))}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps  col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(
                      parseFloat(details?.claims_paid) +
                        parseFloat(details?.outstanding_payment)
                    )}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">
                    Total incured losses
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(
                      parseFloat(details?.claims_paid) +
                        parseFloat(details?.outstanding_payment)
                    )}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3">
                    Pure Burning Cost
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(
                      parseFloat(details?.claims_paid) +
                        parseFloat(details?.outstanding_payment)
                    )}
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(parseFloat(details?.pure_burning_cost ?? 0))}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3  col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(details?.egrnpi)}
                  </td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-3">
                    Loaded Burning Cost
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {details?.pure_burning_cost ?? 0} x
                    {` (${layers[0]?.numerator}/${layers[0]?.denominator})`}
                  </td>
                  <td className="dark-text-value-ps col-md-3">
                    {money(details?.loaded_burning_cost ?? 0)}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                {layers.map((layer, layerId) => {
                  const m_and_d = parseFloat(layer?.m_and_d_premium) ?? 0;
                  const adjustedPremium =
                    layerId === 0
                      ? mult(
                          parseFloat(details?.loaded_burning_cost ?? 0),
                          details?.egrnpi
                        )
                      : mult(
                          parseFloat(layer?.adjust_rate) / 100,
                          details?.egrnpi
                        );

                  const additionalPremiumDue =
                    parseFloat(adjustedPremium) - parseFloat(m_and_d);
                  const brokerage = mult(
                    parseFloat(deduction?.brokerage) / 100,
                    additionalPremiumDue
                  );
                  const additionalPremiumDueReinsurer =
                    additionalPremiumDue - brokerage;
                  sumOfAdditionalPremiumDue += additionalPremiumDueReinsurer;
                  return (
                    <Fragment>
                      <tr>
                        <td className="dark-text-value-ps big col-md-3">
                          {toLayerPosition((layerId + 1).toString())}
                        </td>
                        <td className="dark-text-value-ps big col-md-3">
                          {layerId === 0
                            ? details?.loaded_burning_cost ?? 0
                            : layer?.adjust_rate}
                          %
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps p-3 col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"></td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Adjusted Premium
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3">
                          {money(adjustedPremium)}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Less Minimum & Deposit Premium paid
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3">
                          {money(parseFloat(m_and_d))}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Additional Premium due
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3">
                          {money(additionalPremiumDue)}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Less Brokerage {deduction?.brokerage}%
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3">
                          {money(brokerage)}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Less NIC Levy {deduction?.nic_levy}%
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"> -</td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps  col-md-3">
                          Less Withholding Tax {deduction?.withholding_tax}%
                        </td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"> -</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="dark-text-value-ps big">
                          Additional Premium due to Reinsurers
                        </td>
                        <td className="dark-text-value-ps big col-md-3">
                          {money(additionalPremiumDueReinsurer)}
                        </td>
                      </tr>
                      <tr>
                        <td className="dark-text-value-ps p-3 col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"></td>
                        <td className="dark-text-value-ps col-md-3"></td>
                      </tr>
                    </Fragment>
                  );
                })}
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                  <td className="dark-text-value-ps col-md-3"></td>
                </tr>
                <tr>
                  <td colSpan={2} className="dark-text-value-ps big">
                    Total Additional Premium due to Reinsurers:
                  </td>
                  <td className="dark-text-value-ps big col-md-3">
                    {money(sumOfAdditionalPremiumDue)}
                  </td>
                </tr>
              </tbody>

              <tr>
                <td className="dark-text-value-ps  col-md-3">
                  Balance due to Reinsurers:
                </td>
                <td className="dark-text-value-ps col-md-3"></td>
                <td className="dark-text-value-ps col-md-3">
                  {money(sumOfAdditionalPremiumDue)}
                </td>
              </tr>
              <tr>
                <td className="dark-text-value-ps  col-md-3">
                  Your participation:
                </td>
                <td className="dark-text-value-ps col-md-3"></td>
                <td className="dark-text-value-ps col-md-3">
                  {reinsurer?.treaty_participation_percentage}%
                </td>
              </tr>
              <tr>
                <td className="dark-text-value-ps  col-md-3">
                  Balance due to you:
                </td>
                <td className="dark-text-value-ps col-md-3"></td>
                <td className="dark-text-value-ps col-md-3">
                  {money(
                    mult(
                      parseFloat(reinsurer?.treaty_participation_percentage) /
                        100,
                      sumOfAdditionalPremiumDue
                    )
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
       */}
      {/* </div> */}
    </Fragment>
  );
};

export default AdjustmentStatementPreview;
