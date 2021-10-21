/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Alert } from "react-bootstrap";
import swal from "sweetalert";
import { Selector } from "../../../components";
import styles from "../styles/ViewInsurerOffer.module.css";
import { MAKE_RECEIVABLE_PAYMENT } from "../../../graphql/queries/treaty";
import { useMutation } from "@apollo/client";
import { INSURER } from "../../../graphql/queries";
import NonPorportionalTreatyReceiveablePaymentForm from "./NonPorportionalTreatyReceiveablePaymentForm";
import { money } from "../../../utils";
import _ from "lodash";

function AddReceiveablePaymentForm({
  treaty,
  claim,
  edit,
  toggleAddpayment,
  insurer,
  layer_number,
}) {
  const [selectdQuarter, setSelectdQuarter] = useState(null);
  const [selectedReinsurer, setSelectedReinsurer] = useState([]);
  const [form_inputs, setForm_inputs] = useState([]);
  const [treaty_account_id, setTreaty_account_id] = useState(undefined);

  useEffect(() => {
    if (layer_number) {
      console.log("claim", layer_number);
      const layer = JSON.parse(treaty?.layer_limit || "[]").find(
        (_, id) => id + 1 === layer_number
      );
      if (layer) {
        const layerIndex = JSON.parse(treaty?.layer_limit || "[]").findIndex(
          (_, id) => id + 1 === layer_number
        );
        console.log("treaty", layer);
        setSelectdQuarter({
          label: `Layer ${layerIndex + 1}`,
          value: layer,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      const paymentDetails = JSON.parse(edit.treaty_payment_details);

      const layer = JSON.parse(treaty?.layer_limit || "[]").find(
        (el) => el.uuid === edit.uuid
      );
      console.log(layer);
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

  const [makePayment] = useMutation(MAKE_RECEIVABLE_PAYMENT, {
    refetchQueries: [
      { query: INSURER, variables: { id: insurer?.insurer_id } },
    ],
  });

  const handleMakePayment = (event) => {
    event.preventDefault();
    const data = {
      treaty_id: treaty?.treaty_id,
      receivable_payments: form_inputs
        .filter((el) => el != null)
        .map((el) => ({
          ...el,
          treaty_claimstreaty_claim_id: claim?.treaty_claim_id,
        })),
    };

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to make payment ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      makePayment({ variables: { ...data } })
        .then((res) => {
          setSelectedReinsurer([]);
          setSelectdQuarter(null);
          setForm_inputs([]);
          toggleAddpayment();
          swal("Hurray!!", "Payment effected successfully", "success");
        })
        .catch((err) => {
          swal("Whoops!!", "Payment not effected successfully", "error");
        });
    });
  };

  const handleUpdateFormsState = (index, data) => {
    const __inputs = form_inputs;
    __inputs[index] = data;
    setForm_inputs([...__inputs]);
  };

  const limits =
    JSON.parse(treaty?.layer_limit || "[]").map((limit, key) => ({
      label: `Layer ${key + 1}`,
      value: limit,
      uuid: limit?.uuid,
    })) || [];

  const reinsurers =
    treaty?.treaty_participants?.map((reinsurer) => ({
      label: reinsurer?.reinsurer?.re_company_name,
      value: reinsurer,
      uuid: _.last(reinsurer?.treaty_participant_deductions)?.uuid,
    })) || [];

  const _fig = parseInt(selectdQuarter?.value?.installment_type);
  const months =
    _fig === 1
      ? [1]
      : _fig === 2
      ? [1, 7]
      : _fig === 3
      ? [1, 5, 9]
      : [1, 4, 7, 10];

  useEffect(() => {
    if (selectdQuarter) {
      const uuid = selectdQuarter?.value?.uuid;
      setSelectedReinsurer([]);
      setTreaty_account_id(uuid);
    }
  }, [selectdQuarter]);

  const actualPayments = _.groupBy(claim?.receivable_payments, "uuid");
  const _reinsurers = _.groupBy(reinsurers, "uuid");
  // console.log("_reinsurers", _reinsurers);

  const _payments = actualPayments[`${selectdQuarter?.uuid}`] || [];

  const totalAmount =
    parseFloat(claim?.claim_paid) - parseFloat(claim?.expected_deductible);

  const remainingAmountTobePaid =
    totalAmount > parseFloat(selectdQuarter?.value?.limit)
      ? parseFloat(selectdQuarter?.value?.limit) -
        -_payments?.reduce(
          (acc, curr) => acc + parseFloat(curr?.payment_amount),
          0
        )
      : totalAmount -
        _payments?.reduce(
          (acc, curr) => acc + parseFloat(curr?.payment_amount),
          0
        );

  return (
    <form onSubmit={(e) => handleMakePayment(e)} className={styles.card_body}>
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
        <Fragment>
          <Alert variant="warning">
            <div className="row">
              <div className="col-md-12">
                <p>
                  Limit :{" "}
                  <b>{money(parseFloat(selectdQuarter?.value?.limit))}</b>
                </p>
              </div>
              <div className="col-md-12">
                <p>
                  Claim paid : <b>{claim?.claim_paid}</b>
                </p>
              </div>
              <div className="col-md-12">
                <p>
                  Deductible :{" "}
                  <b>{money(parseFloat(selectdQuarter?.value?.deductible))}</b>
                </p>
              </div>
              <div className="col-md-12">
                <p>
                  Currency : <b>{treaty?.currency}</b>
                </p>
              </div>

              <div className="col-md-12">
                <p>
                  All payments should/must not exceed an amount of{" "}
                  <b>{money(parseFloat(selectdQuarter?.value?.limit))}</b> for
                  each claim
                </p>
                <p>
                  Remaining amount to be paid :{" "}
                  <b>
                    {money(
                      _.isNaN(remainingAmountTobePaid)
                        ? remainingAmountTobePaid
                        : remainingAmountTobePaid
                    )}
                  </b>
                </p>
              </div>
            </div>
          </Alert>

          <div className="form-group">
            <label htmlFor="">Reinsurers</label>
            <Selector
              isDisabled={edit}
              value={selectedReinsurer}
              options={_reinsurers[`${selectdQuarter?.value?.uuid}`]}
              isMulti
              onChange={(value) => setSelectedReinsurer(value ? value : [])}
            />
          </div>
        </Fragment>
      )}

      {/* FORM FOR PAYMENT */}
      {selectdQuarter &&
        selectedReinsurer?.map(({ value }, reinsurerId) => (
          <NonPorportionalTreatyReceiveablePaymentForm
            months={months}
            _fig={_fig}
            reinsurer={value}
            treaty={treaty}
            updateAll={(data) => handleUpdateFormsState(reinsurerId, data)}
            treaty_account_id={treaty_account_id}
            expectedAmtToBePaid={totalAmount}
            remaining={remainingAmountTobePaid}
          />
        ))}
      {selectdQuarter && form_inputs.length ? (
        <div className="for-group py-2">
          <input
            type="submit"
            // disabled={amountError}
            className="form-control btn btn-primary w-md btn-sm"
            value={`${!edit ? "Make" : "Edit"} Payment`}
          />
        </div>
      ) : null}
    </form>
  );
}

export default AddReceiveablePaymentForm;
