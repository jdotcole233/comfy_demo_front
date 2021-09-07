/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import styles from "./styles/ViewInsurerOffer.module.css";
import swal from "sweetalert";
import { useMutation } from "react-apollo";
import { INSURER } from "../../graphql/queries";
import { Alert } from "react-bootstrap";
import { DISTRIBUTE_PAYMENT_FOR_TREATY } from "../../graphql/queries/treaty";
import _ from "lodash";

const DistributeTreatyPayment = ({
  data,
  setShow,
  insurer_id = 1,
  showFlag,
}) => {
  const [forms, setForms] = useState([]);
  const [errors, setErrors] = useState([]);

  const [distribute] = useMutation(DISTRIBUTE_PAYMENT_FOR_TREATY, {
    refetchQueries: [{ query: INSURER, variables: { id: insurer_id } }],
  });

  const proportionalPayments = _.first(data?.treaty_p_payments);
  const nonProportionalPayments = _.first(data?.treaty_np_payments);
  // console.log("NP PAYMENTS", nonProportionalPayments);

  const isProp = data?.treaty_program?.treaty_type === "PROPORTIONAL";
  const payment_id = !isProp
    ? nonProportionalPayments?.treaty_n_p_payment_id
    : proportionalPayments?.treaty_p_payment_id;

  const list = isProp ? proportionalPayments : nonProportionalPayments;
  const layerIndex = JSON.parse(data?.layer_limit ?? "[]").findIndex((el) => {
    console.log(el);
    return el.uuid === list?.uuid;
  });

  const surpulus_uuid = JSON.parse(data?.layer_limit ?? "[]").find((el) => {
    console.log(el);
    return el.surpulus_uuid === list?.surpulus_uuid;
  })?.surplus_uuid;

  console.log("layerIndex", proportionalPayments);
  console.log("payment_id", payment_id);

  useEffect(() => {
    if (data) {
      const newForms = data.treaty_participants
        .filter(
          (el) =>
            el.layer_number === layerIndex + 1 ||
            el.surpulus_uuid === surpulus_uuid
        )
        .map((part) => {
          const share = _.pick(
            list?.treaty_participant_payment?.find(
              (el) =>
                el.treaty_participationstreaty_participation_id ===
                  part.treaty_participation_id &&
                (el.treaty_p_paymentstreaty_p_payment_id === payment_id ||
                  el.treaty_np_paymentstreaty_np_payment_id === payment_id)
            ),
            [
              "brokerage_paid",
              "commission_paid",
              "nic_levy_paid",
              "withholding_tax_paid",
              "participant_payment_amount",
            ]
          );
          const row = {
            ...part,
            treaty_participation_id: part.treaty_participant_payments.length
              ? part.treaty_participant_payments[
                  part.treaty_participant_payments.length - 1
                ].treaty_participant_payment_id
              : "",

            payment_type: "",
            bank_name: "",
            b_bank_name: "",
            cheque_number: "",
            comment: "",
            ...share,
          };
          return row;
        });
      const form_errors = newForms.map((value) => ({
        payment_type: { type: false, message: "Please select a payment type" },
        bank_name: { type: false, message: "Please select bank name" },
        b_bank_name: {
          type: false,
          message: "Please provide beneficiary bank name",
        },
        cheque_number: { type: false, message: "Please provide cheque number" },
        comment: { type: false, message: "Please provide comment" },
      }));
      setForms(newForms);
      setErrors(form_errors);
    }
  }, [data]);

  const handleChange = (key, event) => {
    const { name, value } = event.target;
    const formData = forms;

    formData[key][name] = value;
    setForms([...formData]);
  };

  const buildPayload = (data) => {
    const details = data.map((el) => ({
      participant_payment_id: _.last(el.treaty_participant_payments)
        ?.treaty_participants_payment_id,
      payment_details: JSON.stringify({
        payment_type: el.payment_type,
        payment_from: {
          cheque_number: el.cheque_number ? el.cheque_number : "N/A",
          bank_name: el.bank_name,
        },
        payment_to: el.b_bank_name ? el.b_bank_name : "N/A",
      }),
      payment_comment: el.comment || "-",
    }));

    return details;
  };

  const handleDistibution = (event) => {
    const data_ = buildPayload(forms);
    const variables = {
      id: data?.treaty_id,
      data: data_,
    };
    // console.log(data_);
    // return;
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to distribute payments ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      distribute({
        variables,
      })
        .then((res) => {
          swal("Sucess", "Payment distributed Successfully", "success");
          setForms([]);
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

  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Distribute Payments</h2>
        {/* {JSON.stringify(data)} */}
      </div>
      <div className={styles.card_body}>
        {!showFlag ? (
          <>
            {forms.length
              ? forms.map((participant, key) => {
                  return (
                    <fieldset className="border p-2 mb-2" key={key}>
                      <legend className={styles.details_title}>
                        {participant?.reinsurer?.re_company_name}
                      </legend>
                      <div className="row">
                        <div className="col-md-12">
                          {participant?.treaty_participant_payments?.length ? (
                            <table className="table">
                              <tbody>
                                <tr>
                                  <th>Participating %</th>
                                  <td>
                                    {
                                      participant?.treaty_participation_percentage
                                    }
                                  </td>
                                  <th>Withholding Tax</th>
                                  <td>
                                    {participant?.withholding_tax_paid?.toFixed(
                                      2
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th>NIC levy</th>
                                  <td>
                                    {participant?.nic_levy_paid?.toFixed(2)}
                                  </td>
                                  <th>Brokerage</th>
                                  <td>
                                    {participant?.brokerage_paid?.toFixed(2)}
                                  </td>
                                </tr>
                                <tr>
                                  <th></th>
                                  <td>{}</td>
                                  <th>Amount</th>
                                  <td>
                                    {participant?.participant_payment_amount?.toFixed(
                                      2
                                    )}
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
                          onChange={(e) => handleChange(key, e)}
                          className="form-control"
                        >
                          <option value="">Select payment type</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                        </select>
                        {errors[key].payment_type.type && (
                          <p>{errors[key].payment_type.message}</p>
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
                                onChange={(e) => handleChange(key, e)}
                                name="bank_name"
                              />
                            </div>
                          </div>
                        )}
                        {participant.payment_type === "Bank Transfer" && (
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="bank name">
                                Beneficiary Bank Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={participant.b_bank_name}
                                name="b_bank_name"
                                onChange={(e) => handleChange(key, e)}
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
                                onChange={(e) => handleChange(key, e)}
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
                          onChange={(e) => handleChange(key, e)}
                          name="comment"
                          id=""
                          cols="30"
                          rows="3"
                        ></textarea>
                      </div>
                      {/* End of comment section */}
                    </fieldset>
                  );
                })
              : null}
            {forms.length ? (
              <div className="form-group d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleDistibution}
                  className="btn btn-sm btn-primary w-md"
                >
                  Distribute Payments
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <Alert variant="danger">
            {/* <strong>No current payment identified on offer with policy number: {data?.offer_detail.policy_number}</strong> */}
            <p>
              <em>
                Payment to be made on {data?.treaty_participants.length}{" "}
                reinsurers will be made active once payment is found.
              </em>
            </p>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DistributeTreatyPayment;
