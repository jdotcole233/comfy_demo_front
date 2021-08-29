/* eslint-disable no-throw-literal */
import { Alert, Modal } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-apollo";
import swal from "sweetalert";
import { INSURER } from "../../../graphql/queries";
import styles from "../styles/ViewInsurerOffer.module.css";
import { UPDATE_RECEIVABLE_PAYMENT } from "../../../graphql/queries/treaty";
import { money } from "../../../utils";
import _ from "lodash";

const EditReceivablePaymentForReinsurer = ({
  setShow,
  payment,
  insurer_id,
  details,
  treaty,
}) => {
  //   const [expectedAmtToBePaid, setExpectedAmtToBePaid] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [form_inputs, setForm_inputs] = useState({
    payment_type: "",
    cheque_number: "",
    bank_name: "",
    beneficiary_bank_name: "",
    offer_payment_comment: "",
    payment_amount: "",
    date_on_cheque: "",
  });

  const layers = JSON.parse(treaty?.layer_limit ?? "[]");

  const layer = layers.find((el) => el.uuid === payment?.uuid);
  const layerIndex = layers.findIndex((el) => el.uuid === payment?.uuid);
  const amountPayable =
    (parseFloat(payment?.treaty_participant?.treaty_participation_percentage) /
      100) *
    (parseFloat(layer?.limit) - parseFloat(layer?.deductible));

  const payments = treaty?.receivable_payments || [];

  const reinsurerPayments = payments
    ?.filter(
      (el) =>
        el.treaty_participant?.reinsurer?.reinsurer_id ===
          payment?.treaty_participant?.reinsurer?.reinsurer_id &&
        el.uuid === payment?.uuid
    )
    ?.reduce((acc, curr) => acc + parseFloat(curr?.payment_amount), 0);

  const expectedAmtToBePaid =
    amountPayable - reinsurerPayments + parseFloat(payment?.payment_amount);

  const formRef = useRef();

  const [updatePayment] = useMutation(UPDATE_RECEIVABLE_PAYMENT, {
    refetchQueries: [{ query: INSURER, variables: { id: insurer_id } }],
  });

  useEffect(() => {
    if (payment) {
      const obj = JSON.parse(payment.payment_detail);
      //   console.log(obj.date_on_cheque);

      setForm_inputs({
        payment_amount: payment.payment_amount,
        cheque_number: obj.cheque_number,
        bank_name: obj.bank_name,
        beneficiary_bank_name: obj.beneficiary_bank_name,
        offer_payment_comment: payment.offer_payment_comment,
        payment_type: obj.payment_type,
        date_on_cheque: obj.date_on_cheque ? obj.date_on_cheque : "",
      });
    }
  }, [payment]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "payment_amount" &&
      (value > expectedAmtToBePaid || value < 0)
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

  const handleUpdatePayment = (event) => {
    event.preventDefault();
    const data = {
      treaty_id: treaty?.treaty_id,
      receivable_payment_id: payment?.receivable_payment_id,
      receivable_payments: {
        payment_amount: form_inputs.payment_amount,
        treaty_participation_id:
          payment?.treaty_participant?.treaty_participation_id,
        uuid: payment?.uuid,
        payment_detail: JSON.stringify({ ...form_inputs }),
      },
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to update payment?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updatePayment({
        variables: { ...data },
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
          setShow(null);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  return (
    <Modal.Body>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>Edit Payment</h3>
        <Alert variant="warning">
          <div className="row">
            <div className="col-md-12">
              <p>
                Limit : <b>{money(parseFloat(layer?.limit))}</b>
              </p>
            </div>
            <div className="col-md-12">
              <p>
                Deductible : <b>{money(parseFloat(layer?.deductible))}</b>
              </p>
            </div>
            <div className="col-md-12">
              <p>
                All payments should/must amount to <b>{money(amountPayable)}</b>{" "}
                on <b>Layer {layerIndex + 1}</b>
              </p>
              <p>
                Remaining amount to be paid (Amount to be edited is included) :{" "}
                <b>
                  {money(
                    _.isNaN(reinsurerPayments)
                      ? amountPayable
                      : expectedAmtToBePaid
                  )}
                </b>
              </p>
            </div>
          </div>
        </Alert>
      </div>
      <form
        ref={formRef}
        onSubmit={(e) => handleUpdatePayment(e)}
        className={styles.card_body}
      >
        <Alert variant="danger"></Alert>

        <div className="row">
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
          <fieldset className="border mt-3 p-2">
            <legend className={styles.details_title}>Payment From</legend>
            <div className="row">
              {form_inputs.payment_type !== "Bank Transfer" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cheque Nunmber">cheque Number</label>
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
                    {money(expectedAmtToBePaid)}
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
                  value={form_inputs.offer_payment_comment}
                  onChange={handleChange}
                  name="offer_payment_comment"
                  cols="30"
                  rows="5"
                  className="form-control"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="for-group py-2">
          <input
            type="submit"
            disabled={amountError}
            className="form-control btn btn-primary w-md btn-sm"
            value={`Edit Payment`}
          />
        </div>
      </form>
    </Modal.Body>
  );
};

export default EditReceivablePaymentForReinsurer;
