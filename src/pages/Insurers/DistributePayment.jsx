/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/ViewInsurerOffer.module.css";
import swal from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DISTRIBUTE_PAYMENT } from "../../graphql/mutattions";
import { INSURER, GET_ISNURER_DEDUCTIONS } from "../../graphql/queries";
import { Alert } from "react-bootstrap";
import DistributePaymentForm from "./components/DistributePaymentForm";
import { buildPayload } from "./dummy";
import { Loader } from "../../components";

export default function DistributePayment({
  data,
  toggle,
  insurer_id = 1,
  showFlag,
}) {
  const [forms, setForms] = useState([]);
  const [errors, setErrors] = useState([]);

  const getPaymentId = () => {
    if (data && data.offer_payment.length) {
      return data?.offer_payment[0]?.offer_payment_id;
    }
    return 0;
  };
  const { data: deductions, loading } = useQuery(GET_ISNURER_DEDUCTIONS, {
    variables: {
      id: insurer_id,
      offer_id: data?.offer_id || "1",
      payment_id: getPaymentId(),
    },
  });
  const [distribute] = useMutation(DISTRIBUTE_PAYMENT, {
    refetchQueries: [{ query: INSURER, variables: { id: insurer_id } }],
  });

  const reinsurers = useMemo(() => {
    if (deductions) {
      return [...JSON.parse(deductions.getOfferparticipantDeductions)];
    }
    return [];
  }, [deductions]);

  useEffect(() => {
    if (data) {
      const newForms = data.offer_participant.map((part) => {
        const row = {
          offer_participant_id: part.offer_participant_payment.length
            ? part.offer_participant_payment[
                part.offer_participant_payment.length - 1
              ].offer_participant_payment_id
            : "",
          payment_type: "",
          bank_name: "",
          b_bank_name: "",
          cheque_number: "",
          comment: "",
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

  const handleDistibution = () => {
    const offer_participants = buildPayload(forms);
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to distribute payments ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      distribute({
        variables: {
          data: {
            offer_id: data?.offer_id,
            offer_participants,
          },
        },
      })
        .then((res) => {
          swal("Sucess", "Payment distributed Successfully", "success");
          setForms([]);
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

  if (showFlag) {
    return (
      <div>
        <Alert variant="danger">
          <strong>
            No current payment identified on offer with policy number:{" "}
            {data?.offer_detail.policy_number}
          </strong>
          <p>
            <em>
              Payment to be made on {data?.offer_participant.length} reinsurers
              will be made active once payment is found.
            </em>
          </p>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-4">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Distribute Payments</h2>
      </div>
      <div className={styles.card_body}>
        <>
          {forms.map((participant, key) => {
            return !data?.offer_participant[key]
              .offer_participant_percentage ? null : (
              <DistributePaymentForm
                key={key}
                index={key}
                data={data}
                reinsurers={reinsurers}
                participant={participant}
                errors={errors}
                handleChange={handleChange}
              />
            );
          })}
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              onClick={handleDistibution}
              className="btn btn-sm btn-primary w-md"
            >
              Distribute Payments
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
