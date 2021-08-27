/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */

import React, { Fragment, useCallback, useMemo, useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import {
  Input,
  ErrorMessage,
  Modal,
  Datatable,
  Editor,
} from "../../components";
import { Select } from "../../components/Input";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { makeClaimPreview } from "./columns";
import { useMutation } from "react-apollo";
import {
  MANUAL_CREATE_CLAIM,
  TREATY_CLAIMS,
} from "../../graphql/queries/treaty";
import { useTreatyClaimsProps } from "./Providers/TreatyClaimsProvider";
import useLocalStorage from "hooks";

const MakeClaimForm = ({ details, setShow }) => {
  /**
   * treaty_id
   * array of treatyclaim data
   *  @params string policy_number
   *  @params string claim_number
   *  @params string! insured_name
   *  @params Date date_of_loss
   *  @params Date claim_date
   *  @params Float claim_paid
   *  @params Int layer_number
   *
   *
   */

  // const { claims: arr } = useTreatyClaimsProps();
  const [claims, setClaims] = useLocalStorage(
    `treaty-${details?.treaty_id}`,
    []
  );

  const [editable, setEditable] = useState(false);
  const [showList, setShowList] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { register, errors, handleSubmit, reset, setValue, clearError } =
    useForm();
  const [limit, setLimit] = useState(null);
  const [content, setContent] = useState("");

  const onLayerChange = (evt) => {
    const { value } = evt.target;
    const __ = JSON.parse(details?.limit);
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

  const [create, { loading }] = useMutation(MANUAL_CREATE_CLAIM, {
    refetchQueries: [{ query: TREATY_CLAIMS }],
  });

  const layersOptions = useMemo(() => {
    if (details && details.layer_limit) {
      const _ = JSON.parse(details?.layer_limit || "[]");
      return _.map((el, key) => ({
        label: `Layer ${key + 1}`,
        value: key + 1,
      }));
    }
    return [];
  }, [details]);

  const toggle = () => {
    setShow((prev) => !prev);
    setShowList((prev) => !prev);
  };

  const cancelAllProcess = () => {
    swal({
      icon: "warning",
      title: "Abort this process ?",
      text: "This action would clear all entered data",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) throw null;
      setClaims([]);
      setShowList(false);
      setShow(false);
    });
  };

  const onSubmitForm = (values) => {
    if (!editable) {
      const newClaims = [...claims, values];
      setClaims(newClaims);
      swal({
        icon: "warning",
        title: "Add More Claims ?",
        text: "This action would allow you add additional Claim data",
        buttons: ["No", { text: "Yes" }],
      }).then((input) => {
        if (!input) {
          toggle();
        }
        reset();
        setContent("");
      });
    } else {
      const __dataIncoming = claims;
      __dataIncoming[currentIndex] = values;
      setClaims(__dataIncoming);
      setEditable(false);
      toggle();
      reset();
      setContent("");
    }
  };

  const onClickEditButton = useCallback((values, index) => {
    //set editable true and index
    setEditable(true);
    setCurrentIndex(index);
    // set values to hook form
    setValue("policy_number", values.policy_number);
    setValue("claim_number", values.claim_number);
    setValue("insured_name", values.insured_name);
    setValue("date_of_loss", values.date_of_loss);
    // setValue("claim_date", values.claim_date)
    setValue("claim_paid", values.claim_paid);
    setValue("layer_number", values.layer_number);
    setValue("treaty_comment", values.treaty_comment);
    setValue("expected_deductible", values.expected_deductible);
    setContent(values.treaty_comment);
    // toggle the modal and drawer
    toggle();
  });

  const onClickRemoveButton = useCallback((index) => {
    swal({
      icon: "warning",
      title: "Remove claim ?",
      text: "This action would remove this claim from the list",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) throw null;
      const __dataIncoming = claims.filter((_, key) => key !== index);
      setClaims(__dataIncoming);
    });
  }, []);

  const previewData = useMemo(() => {
    if (claims && claims.length > 0) {
      return claims?.map((el, key) => ({
        ...el,
        actions: (
          <>
            <button
              onClick={() => onClickEditButton(el, key)}
              className="btn btn-square btn-sm btn-primary btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => onClickRemoveButton(key)}
              className="btn btn-link text-danger"
            >
              Remove
            </button>
          </>
        ),
      }));
    }
    return [];
  }, [claims, onClickEditButton, onClickRemoveButton]);

  const createClaims = () => {
    swal({
      icon: "warning",
      title: "Proceed to create Claims ?",
      text: "This action would process this information and added as claims(s) to this treaty",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      create({
        variables: {
          id: details?.treaty_id,
          claims,
        },
      })
        .then((res) => {
          swal("Success", "Claim(s) made successfully", "success");
          reset();
          setClaims([]);
          setShow(false);
          setShowList(false);
        })
        .catch((err) => {
          swal("Whoops!!", "Claim(s) not made successfully", "error");
        });
    });
  };

  return (
    <Fragment>
      {claims.length > 0 && (
        <div
          style={{
            fontSize: 20,
            top: 35,
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
          className="bg-danger align-items-center justify-content-center d-flex p-2 text-white"
        >
          {claims.length}
        </div>
      )}
      <fieldset className="border mt-2 row mb-2">
        <legend className="w-auto font-size-16">Insurer Details</legend>
        <table className="table">
          <tbody>
            <tr>
              <td>Reinsured</td>
              <td>{details?.insurer?.insurer_company_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{details?.insurer?.insurer_company_email}</td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <div className="alert d-flex alert-danger row">
        <div className="d-flex flex-row">
          <div className="d-flex align-items-center mr-2 justify-content-center">
            <BiErrorAlt size={60} />
          </div>
          <p>
            Manual claim input allows you to input as many claim records as you
            want. But you are advised to use the automated input to expedite
            input operation and reduce human error for records greater than 10
          </p>
        </div>
      </div>

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

        <div className="col-md-6">
          <Input
            label="Insured"
            placeholder="Insured"
            name="insured_name"
            ref={register({ required: "Required" })}
          />
          <ErrorMessage errors={errors} name="insured_name" />
        </div>

        {/* <div className="col-md-6">
                    <Input type="date" label="Claim Date" placeholder="Claim Date" name="claim_date" ref={register({ required: "Required" })} />
                    <ErrorMessage errors={errors} name="claim_date" />
                </div> */}

        <div className="col-md-12">
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
            onChange={onLayerChange}
            options={layersOptions}
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
          <Editor value={content} onChange={onCommentChange} />
          <input
            type="hidden"
            ref={register({ required: "Required" })}
            name="treaty_comment"
          />
          <div className="mt-2">
            <ErrorMessage errors={errors} name="treaty_comment" />
          </div>
        </div>
        <div className="p-2">
          {editable && (
            <button className="btn btn-sm btn-square btn-primary">
              Update
            </button>
          )}
          {!editable && (
            <button className="btn btn-sm btn-square btn-primary">
              Continue
            </button>
          )}
          {claims.length > 0 && (
            <button
              type="button"
              onClick={() => toggle()}
              className="ml-2 btn btn-sm btn-square btn-danger"
            >
              Back to claims list
            </button>
          )}
        </div>
      </form>

      <Modal size="xl" centered show={showList} onHide={() => toggle()}>
        <Modal.Header>
          <Modal.Title>Preview of claim Data</Modal.Title>
          <button
            className="btn btn-square btn-primary btn-sm"
            onClick={() => toggle()}
            style={{ position: "absolute", right: 15 }}
          >
            Back to editor
          </button>
        </Modal.Header>
        <Modal.Body>
          <Datatable columns={makeClaimPreview} data={previewData} />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={cancelAllProcess}
            className="btn btn-sm btn-square btn-danger w-md"
          >
            Abort Process
          </button>
          <button
            disabled={loading}
            onClick={createClaims}
            className="btn btn-sm btn-square btn-success w-md"
          >
            {loading ? "loading, plesae wait..." : "Make Claim"}
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default MakeClaimForm;
