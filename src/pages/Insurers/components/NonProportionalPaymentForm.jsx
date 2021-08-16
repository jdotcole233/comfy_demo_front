/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import { Selector } from "../../../components";
import styles from "../styles/ViewInsurerOffer.module.css";
// import moment from "moment";
import {
  MAKE_NON_PROPORTIONAL_PAYMENT,
  UPDATE_NONPROPORTIONAL_TREATY_PAYMENT,
} from "../../../graphql/queries/treaty";
import { useMutation } from "react-apollo";
import { INSURER } from "../../../graphql/queries";
import { AiOutlineFileProtect } from "react-icons/ai";
import { money } from "../../../utils";
import _ from "lodash";

const getSumOFNPPayments = ({ treaty_np_payments = [], uuid }) => {
  const sum = treaty_np_payments.reduce((acc, curr) => {
    if (curr.uuid === uuid) {
      return acc + parseFloat(curr.treaty_payment_amount);
    }
    return acc;
  }, 0);

  return sum;
};

function NonProportionalPaymentForm({
  treaty,
  payment,
  edit,
  toggleAddpayment,
  insurer,
}) {
  const [selectdQuarter, setSelectdQuarter] = useState(null);
  const [expectedAmtToBePaid, setExpectedAmtToBePaid] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [form_inputs, setForm_inputs] = useState({
    payment_type: "",
    cheque_number: "",
    bank_name: "",
    beneficiary_bank_name: "",
    treaty_payment_comment: "",
    payment_amount: "",
    date_on_cheque: "",
    treaty_account_id: "",
  });

  useEffect(() => {
    if (edit) {
      const paymentDetails = JSON.parse(edit.treaty_payment_details);
      const layer = JSON.parse(treaty?.layer_limit || "[]").find(
        (el) => el.uuid === edit.uuid
      );
      if (layer) {
        const layerIndex = JSON.parse(treaty?.layer_limit || "[]").findIndex(
          (el) => el.uuid === edit.uuid
        );
        setSelectdQuarter({
          label: `Layer ${layerIndex + 1}`,
          value: layer,
        });
        setForm_inputs({
          payment_type: paymentDetails.payment_type,
          cheque_number: paymentDetails.payment_from.cheque_number,
          bank_name: paymentDetails.payment_from.bank_name,
          beneficiary_bank_name: paymentDetails.payment_to,
          treaty_payment_comment: edit.treaty_payment_comment,
          payment_amount: edit.treaty_payment_amount,
          date_on_cheque: paymentDetails.payment_from.date_on_cheque,
          treaty_account_id: paymentDetails.uuid,
        });
      }
    }
  }, [edit]);

  const [makePayment] = useMutation(MAKE_NON_PROPORTIONAL_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const [updatePayment] = useMutation(UPDATE_NONPROPORTIONAL_TREATY_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const percentage = treaty?.treaty_participants?.reduce(
    (acc, cur) => acc + parseFloat(cur.treaty_participation_percentage),
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "payment_amount") {
      if (value > expectedAmtToBePaid / _fig || value < 0) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    }
    setForm_inputs({
      ...form_inputs,
      [name]: value,
    });
  };

  const handleMakePayment = (event) => {
    event.preventDefault();
    const data = {
      payment_amount: form_inputs.payment_amount,
      installment_type: form_inputs.installment_type,
      uuid: form_inputs.treaty_account_id,
      treaty_id: treaty?.treaty_id,
      payment_details: JSON.stringify({
        payment_type: form_inputs.payment_type,
        payment_from: {
          cheque_number: form_inputs.cheque_number
            ? form_inputs.cheque_number
            : "N/A",
          bank_name: form_inputs.bank_name,
          date_on_cheque: form_inputs.date_on_cheque
            ? form_inputs.date_on_cheque
            : "N/A",
        },
        payment_to: form_inputs.beneficiary_bank_name,
      }),
      payment_status:
        form_inputs.payment_amount === 0
          ? "UNPAID"
          : form_inputs.payment_amount < expectedAmtToBePaid
          ? "PARTPAYMENT"
          : "PAID",
      payment_comment: form_inputs.treaty_payment_comment,
    };

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to make payment ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      makePayment({ variables: { data } })
        .then((res) => {
          toggleAddpayment();
          swal("Hurray!!", "Payment effected successfully", "success");
        })
        .catch((err) => {
          swal("Whoops!!", "Payment not effected successfully", "error");
        });
    });
  };

  const handleUpdatePayment = (event) => {
    event.preventDefault();
    const data = {
      payment_id: edit?.treaty_n_p_payment_id,
      payment_amount: form_inputs.payment_amount,
      installment_type: form_inputs.installment_type,
      uuid: form_inputs.treaty_account_id,
      treaty_id: treaty?.treaty_id,
      payment_details: JSON.stringify({
        payment_type: form_inputs.payment_type,
        payment_from: {
          cheque_number: form_inputs.cheque_number
            ? form_inputs.cheque_number
            : "N/A",
          bank_name: form_inputs.bank_name,
          date_on_cheque: form_inputs.date_on_cheque
            ? form_inputs.date_on_cheque
            : "N/A",
        },
        payment_to: form_inputs.beneficiary_bank_name,
      }),
      payment_status:
        form_inputs.payment_amount === 0
          ? "UNPAID"
          : form_inputs.payment_amount < expectedAmtToBePaid
          ? "PARTPAYMENT"
          : "PAID",
      payment_comment: form_inputs.treaty_payment_comment,
    };

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to update payment ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updatePayment({ variables: { data } })
        .then((res) => {
          toggleAddpayment();
          swal("Hurray!!", "Payment updated successfully", "success");
        })
        .catch((err) => {
          swal("Whoops!!", "Payment not updated successfully", "error");
        });
    });
  };

  const limits =
    JSON.parse(treaty?.layer_limit || "[]").map((limit, key) => ({
      label: `Layer ${key + 1}`,
      value: limit,
      key: key + 1,
    })) || [];
  const _fig = parseInt(selectdQuarter?.value?.installment_type);

  useEffect(() => {
    if (selectdQuarter) {
      const uuid = selectdQuarter?.value?.uuid;
      const total_payments_so_far = getSumOFNPPayments({ ...treaty, uuid });
      const __ =
        (percentage / 100) *
          parseFloat(selectdQuarter?.value?.m_and_d_premium) -
        total_payments_so_far;
      setExpectedAmtToBePaid(__);
      setForm_inputs((prev) => ({
        ...prev,
        treaty_account_id: selectdQuarter?.value?.uuid,
      }));
      if (parseFloat(form_inputs.payment_amount) > __) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    }
  }, [selectdQuarter]);

  return (
    <form
      onSubmit={(e) => {
        if (edit) {
          handleUpdatePayment(e);
        } else {
          handleMakePayment(e);
        }
      }}
      className={styles.card_body}
    >
      <div className="form-group">
        <label htmlFor="">Layers</label>
        <Selector
          isDisabled={edit}
          value={selectdQuarter}
          options={limits}
          onChange={(value) => setSelectdQuarter(value)}
        />
      </div>
      {selectdQuarter && (
        <LayerBreakDown
          layer={{ ...selectdQuarter?.value, ...selectdQuarter }}
          expectedAmtToPaid={expectedAmtToBePaid}
        />
      )}

      {/* FORM FOR PAYMENT */}
      {selectdQuarter && (
        <Fragment>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="paymentype">Installment</label>
              <select
                name="installment_type"
                value={form_inputs.installment_type}
                onChange={handleChange}
                id=""
                className="form-control"
                required
              >
                <option value="">Choose a type</option>
                {_.fill(
                  Array(parseInt(selectdQuarter?.value?.installment_type)),
                  2
                ).map((__, key) => (
                  <option value={key + 1}>{key + 1}</option>
                ))}
              </select>
            </div>
          </div>

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

          {form_inputs.payment_type !== "Cheque" && (
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
                      {expectedAmtToBePaid}
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
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </fieldset>
        </Fragment>
      )}
      {selectdQuarter && (
        <div className="for-group py-2">
          <input
            type="submit"
            disabled={amountError}
            className="form-control btn btn-primary w-md btn-sm"
            value={`${!edit ? "Make" : "Edit"} Payment`}
          />
        </div>
      )}
    </form>
  );
}

export default NonProportionalPaymentForm;

const Text = styled.p`
  line-height: 0px;
  font-weight: bolder;
  color: #a83236;
`;

const LayerBreakDown = ({ layer, expectedAmtToPaid }) => {
  return (
    <div className="alert mx-1 row align-items-center container alert-warning">
      <div className="col-md-2">
        <AiOutlineFileProtect size={60} />
      </div>
      <div className="col-md-10">
        <table className="table table-borderless table-condensed ">
          <tr>
            <td>
              <Text>Layer Number </Text>
            </td>
            <td>
              <Text>{money(parseFloat(layer?.key))}</Text>
            </td>
          </tr>

          <tr>
            <td>
              <Text>Payment Status</Text>
            </td>
            <td>
              <Text>{layer?.outgoing_payment_staus ?? "UNPAID"}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text>Expected amount to pay </Text>
            </td>
            <td>
              <Text>{money(expectedAmtToPaid)}</Text>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
