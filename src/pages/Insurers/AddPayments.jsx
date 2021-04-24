/* eslint-disable no-throw-literal */
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/ViewInsurerOffer.module.css";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-apollo";
import {
  MAKE_PAYMENT_INSURER,
  UPDATE_PAYMENT_INSURER,
} from "../../graphql/mutattions";
import { INSURER, INSURER_OFFERS } from "../../graphql/queries";
import swal from "sweetalert";
import { useAuth } from "../../context/AuthContext";
import { CurrencyOption, Selector } from "../../components";
import currencies from "../../assets/currencies.json";
import plural from "pluralize";

const prepData = ({
  payment,
  form_inputs,
  user,
  details,
  addExchangeRate,
  amountToBePaid,
}) => ({
  offer_payment_id: payment?.offer_payment_id,
  offer_id: details?.offer_id,
  payment_amount: form_inputs.payment_amount,
  payment_status:
    parseFloat(amountToBePaid).toFixed(2) ===
    parseFloat(form_inputs.payment_amount).toFixed(2)
      ? "PAID"
      : "PARTPAYMENT",
  payment_details: JSON.stringify({
    employee_id: user?.employee?.employee_id,
    payment_type: form_inputs.payment_type,
    payment_from: {
      cheque_number: form_inputs.cheque_number
        ? form_inputs.cheque_number
        : "N/A",
      bank_name: form_inputs.bank_name,
      date_on_cheque: form_inputs.date_on_cheque,
    },
    payment_to: form_inputs.beneficiary_bank_name,
    conversion: {
      rate: form_inputs.exchange_rate,
      currency: form_inputs.currency,
      addExchangeRate: addExchangeRate,
    },
  }),
  Offer_payment_comment: form_inputs.offer_payment_comment
    ? form_inputs.offer_payment_comment
    : "-",
});

const getSum = (name, details) =>
  details[name] +
  details?.offer_endorsements?.reduce(
    (prev, curr) => prev + parseFloat(curr[name]),
    0
  );

export const AddPayments = ({ details, edit, insurer_id, toggle, payment }) => {
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
  const [makePayment] = useMutation(MAKE_PAYMENT_INSURER, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer_id } },
      { query: INSURER_OFFERS, variables: { id: insurer_id, skip: 0 } },
    ],
  });

  const [updatePayment] = useMutation(UPDATE_PAYMENT_INSURER, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer_id } },
      { query: INSURER_OFFERS, variables: { id: insurer_id, skip: 0 } },
    ],
  });

  const hasEndorsement =
    details?.offer_endorsements[details?.offer_endorsements?.length - 1];
  useEffect(() => {
    if (details) {
      let sumOfPaymentAmounts = 0;
      details.offer_payment.map((payment) => {
        const _payment_details = JSON.parse(payment.payment_details);
        const amount_paid =
          parseFloat(payment.payment_amount) /
          parseFloat(_payment_details.conversion.rate);
        sumOfPaymentAmounts += parseFloat(amount_paid);
        return payment;
      });

      const fac_premium = getSum("fac_premium", details);
      const commission_amount = getSum("commission_amount", details);
      const paymentThreshold = hasEndorsement
        ? parseFloat(hasEndorsement?.fac_premium) -
          parseFloat(hasEndorsement?.commission_amount) -
          sumOfPaymentAmounts
        : parseFloat(fac_premium) -
          parseFloat(commission_amount) -
          sumOfPaymentAmounts;
      setExpectedAmtToBePaid(paymentThreshold > 0 ? paymentThreshold : 0);
    }
  }, [details, form_inputs, hasEndorsement]);

  useEffect(() => {
    if (expectedAmtToBePaid && addExchangeRate) {
      setNewExpectedAmount(expectedAmtToBePaid * form_inputs?.exchange_rate);
    }
  }, [form_inputs, expectedAmtToBePaid, addExchangeRate]);

  useEffect(() => {
    if (payment && details) {
      const obj = JSON.parse(payment.payment_details);
      // alert(payment.payment_details)
      setForm_inputs({
        payment_amount: payment.payment_amount,
        cheque_number: obj.payment_from.cheque_number,
        bank_name: obj.payment_from.bank_name,
        beneficiary_bank_name: obj.payment_to,
        offer_payment_comment: payment.offer_payment_comment,
        payment_type: obj.payment_type,
        date_on_cheque: obj.payment_from.date_on_cheque,
        exchange_rate: obj.conversion.rate,
        currency: obj.conversion.currency,
      });
      setCurrency(obj.conversion.currency);
      setAddExchangeRate(obj.conversion.addExchangeRate);
    }
  }, [payment, details]);

  const valueToCheckWith = addExchangeRate
    ? newExpectedAmount
    : expectedAmtToBePaid;

  useEffect(() => {
    if (parseFloat(form_inputs.payment_amount) > valueToCheckWith.toFixed(2)) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  }, [valueToCheckWith, form_inputs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "payment_amount" &&
      (parseFloat(value) > valueToCheckWith.toFixed(2) || value < 0)
    ) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
    setForm_inputs({
      ...form_inputs,
      [name]: value,
    });
  };

  const handleMakePayment = (event) => {
    event.preventDefault();

    const data = prepData({
      payment,
      details,
      form_inputs,
      addExchangeRate,
      user,
      amountToBePaid: valueToCheckWith,
    });

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to make payment ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      makePayment({
        variables: { data },
      })
        .then((res) => {
          swal("Sucess", "Payment made Successfully", "success");
          // formRef.current.reset()
          setForm_inputs({
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
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleUpdatePayment = (event) => {
    event.preventDefault();
    const data = prepData({
      payment,
      details,
      form_inputs,
      addExchangeRate,
      user,
      amountToBePaid: valueToCheckWith,
    });
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to update payment?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updatePayment({
        variables: { data },
      })
        .then((res) => {
          swal("Sucess", "Payment updated Successfully", "success");
          formRef.current.reset();
          setForm_inputs({
            payment_type: "",
            cheque_number: "",
            bank_name: "",
            beneficiary_bank_name: "",
            offer_payment_comment: "",
            payment_amount: "",
            date_on_cheque: "",
          });
          toggle();
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value ? value.value.code : "");
    setForm_inputs((prev) => ({
      ...prev,
      currency: value ? value.value.code : "",
    }));
  };

  const handleExchangeRateChange = (value) => {
    setForm_inputs((prev) => ({
      ...prev,
      exchange_rate: value,
    }));
  };

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

        {hasEndorsement && (
          <div className="alert alert-info">
            <div className="row">
              <h2 className="font-size-16">
                Found{" "}
                {plural(
                  "endorsement",
                  details?.offer_endorsements?.length,
                  true
                )}
              </h2>
            </div>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Offer type</th>
                  <th>Date created</th>
                  <th>Fac. Premium</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-warning text-white">
                  <td>Original Offer</td>
                  <td>{new Date(details?.created_at).toDateString()}</td>
                  <td
                    className={`${
                      String(details?.fac_premium).charAt(0) === "-"
                        ? "text-danger"
                        : String(details?.fac_premium).charAt(0) === "+"
                        ? "text-success"
                        : ""
                    }`}
                  >
                    {details?.offer_detail?.currency} {details?.fac_premium}
                  </td>
                  <td
                    className={`${
                      String(details?.fac_premium).charAt(0) === "-"
                        ? "text-danger"
                        : String(details?.fac_premium).charAt(0) === "+"
                        ? "text-success"
                        : ""
                    }`}
                  >
                    {details?.offer_detail?.currency}{" "}
                    {details?.commission_amount}
                  </td>
                </tr>
                {details?.offer_endorsements?.map((end, eID) => (
                  <tr>
                    <td>Endorsement {eID + 1}</td>
                    <td>{new Date(end.created_at).toDateString()}</td>
                    <td
                      className={`${
                        String(end.fac_premium).charAt(0) === "-"
                          ? "text-danger"
                          : ""
                      }`}
                    >
                      {end.offer_endorsement_detail?.currency} {end.fac_premium}
                    </td>
                    <td
                      className={`${
                        String(end.fac_premium).charAt(0) === "-"
                          ? "text-danger"
                          : ""
                      }`}
                    >
                      {end.offer_endorsement_detail?.currency}{" "}
                      {end.commission_amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Currency">Currency</label>
                {/* {&& <input type="text" value={form_inputs.currency} onChange={() => { }} className="form-control" placeholder="Currency" readOnly />} */}
                <input
                  type="text"
                  value={
                    form_inputs.currency ||
                    details?.offer_detail.currency ||
                    details?.exchange_rate?.ex_currency
                  }
                  onChange={() => {}}
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
        <div className="row">
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
