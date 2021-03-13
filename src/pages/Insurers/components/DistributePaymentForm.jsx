import React from "react";
import { Fragment } from "react";
import styles from "../styles/ViewInsurerOffer.module.css";

const DistributePaymentForm = ({
  index,
  data,
  reinsurers,
  participant,
  errors,
  handleChange,
}) => {
  const currency = data?.offer_detail?.currency;

  return (
    <Fragment>
      <fieldset className="border-form p-2 mb-2">
        <legend className={styles.details_title}>
          {data?.offer_participant[index]?.reinsurer?.re_company_name}
        </legend>
        <div className="row">
          <div className="col-md-12">
            {data?.offer_participant[index]?.offer_participant_payment
              ?.length ? (
              <table className="table border border-dark table-bordered">
                <tbody>
                  <tr>
                    <th>Facultative Premuim</th>
                    <td>
                      {data?.offer_participant[
                        index
                      ].participant_fac_premium?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <th>Withholding Tax</th>
                    <td>
                      {reinsurers[index]?.offer_deductions[
                        reinsurers[index]?.offer_deductions.length - 1
                      ]?.withholding_tax_paid?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Participating %</th>
                    <td>
                      {
                        data?.offer_participant[index]
                          .offer_participant_percentage
                      }
                    </td>
                    <th>Brokerage</th>
                    <td>
                      {reinsurers[index]?.offer_deductions[
                        reinsurers[index]?.offer_deductions.length - 1
                      ]?.brokerage_amount_paid?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>NIC levy</th>
                    <td>
                      {reinsurers[index]?.offer_deductions[
                        reinsurers[index]?.offer_deductions.length - 1
                      ]?.nic_levy_paid?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <th>Commission taken</th>
                    <td>
                      {reinsurers[index]?.offer_deductions[
                        reinsurers[index]?.offer_deductions.length - 1
                      ]?.commission_taken?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td></td>
                    <th>Amount</th>
                    <td>
                      {data?.offer_participant[index].offer_participant_payment[
                        data?.offer_participant[index].offer_participant_payment
                          .length - 1
                      ].offer_payment_amount?.toLocaleString("currency", {
                        currency,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="payment_type">Payment Type</label>
          <select
            name="payment_type"
            id=""
            value={participant.payment_type}
            onChange={(e) => handleChange(index, e)}
            className="form-control"
          >
            <option value="">Select payment type</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
          </select>
          {errors[index].payment_type.type && (
            <p>{errors[index].payment_type.message}</p>
          )}
        </div>

        {/* Banks section */}
        <div className="row">
          {participant.payment_type && (
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="bank name">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={participant.bank_name}
                  onChange={(e) => handleChange(index, e)}
                  name="bank_name"
                />
              </div>
            </div>
          )}
          {participant.payment_type === "Bank Transfer" && (
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="bank name">Beneficiary Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={participant.b_bank_name}
                  name="b_bank_name"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          )}
          {participant.payment_type === "Cheque" && (
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="bank name">Cheque Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={participant.cheque_number}
                  name="cheque_number"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          )}
        </div>
        {/* End of Bank section */}

        {/* Cheque section */}
        <div className="row"></div>
        {/* End of cheque section */}

        {/* Comment section */}
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            className="form-control"
            value={participant.comment}
            onChange={(e) => handleChange(index, e)}
            name="comment"
            id=""
            cols="30"
            rows="3"
          ></textarea>
        </div>
        {/* End of comment section */}
      </fieldset>
    </Fragment>
  );
};

export default DistributePaymentForm;
