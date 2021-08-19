/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { Input, ErrorMessage, Editor } from "../../../components";
import { Select } from "../../../components/Input";
import { REINSURER } from "../../../graphql/queries";
import { UPDATE_REINSURER_TREATY_PAYMENT } from "../../../graphql/queries/treaty";

const types = [
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Cheque", value: "Cheque" },
];

const TreatyEditPayment = ({ payment, treaty, setShow }) => {
  const id = useSelector((state) => state.reinsurer.reinsurer_id);
  const [content, setContent] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const { register, errors, handleSubmit, setValue, clearError } = useForm();

  const [update] = useMutation(UPDATE_REINSURER_TREATY_PAYMENT, {
    refetchQueries: [
      {
        query: REINSURER,
        variables: { id },
      },
    ],
  });

  useEffect(() => {
    if (payment) {
      const paymentDetails = JSON.parse(
        payment?.participant_payment_details || "{}"
      );
      setValue("payment_amount", paymentDetails.participant_payment_amount);
      setValue("b_bank_name", paymentDetails.payment_to);
      setValue("bank_name", paymentDetails?.payment_from?.bank_name);
      setValue("payment_amount", payment?.participant_payment_amount);
      setValue("cheque_number", paymentDetails?.payment_from?.cheque_number);
      setValue("payment_type", paymentDetails?.payment_type);
      setValue("treaty_payment_comment", payment.participant_payment_comment);
      setContent(payment.participant_payment_comment);
      setPaymentType(paymentDetails?.payment_type);
    }
  }, [payment, setValue]);

  const onSubmit = (values) => {
    const data = {
      payment_id:
        payment?.treaty_p_paymentstreaty_p_payment_id ||
        payment.treaty_np_paymentstreaty_np_payment_id,
      payment_amount: values.payment_amount,
      // uuid: values.treaty_account_id,
      treaty_id: treaty?.treaty_id,
      payment_details: JSON.stringify({
        payment_type: values.payment_type,
        payment_from: {
          cheque_number: values.cheque_number ? values.cheque_number : "N/A",
          bank_name: values.bank_name,
          date_on_cheque: values.date_on_cheque ? values.date_on_cheque : "N/A",
        },
        payment_to: values.beneficiary_bank_name,
      }),
      payment_status: payment?.participant_payment_status,
      payment_comment: values.treaty_payment_comment,
    };

    swal({
      icon: "warning",
      title: "Update payment ?",
      text: "This action would update the selected payment",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      update({
        variables: {
          treaty_participants_payment_id:
            payment?.treaty_participants_payment_id,
          payment: data,
        },
      })
        .then((res) => {
          swal("Success", "Payment updated successfully", "success");
          setShow(false);
        })
        .catch((err) => {
          swal("Error", "Payment could not update successfully", "error");
        });
    });
  };

  const onCommentChange = (value) => {
    setValue("treaty_payment_comment", value);
    // console.log(value)
    setContent(value);
    if (value) {
      clearError("treaty_payment_comment");
    }
  };

  return (
    <Modal.Body>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-md-6">
          {/* {payment?.treaty_participants_payment_id} */}
          <Select
            disabled
            options={types}
            ref={register({ required: "Required" })}
            name="payment_type"
            label="Payment Type"
          />
          <ErrorMessage name="payment_type" errors={errors} />
        </div>
        <div className="col-md-6">
          <Input
            ref={register({ required: "Required" })}
            name="bank_name"
            label="Bank Name"
            placeholder="Bank Name"
          />
          <ErrorMessage name="bank_name" errors={errors} />
        </div>
        {paymentType === "Cheque" && (
          <div className="col-md-12">
            <Input
              ref={register({ required: "Required" })}
              name="cheque_number"
              label="Cheque Number"
              placeholder="Beneficiary Bank Name"
            />
            <ErrorMessage name="cheque_number" errors={errors} />
          </div>
        )}
        <div className="col-md-6">
          <Input
            ref={register({ required: "Required" })}
            name="b_bank_name"
            label="Beneficiary Bank Name"
            placeholder="Beneficiary Bank Name"
          />
          <ErrorMessage name="b_bank_name" errors={errors} />
        </div>
        <div className="col-md-6">
          <Input
            ref={register({ required: "Required" })}
            name="payment_amount"
            label="Payment Amount"
            placeholder="Bank Name"
            readOnly
          />
          <ErrorMessage name="payment_amount" errors={errors} />
        </div>
        <div className="col-md-12">
          <Editor value={content} onChange={onCommentChange} />
          <input
            type="hidden"
            ref={register({ required: false })}
            name="treaty_payment_comment"
          />
          <div className="mt-2">
            <ErrorMessage errors={errors} name="treaty_payment_comment" />
          </div>
        </div>
        <div className="col-md-12">
          <button className="btn btn-primary btn-block">update</button>
        </div>
      </form>
    </Modal.Body>
  );
};

export default TreatyEditPayment;
