import React, { Fragment, useState } from "react";
import { money, mult } from "../../../utils";
import styles from "../styles/ViewInsurerOffer.module.css";

const NonPorportionalTreatyReceiveablePaymentForm = ({
  treaty = {},
  expectedAmtToBePaid,
  reinsurer = {},
  updateAll,
  treaty_account_id,
  remaining,
}) => {
  const [form_inputs, setForm_inputs] = useState({
    payment_type: "",
    cheque_number: "",
    bank_name: "",
    beneficiary_bank_name: "",
    treaty_payment_comment: "",
    payment_amount: "",
    date_on_cheque: "",
    treaty_account_id: treaty_account_id,
  });
  const [amountError, setAmountError] = useState(false);
  const [hide, setHide] = useState(true);

  const payments = treaty?.receivable_payments || [];

  const reinsurerPayments = payments
    ?.filter(
      (el) =>
        el.treaty_participant?.reinsurer?.reinsurer_id ===
          reinsurer?.reinsurer?.reinsurer_id && el.uuid === treaty_account_id
    )
    ?.reduce((acc, curr) => acc + parseFloat(curr?.payment_amount), 0);

  const paymentShare =
    mult(
      parseFloat(reinsurer?.treaty_participation_percentage) / 100,
      expectedAmtToBePaid
    ) - reinsurerPayments;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "payment_amount") {
      if (value > paymentShare || value < 0) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    }

    const _ = {
      ...form_inputs,
      [name]: value,
    };
    setForm_inputs(_);

    updateAll &&
      updateAll({
        payment_amount: form_inputs.payment_amount,
        treaty_participation_id: reinsurer?.treaty_participation_id,
        uuid: treaty_account_id,
        payment_detail: JSON.stringify(_),
      });
  };

  const paid = reinsurerPayments >= paymentShare;

  return (
    <Fragment>
      <div className="row mb-3">
        {/* {JSON.stringify(reinsurer?.treaty_participation_percentage)} */}
        {/* {paymentShare} {reinsurerPayments} */}
      </div>
      <div
        className={`column mb-2 d-flex bg-soft-${
          paid ? "success" : "primary"
        } p-2 justify-content-between align-items-center flex-row`}
      >
        <div className="d-flex align-items-center">
          <div className="ml-2">
            <i style={{ fontSize: 32 }} className="bx bx-buildings"></i>
          </div>
          <div className="col-md-12 d-flex align-items-start flex-column">
            <span>
              {reinsurer?.reinsurer?.re_company_name}{" "}
              <span className="font-weight-bold">
                {treaty?.currency} {money(paymentShare)}
              </span>
            </span>
            <div>
              {!paid ? (
                <span className="badge w-auto mr-2 px-2 font-size-13 mt-2 badge-soft-success">
                  {reinsurer?.treaty_participation_percentage}%
                  {/* {money(remaining)} */}
                </span>
              ) : null}
              <span
                className={`badge w-auto px-2 font-size-13 mt-2 badge-soft-${
                  reinsurerPayments === 0
                    ? "danger"
                    : paid
                    ? "success"
                    : "warning"
                }`}
              >
                {reinsurerPayments === 0
                  ? "UNPAID"
                  : paid
                  ? "Full Payment"
                  : "Part Payment"}
              </span>
            </div>
          </div>
        </div>
        <div>
          {!paid ? (
            <i
              onClick={() => setHide((prev) => !prev)}
              style={{ fontSize: 32, cursor: "pointer" }}
              className={`bx bx-chevron-${hide ? "down" : "up"}`}
            ></i>
          ) : null}
          {/* <i className='bx -up'></i> */}
        </div>
      </div>
      {paid ? null : hide ? null : (
        <div
          style={{
            transition: "all",
            transitionDuration: 2,
            height: hide ? 0 : "auto",
            overflow: "hidden",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="paymentype">Payment type </label>
              <select
                name="payment_type"
                value={form_inputs.payment_type}
                onChange={handleChange}
                id=""
                className="form-control"
                required
              >
                <option value="">Choose a type</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          {form_inputs.payment_type ? (
            <fieldset className="border mt-3 p-2">
              <legend className={styles.details_title}>Payment From</legend>
              <div className="row">
                {form_inputs.payment_type !== "Bank Transfer" && (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cheque Number">Cheque Number</label>
                      <input
                        name="cheque_number"
                        value={form_inputs.cheque_number}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="cheque Nunmber"
                        required
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`col-md-${
                    form_inputs.payment_type === "Bank Transfer" ? "12" : "6"
                  }`}
                >
                  <div className="form-group">
                    <label htmlFor="Bank name">Bank name</label>
                    <input
                      type="text"
                      name="bank_name"
                      value={form_inputs.bank_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Bank name"
                      required
                    />
                  </div>
                </div>
                {form_inputs.payment_type !== "Bank Transfer" && (
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="cheque Nunmber">Date on Cheque</label>
                      <input
                        name="date_on_cheque"
                        value={form_inputs.date_on_cheque}
                        onChange={handleChange}
                        type="date"
                        className="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </fieldset>
          ) : null}

          {form_inputs.payment_type === "Bank Transfer" && (
            <fieldset className="border mt-3 p-2">
              <legend className={styles.details_title}>Payment To</legend>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="Bank name">Bank name</label>
                    <input
                      type="text"
                      name="beneficiary_bank_name"
                      value={form_inputs.beneficiary_bank_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Bank name"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          )}
          <fieldset className="border mt-3 p-2">
            <legend className={styles.details_title}>Payment Details</legend>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Amount">Amount</label>
                  <input
                    type="number"
                    value={form_inputs.payment_amount}
                    onChange={handleChange}
                    name="payment_amount"
                    className="form-control"
                    placeholder="Amount"
                    required
                  />
                  {amountError && (
                    <p className="text-danger">
                      Please enter a value not less than 0 or greater than{" "}
                      {money(paymentShare)}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Currency">Currency</label>
                  <input
                    type="text"
                    value={treaty?.currency}
                    className="form-control"
                    placeholder="Currency"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="Comment">Comment</label>
                  <textarea
                    value={form_inputs.treaty_payment_comment}
                    onChange={handleChange}
                    name="treaty_payment_comment"
                    cols="30"
                    rows="10"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      )}
    </Fragment>
  );
};

export default NonPorportionalTreatyReceiveablePaymentForm;
