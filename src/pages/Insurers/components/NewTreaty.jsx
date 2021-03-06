/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/ViewInsurerOffer.module.css";
import { InsurerOption, Selector } from "../../../components";
import { useMutation, useQuery } from "@apollo/client";
import { INSURERS } from "../../../graphql/queries";
import { CREATE_TREATY, TREATIES } from "../../../graphql/queries/treaty";
import swal from "sweetalert";

const hasOptionsAndNotEmpty = (options = []) => {
  if (options && options.length < 1) return true;
  const status = options.every((option) => {
    // console.log(option);
    return option.keydetail;
  });
  console.log(status);
  return status;
};

const proportionalArray = [
  "currency",
  "Geographical Scope",
  "Class of Risk/ Class of Business",
  "Treaty Detail",
  "Facultative Inward Acceptance",
  "Rates",
  "Profit Comission",
  "Portfolio",
  "Notice of claim",
  "Cash Loss limit",
  "Account Submission",
  "Account Settlement",
  "Revision of confirmed balances",
  "Choice of Law and Jurisdiction",
  "General Conditions",
  // "Special Conditions",
  "Exclusion",
  // "Specific Exclusions",
  "Alteration",
  "Wording",
  "Exchange Rate",
  "Additional Information",
];

const nonproportionalArray = [
  "Class of Business",
  "Territorial Scope",
  "Limit",
  "Reinstatement",
  "Premium/Minimum & Deposit Premium",
  "Premium Payable",
  "Choice of Law and Jurisdiction",
  "Conditions",
  // "Special Conditions",
  "Exclusions",
  // "Special Exclusion",
  "Alterations",
  "Wording",
  "Exchange Rate",
  "Additional Information",
];
const NewTreaty = (props) => {
  const [addintionalInputFields, setaddintionalInputFields] = useState([]);
  const [detailCount, setCount] = useState(0);
  const [treaty_name, setTreaty_name] = useState("");
  const { data: insurers } = useQuery(INSURERS);
  const [insurersData, setInsurersData] = useState([]);
  const [insurer, setInsurer] = useState(null);
  const [treaty_type, setTreaty_type] = useState(null);

  const [createProgram] = useMutation(CREATE_TREATY, {
    variables: {
      program: {
        treaty_name,
        treaty_details: JSON.stringify(addintionalInputFields),
        insurersinsurer_id: insurer?.value?.insurer_id,
        treaty_type: treaty_type?.value,
      },
    },
    refetchQueries: [{ query: TREATIES }],
  });

  useEffect(() => {
    if (insurers) {
      const rows = insurers?.insurers?.map((insurer) => ({
        label: insurer.insurer_company_name,
        value: insurer,
      }));
      setInsurersData(rows);
    }
  }, [insurers]);

  // const options = []

  const handleChooseInsurer = (value) => setInsurer(value ? value : null);

  const handleAddInput = (e) => {
    const newInput = {
      keydetail: "",
      value: "",
      required: true,
    };
    setCount(detailCount + 1);
    setaddintionalInputFields([...addintionalInputFields, newInput]);
  };

  const handleRemoveInput = (e) => {
    setaddintionalInputFields([
      ...addintionalInputFields.slice(0, addintionalInputFields.length - 1),
    ]);
  };

  const handleRemoveParticularInput = (id) => {
    const newSet = [...addintionalInputFields];
    newSet.splice(id, 1);
    setaddintionalInputFields(newSet);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const inputs = [...addintionalInputFields];
    inputs[index]["keydetail"] = value;
    setaddintionalInputFields(inputs);
  };

  // const tick = (checked, key) => {
  //   const inputs = [...addintionalInputFields];
  //   inputs[key]["required"] = checked;
  //   setaddintionalInputFields(inputs);
  // };

  const handleChooseType = (type) => setTreaty_type(type ? type : null);

  const createTreatyProgram = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to create this treaty program ?`,
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      createProgram()
        .then((res) => {
          swal("Hurray!!", "Treaty Program added successfully", "success");
          setTreaty_name("");
          setInsurer(null);
          setaddintionalInputFields([]);
          setTreaty_type(null);
          props.setOpenDrawer(false);
        })
        .catch((err) => {
          swal("Whhoops!!", "Treaty Program not added successfully", "error");
        });
    });
  };

  useEffect(() => {
    if (treaty_type && treaty_type.value === "PROPORTIONAL") {
      const initialRows = proportionalArray.map((key) => ({
        keydetail: key,
        value: "",
        required: true,
      }));
      setaddintionalInputFields(initialRows);
    } else {
      const initialRows = nonproportionalArray.map((key) => ({
        keydetail: key,
        value: "",
        required: true,
      }));
      setaddintionalInputFields(initialRows);
    }
  }, [treaty_type]);

  const counter = treaty_type && treaty_type.value === "PROPORTIONAL" ? 1 : 0;

  useEffect(() => {
    if (props.noTreatyFound && insurersData.length > 0) {
      const insurer = insurersData.find(
        (insurer) => insurer.value.insurer_id === props.noTreatyFound
      );
      setInsurer(insurer);
    }
  }, [props.noTreatyFound, insurersData]);

  return (
    <div className="">
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Create Treaty Program</h2>
        {props.noTreatyFound && (
          <div className="alert alert-info">
            <p>No Treaty programs were detected for the said Insurer</p>
            <p>Please create one to continue</p>
          </div>
        )}
      </div>
      <div className={styles.card_body}>
        <div className="form-group">
          <label htmlFor="">Ceding Company</label>
          <Selector
            value={insurer}
            components={{ Option: InsurerOption }}
            options={insurersData}
            onChange={handleChooseInsurer}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Treaty Type</label>
          <Selector
            value={treaty_type}
            placeholder="Treaty Type"
            options={[
              { label: "Proportional", value: "PROPORTIONAL" },
              { label: "Non Proportional", value: "NONPROPORTIONAL" },
            ]}
            onChange={handleChooseType}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Type of goods">Treaty Program</label>
          <input
            name="name"
            value={treaty_name}
            onChange={(e) => setTreaty_name(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Treaty Name"
          />
        </div>

        <div className="form-group">
          <div className="row mb-2">
            <div className="col-md-12">
              <button onClick={handleAddInput} className="btn btn-primary mr-2">
                +
              </button>
              {addintionalInputFields.length > counter ? (
                <button onClick={handleRemoveInput} className="btn btn-danger">
                  -
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <label htmlFor="">Treaty Details</label>
        </div>
        <div className="form-group">
          <div className="row">
            {treaty_type &&
              addintionalInputFields.map((el, key) => {
                const isAdditional = el.keydetail === "Additional Information";
                return (
                  <div className={`col-md-${isAdditional ? "12" : "6"} mb-3`}>
                    {isAdditional ? (
                      <div className="alert alert-danger">
                        <p>
                          All other information (Special Exclusions, Articles,
                          Other data) should be placed here. This will be
                          appended as extra pages after the signatory page of
                          the treaty document" in an alert above it
                        </p>
                      </div>
                    ) : null}
                    <div className="input-group">
                      <input
                        value={el.keydetail}
                        onChange={(e) => handleInputChange(e, key)}
                        type="text"
                        className="form-control"
                        placeholder={`Detail ${key + 1}`}
                        readOnly={
                          treaty_type.value === "PROPORTIONAL"
                            ? proportionalArray.includes(el.keydetail)
                            : nonproportionalArray.includes(el.keydetail)
                        }
                      />
                      <div className="input-group-prepend">
                        <button
                          disabled={
                            treaty_type.value === "PROPORTIONAL"
                              ? proportionalArray.includes(el.keydetail)
                              : nonproportionalArray.includes(el.keydetail)
                          }
                          onClick={() => handleRemoveParticularInput(key)}
                          className="btn btn-danger"
                          type="button"
                        >
                          X
                        </button>
                      </div>
                    </div>
                    {/* <div className="form-check mb-3">
                    <input
                      checked={el.required}
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => tick(e.target.checked, key)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Required
                    </label>
                  </div> */}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="form-group">
          <button
            onClick={createTreatyProgram}
            disabled={
              !treaty_name.trim() ||
              !treaty_type ||
              !insurer ||
              !hasOptionsAndNotEmpty(addintionalInputFields)
            }
            className="btn btn-success btn-sm w-md"
          >
            Create Treaty Program
          </button>
        </div>
      </div>
    </div>
  );
};

NewTreaty.propTypes = {
  setOpenDrawer: PropTypes.func.isRequired,
};

export default NewTreaty;
