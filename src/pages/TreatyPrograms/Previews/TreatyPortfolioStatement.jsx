/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from "react";
import { BASE_URL_LOCAL } from "../../../graphql";
import { money } from "../../../utils";
import "../styles/preview.css";
import PreviewLogo from "../../../components/PreviewLogo";

const TreatyPortfolioStatement = ({
  reinsurer = {},
  treaty = {},
  note = {},
}) => {
  // const treaty_deduction = treaty?.treaty_deduction;
  // const getNetPremium = (a, b) => parseFloat(a) - parseFloat(b);
  // const withPortfolioEntry = JSON.parse(
  //   treaty?.treaty_proportional_detail?.portfolio_entry ?? "{}"
  // );

  // const getCommissionAmount = (percentage) =>
  //   (parseFloat(percentage) / 100) *
  //   parseFloat(treaty?.treaty_proportional_detail?.overall_gross_premium);

  // const portfolioWithdrawal =
  //   (parseFloat(withPortfolioEntry.withdrawal_percentage) / 100) *
  //   getNetPremium(
  //     treaty?.treaty_proportional_detail?.overall_gross_premium,
  //     getCommissionAmount(treaty_deduction?.commission)
  //   );

  // const amountDue =
  //   portfolioWithdrawal +
  //   parseFloat(treaty?.treaty_proportional_detail?.losses_outstanding);

  const url = `${BASE_URL_LOCAL}/treaty_portfolio_statement/${Buffer.from(
    JSON.stringify({
      treaty_participation_id: reinsurer?.treaty_participation_id,
      treaty_id: treaty?.treaty_id,
    })
  ).toString("base64")}`;

  return (
    <Fragment>
      {/* <p style={{ wordWrap: "break-word" }}>{JSON.stringify(reinsurer)}</p> */}
      {/* {JSON.stringify(withPortfolioEntry)} */}
      <div className="row m-2">
        {/* <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_portfolio_statement/${btoa(
            JSON.stringify({
              treaty_participation_id: reinsurer?.treaty_participation_id,
              treaty_id: treaty?.treaty_id,
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
        // className="preview-card container-fluid text-black bg-white"
        src={url}
        frameborder="0"
      ></iframe>
      {/* <div className="container-fluid p-4 text-black bg-white">
        <div className="row">
          <div className="col-md-6 col-6"></div>
          <PreviewLogo />
          <div
            className="col-md-6 col-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
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
                  <td className="dark-text-value-ps col-md-6">Date</td>
                  <td className="dark-text-value-ps col-md-6">
                    {new Date().toDateString()}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">To:</td>
                  <td className="dark-text-value-ps col-md-6">
                    {reinsurer?.reinsurer?.re_company_name}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">Reinsured:</td>
                  <td className="dark-text-value-ps col-md-6">
                    {treaty?.insurer?.insurer_company_name}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">Treaty</td>
                  <td className="dark-text-value-ps col-md-6">
                    {treaty?.treaty_program?.treaty_name}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">Period</td>
                  <td className="dark-text-value-ps col-md-6">
                    {withPortfolioEntry?.treaty_year}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">Cuurency</td>
                  <td className="dark-text-value-ps col-md-6">
                    {treaty?.currency}
                  </td>
                </tr>

                <tr>
                  <td className="dark-text-value-ps p-3 col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps big col-md-6">
                    WITHDRAWAL
                  </td>
                  <td className="dark-text-value-ps big col-md-6">CREDIT</td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    100.00% Gross Premium Ceded To Reinsurers -{" "}
                    {new Date().getFullYear()}
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      treaty?.treaty_proportional_detail?.overall_gross_premium
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Less Commission {treaty_deduction?.commission}%
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(getCommissionAmount(treaty_deduction?.commission))}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Net Premium Ceded
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      getNetPremium(
                        treaty?.treaty_proportional_detail
                          ?.overall_gross_premium,
                        getCommissionAmount(treaty_deduction?.commission)
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Premium Portfolio Withdrawal at{" "}
                    {new Date(
                      treaty?.treaty_proportional_detail?.created_at
                    ).toLocaleDateString()}{" "}
                    ({withPortfolioEntry.withdrawal_percentage}% of Net Premium
                    ceded in 2021)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(portfolioWithdrawal)}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Loss Portfolio Withdrawal at 06.06.2021 (
                    {withPortfolioEntry.withdrawal_loss_percentage}% of Net
                    Premium ceded in 2021)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      treaty?.treaty_proportional_detail?.losses_outstanding
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Portfolio Withdrawal Balance Due From Reinsurers (100.00%)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(amountDue)}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps big col-md-6">
                    ASSUMPTION
                  </td>
                  <td className="dark-text-value-ps big col-md-6">DEBIT</td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    100.00% Gross Premium Ceded To Reinsurers -{" "}
                    {new Date().getFullYear()}
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      treaty?.treaty_proportional_detail?.overall_gross_premium
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Less Commission {treaty_deduction?.commission}%
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(getCommissionAmount(treaty_deduction?.commission))}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Net Premium Ceded
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      getNetPremium(
                        treaty?.treaty_proportional_detail
                          ?.overall_gross_premium,
                        getCommissionAmount(treaty_deduction?.commission)
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Premium Portfolio Withdrawal at{" "}
                    {new Date(
                      treaty?.treaty_proportional_detail?.created_at
                    ).toLocaleDateString()}{" "}
                    ({withPortfolioEntry.withdrawal_percentage}% of Net Premium
                    ceded in 2021)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(portfolioWithdrawal)}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Loss Portfolio Withdrawal at 06.06.2021 (
                    {withPortfolioEntry.withdrawal_loss_percentage}% of Net
                    Premium ceded in 2021)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      treaty?.treaty_proportional_detail?.losses_outstanding
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps col-md-6">
                    Portfolio Withdrawal Balance Due From Reinsurers (100.00%)
                  </td>
                  <td className="dark-text-value-ps col-md-6">
                    {money(
                      portfolioWithdrawal +
                        parseFloat(
                          treaty?.treaty_proportional_detail?.losses_outstanding
                        )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table text-black table-condensed table-bordered">
              <tbody>
                <tr>
                  <td className="col-md-3 dark-text-value-ps">
                    Reinsurer Withdrawing {new Date().getFullYear()} Portfolio
                  </td>
                  <td className="col-md-3 dark-text-value-ps">Proportion</td>
                  <td className="col-md-3 dark-text-value-ps"></td>
                </tr>
                <tr>
                  <td className="col-md-3 dark-text-value-ps">
                    {reinsurer?.reinsurer?.re_company_name}
                  </td>
                  <td className="col-md-3 dark-text-value-ps">
                    {reinsurer?.treaty_participation_percentage}%
                  </td>
                  <td className="col-md-3 dark-text-value-ps">
                    {money(
                      (parseFloat(reinsurer?.treaty_participation_percentage) /
                        100) *
                        amountDue
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                </tr>
                <tr>
                  <td className="dark-text-value-ps p-3 col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                  <td className="dark-text-value-ps col-md-6"></td>
                </tr>
                <tr>
                  <td className="col-md-3 dark-text-value-ps">
                    Reinsurer Assuming {new Date().getFullYear()} Portfolio
                  </td>
                  <td className="col-md-3 dark-text-value-ps">Proportion</td>
                  <td className="col-md-3 dark-text-value-ps"></td>
                </tr>
                <tr>
                  <td className="col-md-3 dark-text-value-ps">
                    {reinsurer?.reinsurer?.re_company_name}
                  </td>
                  <td className="col-md-3 dark-text-value-ps">
                    {reinsurer?.treaty_participation_percentage}%
                  </td>
                  <td className="col-md-3 dark-text-value-ps">
                    {money(
                      (parseFloat(reinsurer?.treaty_participation_percentage) /
                        100) *
                        amountDue
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
     */}
    </Fragment>
  );
};

export default TreatyPortfolioStatement;
