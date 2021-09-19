import React, { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Alert } from "react-bootstrap";
import { CurrencyOption, Loader, Selector } from "../../../components";
import currencies from "../../../assets/currencies.json";
import { useAuth } from "../../../context/AuthContext";
import {
  MAKE_PAYMENT_BROKER_PROP,
  UPDATE_PAYMENT_BROKER,
} from "../../../graphql/mutattions/brokers";
import { BROKER } from "../../../graphql/queries/brokers";
import styles from "../styles/ViewInsurerOffer.module.css";
import swal from "sweetalert";
import _ from "lodash";
import { TREATY } from "../../../graphql/queries/treaty";
import { getFlexibleName } from "../../Insurers/components/Note";

const prepData = ({
  form_inputs,
  user,
  details,
  addExchangeRate,
  amountToBePaid,
  auto_payment_receipt,
}) => ({
  re_broker_treaties_surplus_participation_id:
    details?.re_broker_treaties_surplus_participation_id,
  payment_amount: form_inputs.payment_amount,
  auto_payment_receipt,
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
  payment_comment: form_inputs.payment_comment
    ? form_inputs.payment_comment
    : "-",
});

const AddPaymentForm = ({ edit, _payments, payment, setShow, treaty_id }) => {
  const { user } = useAuth();
  const [expectedAmtToBePaid, setExpectedAmtToBePaid] = useState(0);
  const [newExpectedAmount, setNewExpectedAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [addExchangeRate, setAddExchangeRate] = useState(false);
  const [auto_payment_receipt, setAuto_payment_receipt] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [form_inputs, setForm_inputs] = useState({
    payment_type: "",
    cheque_number: "",
    bank_name: "",
    beneficiary_bank_name: "",
    payment_comment: "",
    payment_amount: "",
    date_on_cheque: "",
    currency: "",
    exchange_rate: 1.0,
  });

  const {
    data: treatyData,
    loading,
    error,
  } = useQuery(TREATY, {
    variables: { treaty_id },
  });

  const formRef = useRef();
  const [makePayment] = useMutation(MAKE_PAYMENT_BROKER_PROP, {
    refetchQueries: [{ query: BROKER, variables: { id: "" } }],
  });

  const [updatePayment] = useMutation(UPDATE_PAYMENT_BROKER, {
    refetchQueries: [{ query: BROKER, variables: { id: "" } }],
  });

  useEffect(() => {
    if (expectedAmtToBePaid && addExchangeRate) {
      setNewExpectedAmount(expectedAmtToBePaid * form_inputs?.exchange_rate);
    }
  }, [form_inputs, expectedAmtToBePaid, addExchangeRate]);

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

  useEffect(() => {
    if (selectedQuarter) {
      setExpectedAmtToBePaid(selectedQuarter?.share_amount);
    }
  }, [selectedQuarter]);

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

  const handleQuarterChange = (event) => {
    const { value } = event.target;
    const _quarter = _payments?.find(
      (el) => el.re_broker_treaties_surplus_participation_id === value
    );
    setSelectedQuarter(_quarter);
  };

  const handleMakePayment = (event) => {
    event.preventDefault();

    const data = prepData({
      payment,
      details: selectedQuarter,
      form_inputs,
      addExchangeRate,
      user,
      amountToBePaid: valueToCheckWith,
      auto_payment_receipt,
    });
    console.log(data);
    // return;

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to make payment ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      makePayment({
        variables: { payment_data: data },
      })
        .then((res) => {
          swal("Sucess", "Payment made Successfully", "success");
          // formRef.current.reset()
          setForm_inputs({
            payment_type: "",
            cheque_number: "",
            bank_name: "",
            beneficiary_bank_name: "",
            payment_comment: "",
            payment_amount: "",
            date_on_cheque: "",
            currency: "",
            exchange_rate: 1.0,
          });
          setShow(false);
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
      // details,
      form_inputs,
      addExchangeRate,
      user,
      amountToBePaid: valueToCheckWith,
      auto_payment_receipt,
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
            payment_comment: "",
            payment_amount: "",
            date_on_cheque: "",
          });
          setShow(false);
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

  if (loading) return <Loader />;

  return (
    <div>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>{!edit ? "Make" : "Edit"} Payment</h3>
      </div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          if (edit) {
            // handleUpdatePayment(e);
            return;
          }
          handleMakePayment(e);
        }}
        className={styles.card_body}
      >
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="paymentype">Quarter</label>
            <select
              name=""
              value={
                selectedQuarter?.re_broker_treaties_surplus_participation_id
              }
              onChange={handleQuarterChange}
              id=""
              className="form-control"
              required
            >
              <option value="">Choose quarter</option>
              {_payments?.map((quarter, key) => (
                <option
                  value={`${quarter?.re_broker_treaties_surplus_participation_id}`}
                >
                  {getFlexibleName(quarter?.treaty_account?.account_periods)}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedQuarter ? (
          <Alert variant="danger">
            <p>
              <strong>
                Expected Amount: {treatyData?.treaty?.currency}{" "}
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
        ) : null}

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
            {treatyData?.treaty?.currency && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Currency">Currency</label>
                  {/* {&& <input type="text" value={form_inputs.currency} onChange={() => { }} className="form-control" placeholder="Currency" readOnly />} */}
                  <input
                    type="text"
                    value={form_inputs.currency || treatyData?.treaty?.currency}
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
                  value={form_inputs.payment_comment}
                  onChange={handleChange}
                  name="payment_comment"
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
