/* eslint-disable no-throw-literal */
import React, { Fragment, useState, useMemo } from "react";
import { useMutation } from "react-apollo";
import { useForm } from "react-hook-form";
import { FaRegFileExcel } from "react-icons/fa";
import { RiListSettingsLine, RiUpload2Line } from "react-icons/ri";
import swal from "sweetalert";
import { ErrorMessage, Input } from "../../components";
import { Select } from "../../components/Input";
import { TREATY_CLAIMS, UPLOAD_CLAIMS } from "../../graphql/queries/treaty";
import { acceptedColumns } from "./columns";
import styles from "./styles/card.module.css";

const AutomateMakeTreatyClaimForm = ({ treaty, setShow }) => {
  const [useCUstomeHeaders, setUseCUstomeHeaders] = useState(false);
  const [state, setState] = useState(acceptedColumns);
  const [upload] = useMutation(UPLOAD_CLAIMS, {
    refetchQueries: [{ query: TREATY_CLAIMS }],
  });
  const { register, handleSubmit, errors, reset } = useForm();

  const onChange = (evt) => {
    const { id, value } = evt.target;
    const __ = state;
    __[parseInt(id)].provided = value;
    setState(__);
  };

  const onUpload = (values) => {
    const custom_headers = JSON.stringify(
      state.map((el, key) => ({
        accepted: el.accepted,
        provided: el.provided || el.accepted,
      }))
    );
    const variables = {
      ...values,
      file: values.file[0],
      custom_headers,
    };
    swal({
      icon: "warning",
      title: "Proceed to create Claims ?",
      text: "This action will process this information and added as claims(s) to this treaty",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      upload({
        variables,
      })
        .then((res) => {
          swal("Success", "Claim(s) made successfully", "success");
          reset();
          setShow(false);
        })
        .catch((err) => {
          swal("Whoops!!", "Claim(s) not made successfully", "error");
        });
    });
  };

  const layers = useMemo(() => {
    if (treaty) {
      return JSON.parse(treaty?.layer_limit || "[]").map((el, key) => ({
        label: `Layer ${key + 1}`,
        value: key + 1,
      }));
    }
    return [];
  }, [treaty]);

  return (
    <form onSubmit={handleSubmit(onUpload)}>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Upload Claim Document</h2>
        <div className="alert alert-info">
          <p>Please Follow the instructions below: </p>
          <ul>
            <li>
              Upload handles only <strong>Excel (.xls, .csv, .xsls)</strong>{" "}
              files
            </li>
            <li>
              Provide Corresponding Names of expected Columns if you have
              different names on the file to be uploaded
            </li>
            <li>The System expects the Following Columns(CASE INSENSITIVE) </li>
            <ul>
              <li>Policy Number</li>
              <li>Claim Number</li>
              <li>Insured Name</li>
              <li>Date of Loss</li>
              <li>Claim Paid</li>
              <li>Expected deductible</li>
            </ul>
          </ul>
        </div>
      </div>

      <div
        onClick={() => setUseCUstomeHeaders((prev) => !prev)}
        className="row mx-1 mb-2"
      >
        <button type="button" className="btn btn-outline-info">
          Provide Custom Headers
          <RiListSettingsLine className="ml-2" />
        </button>
      </div>

      {useCUstomeHeaders && (
        <fieldset className="border">
          <legend className="font-size-16 w-auto">Custom Headers</legend>
          <div className="row row-bottom">
            {state.map((el, key) => (
              <Fragment key={key}>
                <div className="col-md-6">
                  <Input id={key} onChange={onChange} />
                </div>
                <div className="col-md-6 row-bottom">
                  <Input value={el.accepted} readOnly />
                </div>
              </Fragment>
            ))}
          </div>
        </fieldset>
      )}

      <div className="row mt-3">
        <div className="col-md-6">
          <Input
            ref={register({ required: false })}
            label="Header start at"
            name="start_at"
            type="number"
            placeholder="headers start at"
          />
        </div>
        <div className="col-md-6">
          <Select
            ref={register({ required: "Required" })}
            options={layers}
            label="Layer Number"
            name="layer_number"
          />
          <ErrorMessage errors={errors} name="layer_number" />
          <Input
            type="hidden"
            name="treaty_id"
            value={treaty?.treaty_id}
            ref={register({ required: true })}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <FaRegFileExcel size={100} color="#658572" />
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Input
            label="Select File"
            ref={register({ required: "Required" })}
            name="file"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <ErrorMessage errors={errors} name="file" />
        </div>
      </div>

      <div className="row justify-content-end pr-2">
        <button className="btn btn-primary btn-sm btn-square w-md">
          Upload
          <RiUpload2Line size={15} className="ml-3" />
        </button>
      </div>
    </form>
  );
};

export default AutomateMakeTreatyClaimForm;
