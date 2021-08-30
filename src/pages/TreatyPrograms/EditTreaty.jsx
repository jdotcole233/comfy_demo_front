/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import styles from "./styles/inputOffer.module.css";
import { Input, InsurerOption, Selector } from "../../components";
import { useMutation, useQuery } from "react-apollo";
import { INSURERS } from "../../graphql/queries";
import { UPDATE_TREATY, TREATIES } from "../../graphql/queries/treaty";
import swal from "sweetalert";

const EditTreaty = ({ treaty, setOpenDeductions }) => {
  const [addintionalInputFields, setaddintionalInputFields] = useState([]);
  const [detailCount, setCount] = useState(0);
  const [treaty_name, setTreaty_name] = useState("");
  const { data: insurers } = useQuery(INSURERS);
  const [insurersData, setInsurersData] = useState([]);
  const [insurer, setInsurer] = useState(null);

  const [createProgram] = useMutation(UPDATE_TREATY, {
    variables: {
      id: treaty?.treaty_program_id,
      program: {
        treaty_name,
        treaty_details: JSON.stringify(addintionalInputFields),
        insurersinsurer_id: insurer?.value?.insurer_id,
      },
    },
    refetchQueries: [{ query: TREATIES }],
  });

  useEffect(() => {
    if (treaty && insurers) {
      setTreaty_name(treaty?.treaty_name);
      setaddintionalInputFields(JSON.parse(treaty?.treaty_details));
      setInsurer({
        label: insurers?.insurers?.find(
          (insurer) => insurer?.insurer_id === treaty?.insurer?.insurer_id
        )?.insurer_company_name,
        value: insurers?.insurers?.find(
          (insurer) => insurer?.insurer_id === treaty?.insurer?.insurer_id
        )?.insurer_company_name,
      });
    }
    return () => {};
  }, [treaty, insurers]);

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

  const createTreatyProgram = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update this treaty program ?`,
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
          swal("Hurray!!", "Treaty Program updated successfully", "success");
          setTreaty_name("");
          setInsurer(null);
          setaddintionalInputFields([]);
          setOpenDeductions(false);
        })
        .catch((err) => {
          swal("Whhoops!!", "Treaty Program not updated successfully", "error");
        });
    });
  };

  // const tick = (checked, key) => {
  //   const inputs = [...addintionalInputFields];
  //   inputs[key]["required"] = checked;
  //   setaddintionalInputFields(inputs);
  // };

  return (
    <div className="">
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Edit Treaty Program</h2>
        {/* <Alert variant="danger">
                    <strong>A copy of the offer will be sent to the list of associates to be created below</strong>
                </Alert> */}
      </div>
      <div className={styles.card_body}>
        <div className="form-group">
          <label htmlFor="">Ceding Company</label>
          <Selector
            value={
              insurer
                ? insurer
                : {
                    label: insurers?.insurers?.find(
                      (insurer) =>
                        insurer?.insurer_id === treaty?.insurer?.insurer_id
                    )?.insurer_company_name,
                    value: insurers?.insurers?.find(
                      (insurer) =>
                        insurer?.insurer_id === treaty?.insurer?.insurer_id
                    )?.insurer_company_name,
                  }
            }
            components={{ Option: InsurerOption }}
            options={insurersData}
            onChange={handleChooseInsurer}
          />
        </div>

        <div className="form-group">
          <Input
            label="Treaty Program"
            name="name"
            value={treaty_name}
            onChange={(e) => setTreaty_name(e.target.value)}
            type="text"
            placeholder="Treaty Name"
          />
        </div>

        <div className="form-group">
          <div className="row mb-2">
            <div className="col-md-12">
              <button onClick={handleAddInput} className="btn btn-primary mr-2">
                +
              </button>
              {addintionalInputFields.length ? (
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
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <input
                    value={el.keydetail}
                    onChange={(e) => handleInputChange(e, key)}
                    type="text"
                    className="form-control"
                    placeholder={`Detail ${key + 1}`}
                  />
                  <div className="input-group-prepend">
                    <button
                      disabled={
                        treaty?.treaty_type.value === "PROPORTIONAL" &&
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
                    checked={el.required ?? true}
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
            disabled={!treaty_name}
            className="btn btn-primary btn-sm w-md"
          >
            Update Treaty Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTreaty;
