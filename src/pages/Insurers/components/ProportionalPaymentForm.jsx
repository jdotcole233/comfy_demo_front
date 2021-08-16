/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
// import { sum } from 'lodash';
import React, { useState, useEffect, Fragment } from "react";
import { useMutation } from "react-apollo";
import swal from "sweetalert";
import { Selector } from "../../../components";
import {
  MAKE_PROPORTIONAL_PAYMENT,
  UPDATE_PROPORTIONAL_TREATY_PAYMENT,
} from "../../../graphql/queries/treaty";
import { getFlexibleName } from "./Note";
import styles from "../styles/ViewInsurerOffer.module.css";
import { INSURER } from "../../../graphql/queries";
import styled from "styled-components";
import { money } from "../../../utils";
import { AiOutlineFileProtect } from "react-icons/ai";
import _ from "lodash";
import { mergeTwoArrays } from "../../TreatyPrograms/TreatyDebitNotes";
import { cashBalance } from "../../TreatyPrograms/Previews/DebitNote";

const expectedAmount = ({
  treaty_account_deduction = [],
  claim_settled,
  layer_limit,
}) => {
  const surpluses = mergeTwoArrays(
    JSON.parse(layer_limit ?? "[]"),
    treaty_account_deduction
  );

  console.log(surpluses);

  const value = surpluses.reduce(
    (acc, curr) =>
      acc +
      cashBalance(curr?.gross_premium, curr?.commission_amount, claim_settled),
    0
  );

  console.log(value);

  return value;
};

function ProportionalPaymentForm({
  treaty,
  edit,
  insurer,
  toggleAddpayment,
  payments = [],
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
      console.log(edit);
      const paymentDetails = JSON.parse(edit.treaty_payment_details);
      const quarter = treaty?.treaty_accounts?.find(
        (el) => el.treaty_account_id === edit.treaty_accountstreaty_account_id
      );
      if (quarter) {
        setSelectdQuarter({
          label: getFlexibleName(quarter?.account_periods),
          value: {
            id: quarter?.treaty_account_id,
            expectedAmountToPay: expectedAmount({ ...treaty, ...quarter }),
            ...quarter,
            outgoing_payment_staus: _.first(
              JSON.parse(treaty?.layer_limit ?? "[]")
            ).outgoing_payment_staus,
            surpluses: JSON.parse(treaty?.layer_limit ?? "[]")
              .map((_, key) => `${key + 1}`)
              .join(","),
          },
        });
        setForm_inputs({
          payment_type: paymentDetails.payment_type,
          cheque_number: paymentDetails.payment_from.cheque_number,
          bank_name: paymentDetails.payment_from.bank_name,
          beneficiary_bank_name: paymentDetails.payment_to,
          treaty_payment_comment: edit.treaty_payment_comment || "",
          payment_amount: edit.treaty_payment_amount,
          date_on_cheque: paymentDetails.payment_from.date_on_cheque,
          treaty_account_id: paymentDetails.uuid,
        });
      }
    }
  }, [edit]);

  const [makePayment] = useMutation(MAKE_PROPORTIONAL_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const [updatePayment] = useMutation(UPDATE_PROPORTIONAL_TREATY_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const quarters =
    treaty?.treaty_accounts?.map((account, key) => ({
      label: getFlexibleName(account?.account_periods),
      value: {
        id: account?.treaty_account_id,
        // uuid: account?.
        expectedAmountToPay: expectedAmount({ ...treaty, ...account }),
        ...account,
        outgoing_payment_staus: _.first(JSON.parse(treaty?.layer_limit ?? "[]"))
          .outgoing_payment_staus,
        surpluses: [
          ...account?.treaty_account_deduction?.map((_, key) => key + 1),
        ].join(","),
      },
      key: key + 1,
    })) || [];

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

  useEffect(() => {
    if (selectdQuarter) {
      const sumOfPastPayments = payments.reduce(
        (prev, curr) => prev + parseFloat(curr.treaty_payment_amount),
        0
      );
      console.log(
        "Sum of payments",
        selectdQuarter?.value?.expectedAmountToPay
      );
      const _expected =
        parseFloat(selectdQuarter?.value?.expectedAmountToPay) -
        sumOfPastPayments;
      setExpectedAmtToBePaid(_expected);
      setForm_inputs((prev) => ({
        ...prev,
        treaty_account_id: selectdQuarter.value.id,
      }));
      if (
        parseFloat(form_inputs.payment_amount) >
        parseFloat(selectdQuarter?.value?.expectedAmountToPay)
      ) {
        setAmountError(true);
      } else {
        setAmountError(false);
      }
    }
  }, [selectdQuarter]);

  const handleMakePayment = (event) => {
    event.preventDefault();
    const input = {
      payment_amount: form_inputs.payment_amount,
      treaty_account_id: form_inputs.treaty_account_id,
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
    }).then((re) => {
      if (!re) throw null;
      makePayment({ variables: { input } })
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
      payment_id: edit?.treaty_p_payment_id,
      payment_amount: form_inputs.payment_amount,
      treaty_account_id: form_inputs.treaty_account_id,
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
    }).then((re) => {
      if (!re) throw null;
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

  return (
    <form
      onSubmit={(e) => {
        if (edit) {
          handleUpdatePayment(e);
          // alert("Hello")
        } else {
          handleMakePayment(e);
        }
      }}
      className={styles.card_body}
    >
      <div className="form-group">
        <label htmlFor="">Quarter</label>
        <Selector
          isDisabled={edit}
          value={selectdQuarter}
          options={quarters}
          onChange={(value) => setSelectdQuarter(value)}
        />
      </div>
      {selectdQuarter && (
        <SurplusBreakDown
          surplus={{ ...selectdQuarter?.value, ...selectdQuarter }}
          expectedAmtToPaid={expectedAmtToBePaid}
        />
      )}

      {/* FORM FOR PAYMENT */}
      {selectdQuarter && (
        <Fragment>
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

export default ProportionalPaymentForm;

const Text = styled.p`
  line-height: 0px;
  font-weight: bolder;
  color: #a83236;
`;

const SurplusBreakDown = ({ surplus, expectedAmtToPaid }) => {
  return (
    <div className="alert mx-1 row  justify-content-center container alert-warning">
      <div className="col-md-2">
        <AiOutlineFileProtect size={60} />
      </div>
      <div className="col-md-10">
        <table className="table table-borderless table-condensed ">
          <tbody>
            <tr>
              <td>
                <Text>Surplus(es) involved </Text>
              </td>
              <td>
                <Text>{surplus?.surpluses}</Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text>Payment Status</Text>
              </td>
              <td>
                <Text>{surplus?.outgoing_payment_staus ?? "N/A"}</Text>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};
