/* eslint-disable no-throw-literal */
import React from "react";
import { Modal } from "react-bootstrap";
import { ErrorMessage, Input } from "../../../components";
import { useForm } from "react-hook-form";
import {
  CREATE_ADJUSTMENT_STATEMENT,
  TREATY,
} from "../../../graphql/queries/treaty";
import { useMutation } from "react-apollo";
import swal from "sweetalert";

const AdjustmentStatementForm = ({
  treaty_np_detail,
  created,
  treaty_id,
  setShowModal,
}) => {
  const { register, errors, handleSubmit } = useForm();
  const [createAdjustment] = useMutation(CREATE_ADJUSTMENT_STATEMENT, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });
  const createAdjustmentStatement = (data) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to create adjustment statement for this treaty ?`,
      buttons: [
        "Cancel",
        {
          text: "Yes, continue",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      createAdjustment({
        variables: {
          ...data,
          treaty_id,
          treaty_np_detail_id: treaty_np_detail?.treaty_np_id,
        },
      })
        .then(({ data: { createOrUpdateAdjustmentStatment: success } }) => {
          if (success) {
            setShowModal(false);
            swal(
              "Hurray!!",
              "Adjustment Statement created successfully",
              "success"
            );
          } else {
            swal(
              "Whhoops!!",
              "Adjustment Statement not created successfully",
              "error"
            );
          }
        })
        .catch((err) => {
          swal(
            "Whhoops!!",
            "Adjustment Statement not created successfully",
            "error"
          );
        });
    });
  };

  return (
    <Modal.Body>
      <form onSubmit={handleSubmit(createAdjustmentStatement)} className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Input
              type="number"
              step="any"
              name="claim_paid"
              defaultValue={treaty_np_detail?.claims_paid}
              ref={register({ required: "Required" })}
              placeholder="Claim Paid"
              label="Claim Paid"
            />
            <ErrorMessage name="claim_paid" errors={errors} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <Input
              type="number"
              step="any"
              name="outstanding_payment"
              defaultValue={treaty_np_detail?.outstanding_payment}
              ref={register({ required: "Required" })}
              placeholder="OutStanding Payment"
              label="Outstanding Payment"
            />
            <ErrorMessage name="outstanding_payment" errors={errors} />
          </div>
        </div>
        <div className="d-flex col-md-12 justify-content-end">
          <button type="submit" className="btn btn-success btn-square btn-sm">
            {!created ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </Modal.Body>
  );
};

export default AdjustmentStatementForm;
