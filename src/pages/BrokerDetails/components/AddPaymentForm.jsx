import React, { useRef, useState } from "react";
import { useMutation } from "react-apollo";
import {
  MAKE_PAYMENT_BROKER,
  UPDATE_PAYMENT_BROKER,
} from "../../../graphql/mutattions/brokers";
import { BROKER } from "../../../graphql/queries/brokers";

const AddPaymentForm = () => {
  const { user } = useAuth();
  const [expectedAmtToBePaid, setExpectedAmtToBePaid] = useState(0);
  const [newExpectedAmount, setNewExpectedAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [auto_payment_receipt, setAuto_payment_receipt] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [form_inputs, setForm_inputs] = useState({
    payment_type: "",
    cheque_number: "",
    bank_name: "",
    beneficiary_bank_name: "",
    offer_payment_comment: "",
    payment_amount: "",
    date_on_cheque: "",
    currency: "",
    exchange_rate: 1.0,
  });

  const formRef = useRef();
  //   const [makePayment] = useMutation(MAKE_PAYMENT_BROKER, {
  //     refetchQueries: [{ query: INSURER, variables: { id: insurer_id } }],
  //   });

  //   const [updatePayment] = useMutation(UPDATE_PAYMENT_BROKER, {
  //     refetchQueries: [{ query: BROKER, variables: { id: insurer_id } }],
  //   });

  return (
    <div>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>{!edit ? "Make" : "Edit"} Payment</h3>
      </div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          if (edit) {
            handleUpdatePayment(e);
            return;
          }
          handleMakePayment(e);
        }}
        className={styles.card_body}
      >
        <Alert variant="danger">
          <p>
            The amount to be added to this offer will be distributed evenly to
            all entities participating on offer [
            {details?.offer_detail.policy_number}]. Taking into consideration{" "}
            <strong>commission, brokerage, withholding tax and NIC levy</strong>{" "}
            where applicable.
          </p>
          <p>
            {!edit ? "Make" : "Update"} payment to [
            {details?.offer_detail.policy_number}]
          </p>
          {details?.exchange_rate && (
            <p>
              This offer was created in {details?.offer_detail.currency}, but
              with an exchange rate of {details?.exchange_rate?.ex_rate} in{" "}
              {details?.exchange_rate?.ex_currency}
            </p>
          )}
          <p>
            <strong>
              Expected Amount:{" "}
              {details?.exchange_rate?.ex_currency ||
                details?.offer_detail.currency}{" "}
              {expectedAmtToBePaid.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </strong>
          </p>
          {addExchangeRate && form_inputs.currency && (
            <p>
              <strong>
                New Expected Amount (payable) : {form_inputs.currency}{" "}
                {newExpectedAmount.toFixed(2)}
              </strong>
            </p>
          )}
        </Alert>

        <div className="row">
          <div className="col-md-12">
            <div className="form-check mb-3">
              <input
                checked={addExchangeRate}
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setAddExchangeRate(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Pay in differenct Currency
              </label>
            </div>
          </div>

          {addExchangeRate && (
            <div className="col-md-12  ">
              <div className="alert alert-info">
                <div className="form-group">
                  <label htmlFor="">Select Currency</label>
                  <Selector
                    value={
                      currency
                        ? {
                            label: Object.values(currencies).find(
                              (eel) => eel.code === currency
                            )?.name,
                          }
                        : ""
                    }
                    components={{ Option: CurrencyOption }}
                    onChange={handleCurrencyChange}
                    options={[
                      ...Object.values(currencies).map((currency) => ({
                        label: currency.name,
                        value: currency,
                      })),
                    ]}
                  />
                </div>
                {currency && (
                  <div className="form-group">
                    <label htmlFor="">Rate</label>
                    <input
                      value={form_inputs.exchange_rate}
                      onChange={(e) => handleExchangeRateChange(e.target.value)}
                      type="number"
                      step="any"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="col-md-12">
            <label htmlFor="paymentype">Payment type</label>
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
        {form_inputs.payment_type.length ? (
          <fieldset className="border-form mt-3 p-2">
            <legend className={styles.details_title}>Payment From</legend>
            <div className="row">
              {form_inputs.payment_type !== "Bank Transfer" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cheque Nunmber">Cheque number</label>
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
                    <label htmlFor="cheque Nunmber">Date on cheque</label>
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
        <fieldset className="border-form mt-3 p-2">
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
        <fieldset className="border-form mt-3 p-2">
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
                    {valueToCheckWith.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            {(form_inputs.currency ||
              details?.offer_detail.currency ||
              details?.exchange_rate?.ex_currency) && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Currency">Currency</label>
                  {/* {&& <input type="text" value={form_inputs.currency} onChange={() => { }} className="form-control" placeholder="Currency" readOnly />} */}
                  <input
                    type="text"
                    value={
                      form_inputs.currency ||
                      details?.offer_detail.currency ||
                      details?.exchange_rate?.ex_currency ||
                      ""
                    }
                    onChange={() => console.log("")}
                    className="form-control"
                    placeholder="Currency"
                    readOnly
                  />
                </div>
              </div>
            )}

            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="Comment">Comment</label>
                <textarea
                  value={form_inputs.offer_payment_comment}
                  onChange={handleChange}
                  name="offer_payment_comment"
                  cols="30"
                  rows="10"
                  className="form-control"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="form-check mb-3">
              <input
                checked={auto_payment_receipt}
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setAuto_payment_receipt(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Auto send receipt
              </label>
            </div>
          </div>
        </div>
        <div className="for-group py-2">
          <input
            type="submit"
            disabled={amountError}
            className="form-control btn btn-primary w-md btn-sm"
            value={`${!edit ? "Make" : "Edit"} Payment`}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPaymentForm;
