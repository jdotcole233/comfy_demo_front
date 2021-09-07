/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from "react";
import { useMutation } from "react-apollo";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Modal, Input, ErrorMessage, Editor } from ".";
import { Select } from "./Input";
import { TREATY_CLAIMS, UPDATE_TREATY_CLAIM } from "../graphql/queries/treaty";

const EditTreatyClaimForm = ({ data, setShow, treaty }) => {
  const { register, handleSubmit, errors, setValue, clearError } = useForm();
  const [content, setContent] = React.useState("");
  const [limit, setLimit] = React.useState("");

  const [update] = useMutation(UPDATE_TREATY_CLAIM, {
    refetchQueries: [
      {
        query: TREATY_CLAIMS,
      },
    ],
  });

  const layersOptions = useMemo(() => {
    if (treaty && treaty.layer_limit) {
      const _ = JSON.parse(treaty?.layer_limit || "[]");
      return _.map((_, key) => ({
        label: `Layer ${key + 1}`,
        value: key + 1,
      }));
    }
    return [];
  }, [treaty]);

  useEffect(() => {
    if (data) {
      // setContent(data.treaty_comment)
      // alert(data?.treaty_comment)
      setValue("policy_number", data.policy_number);
      setValue("insured_name", data.insured_name);
      setValue("claim_number", data.claim_number);
      // setValue("claim_date", data.claim_date);
      setValue("claim_paid", data.claim_paid);
      setValue("date_of_loss", data.date_of_loss);
      setValue("layer_number", data.layer_number);
      setValue("treaty_claim_id", data.treaty_claim_id);
      setValue("treaty_comment", data.treaty_comment);
      setValue("expected_deductible", data.expected_deductible);
    }
  }, [data]);

  const onSubmitForm = (values) => {
    const variables = {
      id: values.treaty_claim_id,
      claims: {
        policy_number: values.policy_number,
        insured_name: values.insured_name,
        claim_number: values.claim_number,
        // claim_date: values.claim_date,
        claim_paid: values.claim_paid,
        date_of_loss: values.date_of_loss,
        expected_deductible: values.expected_deductible,
        treaty_comment: values.treaty_comment,
        layer_number: values.layer_number,
      },
    };
    swal({
      icon: "warning",
      title: "Update claim ?",
      text: "This action will update the selected claim",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      update({
        variables,
      })
        .then((res) => {
          swal("Success", "Claim updated successfully", "success");
          setShow(false);
        })
        .catch((err) => {
          swal("Error", "Claim could not update successfully", "error");
        });
    });
  };

  const onLayerChange = (evt) => {
    const { value } = evt.target;
    const __ = JSON.parse(treaty?.limit);
    const _limit = __[parseInt(value) - 1];
    setLimit(_limit);
  };

  const onCommentChange = (value) => {
    setValue("treaty_comment", value);
    setContent(value);
    if (value) {
      clearError("treaty_comment");
    }
  };

  return !data ? null : (
    <Fragment>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitForm)} className="row p-2">
          <div className="col-md-6">
            <Input
              label="Policy Number"
              placeholder="Policy Number"
              name="policy_number"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="policy_number" />
          </div>

          <div className="col-md-6">
            <Input
              placeholder="Claim Number"
              label="Claim Number"
              name="claim_number"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="claim_number" />
          </div>

          <div className="col-md-12">
            <Input
              label="Insured"
              placeholder="Insured"
              name="insured_name"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="insured_name" />
          </div>

          <div className="col-md-6">
            <Input
              type="date"
              label="Date of Loss"
              placeholder="Date of Loss"
              name="date_of_loss"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="date_of_loss" />
          </div>

          {/* <div className="col-md-6">
                        <Input type="date" label="Claim Date" placeholder="Claim Date" name="claim_date" ref={register({ required: "Required" })} />
                        <ErrorMessage errors={errors} name="claim_date" />
                    </div> */}

          <div className="col-md-6">
            <Input
              type="number"
              step="any"
              label="Claim Paid"
              placeholder="Claim Paid"
              name="claim_paid"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="claim_paid" />
          </div>

          <div className="col-md-6">
            <Select
              options={layersOptions}
              onChange={onLayerChange}
              label="Layer Number"
              name="layer_number"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="layer_number" />
          </div>
          <div className="col-md-6">
            <Input
              type="number"
              step="any"
              label="Expected Deductible"
              placeholder="Expected Deductible"
              name="expected_deductible"
              ref={register({ required: "Required" })}
            />
            <ErrorMessage errors={errors} name="expected_deductible" />
          </div>
          {limit && (
            <div className="col-md-6">
              <Input readOnly label="Deductible" value={limit?.deductible} />
            </div>
          )}
          {limit && (
            <div className="col-md-6">
              <Input readOnly label="limit" value={limit?.limit} />
            </div>
          )}

          <div className="col-md-12">
            <label htmlFor="">Claim comment</label>
            <Editor
              value={content || data?.treaty_comment}
              onChange={onCommentChange}
            />
            <input
              type="hidden"
              ref={register({ required: false })}
              name="treaty_comment"
            />
            <div className="mt-2">
              <ErrorMessage errors={errors} name="treaty_comment" />
            </div>
          </div>
          <div className="p-2">
            <button className="btn btn-sm btn-square btn-primary">
              Update
            </button>
            <Input
              type="hidden"
              placeholder="Policy Number"
              name="treaty_claim_id"
              ref={register({ required: "Required" })}
            />
          </div>
        </form>
      </Modal.Body>
    </Fragment>
  );
};

export default EditTreatyClaimForm;
