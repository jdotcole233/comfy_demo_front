/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/ViewInsurerOffer.module.css";
import { InsurerOption, Selector } from "../../../components";
import { useMutation, useQuery } from "react-apollo";
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
      const rows = insurers.insurers.map((insurer) => ({
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

  const tick = (checked, key) => {
    const inputs = [...addintionalInputFields];
    inputs[key]["required"] = checked;
    setaddintionalInputFields(inputs);
  };

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
      setaddintionalInputFields([
        {
          keydetail: "currency",
          value: "",
          required: true,
        },
      ]);
    } else {
      setaddintionalInputFields([]);
    }
  }, [treaty_type]);

  const counter = treaty_type && treaty_type.value === "PROPORTIONAL" ? 1 : 0;

  return (
    <div className="">
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Create Treaty Program</h2>
        {/* <Alert variant="danger">
                    <strong>A copy of the offer will be sent to the list of associates to be created below</strong>
                </Alert> */}
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
            {addintionalInputFields.map((el, key) => (
              <div className="col-md-6 mb-3">
                <div className="input-group">
                  <input
                    value={el.keydetail}
                    onChange={(e) => handleInputChange(e, key)}
                    type="text"
                    className="form-control"
                    placeholder={`Detail ${key + 1}`}
                    readOnly={
                      treaty_type &&
                      treaty_type.value === "PROPORTIONAL" &&
                      el.keydetail === "currency"
                    }
                  />
                  <div className="input-group-prepend">
                    <button
                      disabled={
                        treaty_type &&
                        treaty_type.value === "PROPORTIONAL" &&
                        el.keydetail === "currency"
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
            ))}
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
            className="btn btn-primary btn-sm w-md"
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
