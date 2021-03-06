/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import SingleDeductionForm from "./SingleDeductionForm";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import {
  MODIFY_TREATY_DEDUCTIONS,
  TREATY,
} from "../../../graphql/queries/treaty";
import swal from "sweetalert";

function UpdateDeductions({
  deductions = {},
  reinsurers = [],
  type,
  treaty_id,
  layer,
  treaty_accounts = [],
  setShow,
}) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (reinsurers && reinsurers.length > 0) {
      const __ = reinsurers.map((reinsurer) => {
        const newValue = _.first(reinsurer?.treaty_participant_deductions);
        return {
          commission:
            newValue?.commission === 0
              ? newValue?.commission
              : newValue?.commission || deductions?.commission,
          brokerage:
            newValue?.brokerage === 0
              ? newValue?.brokerage
              : newValue?.brokerage || deductions?.brokerage,
          nic_levy:
            newValue?.nic_levy === 0
              ? newValue?.nic_levy
              : newValue?.nic_levy || deductions?.nic_levy,
          withholding_tax:
            newValue?.withholding_tax === 0
              ? newValue?.withholding_tax
              : newValue?.withholding_tax || deductions?.withholding_tax,
          name: reinsurer.company_name,
          participant_id: reinsurer?.treaty_participation_id,
          participating_percentage: reinsurer?.treaty_participation_percentage,
          treaty_participant_deduction_id:
            reinsurer?.treaty_participant_deductions?.map(
              (el) => el.treaty_participant_deduction_id
            ),
        };
      });

      setValues(__);
    }
  }, [reinsurers]);

  const [modify] = useMutation(MODIFY_TREATY_DEDUCTIONS, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });

  // const valid = useMemo(() => {
  //   return values.every(isvalid);
  // }, [values]);

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const __ = [...values];
    __[index][name] = value;
    console.log(__);
    setValues(__);
  };

  const handleSubmit = () => {
    const data = values
      .filter((el) => el.participating_percentage)
      .map((el) => ({
        participant_id: el.participant_id,
        treaty_participant_deduction_id: el.treaty_participant_deduction_id,
        deductions: _.omit(el, [
          "participant_id",
          "name",
          "treaty_participant_deduction_id",
        ]),
      }));
    const account_ids = treaty_accounts.map((el) => el?.treaty_account_id);
    const isProp = type === "PROPORTIONAL";

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to modify deductions ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      modify({
        variables: { data, account_ids, isProp, layer: isProp ? "" : layer },
      })
        .then(() => {
          swal("Hurray!!", "Deductions modified successfully", "success");
          setShow(false);
        })
        .catch((err) => {
          swal("Whoops!!", err?.message, "error");
        });
    });
  };

  return (
    <div className="container-fluid">
      <Alert variant="danger">
        <p>Modify each reinsurer's deduction as agreed.</p>
        <span>
          This button allows you to specify deductions specific to reinsurers
          participating on this treaty
        </span>
      </Alert>
      <div className="d-flex flex-column flex-grow-1">
        {values.map((value, index) =>
          value.participating_percentage ? (
            <SingleDeductionForm
              key={index}
              index={index}
              values={value}
              onChange={onChange}
              type={type}
            />
          ) : null
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="btn btn-sm w-lg btn-primary  mt-3"
      >
        Enable
      </button>
    </div>
  );
}

export default UpdateDeductions;
