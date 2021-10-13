/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import { ReinsurerOption, Selector } from "../../components";
import { useForm } from "react-hook-form";
import countriesData from "../../assets/countriesData";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_INSURER, UPDATE_INSURER } from "../../graphql/mutattions";
import { INSURERS, INSURER, REINSURERS } from "../../graphql/queries";
import swal from "sweetalert";
// import { DrawerContext } from '../../components/Drawer';
import { AuthContext } from "../../context/AuthContext";
import { editAccessRoles } from "../../layout/adminRoutes";

function AddInsurer({ edit, toggle, data, closed, view }) {
  // const { closed } = useContext(DrawerContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { data: reinsurers } = useQuery(REINSURERS);
  const [choice, setChoice] = useState("");
  const { register, errors, handleSubmit, reset, setValue } = useForm();
  const [countries, setCountries] = useState([]);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const [reinsurersData, setReinsurersData] = useState([]);
  useEffect(() => {
    if (closed) {
      reset();
      setChoice("");
    }
  }, [closed, reset]);

  useEffect(() => {
    if (reinsurers) {
      const rows = reinsurers.reinsurers.map((reinsurer) => ({
        label: reinsurer.re_company_name,
        value: reinsurer,
      }));
      setReinsurersData(rows);
    }
  }, [reinsurers]);

  const [createInsurer] = useMutation(CREATE_INSURER, {
    refetchQueries: [{ query: INSURERS }],
  });

  const [updateInsurer] = useMutation(UPDATE_INSURER, {
    refetchQueries: [
      { query: INSURER, variables: { id: data?.insurer?.insurer_id } },
    ],
  });

  useEffect(() => {
    if (data) {
      setValue("insurer_company_name", data?.insurer?.insurer_company_name);
      setValue("insurer_company_email", data?.insurer?.insurer_company_email);
      setValue("street", data?.insurer?.insurer_address.street);
      setValue("region", data?.insurer?.insurer_address.region);
      setValue("country", data?.insurer?.insurer_address.country);
      setValue("suburb", data?.insurer?.insurer_address.suburb);
      setValue(
        "insurer_company_website",
        data?.insurer?.insurer_company_website
      );
    }
  }, [data]);

  useEffect(() => {
    const countriesList = [];
    countriesData.map((country, index) => {
      const c = {
        label: country.name,
        value: country.name,
      };
      countriesList.push(c);
      return c;
    });
    setCountries(countriesList);
  }, []);

  const handleAddInsurer = (variables) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to add ${variables.insurer_company_name} ?`,
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      createInsurer({
        variables,
      })
        .then(async (res) => {
          swal("Sucess", "Insurer Created Successfully", "success");
          reset();
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleUpdateInsurer = (insurer) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to  update ${insurer.insurer_company_name}? `,
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updateInsurer({
        variables: {
          insurer,
          insurer_id: data?.insurer.insurer_id,
        },
      })
        .then(async (res) => {
          swal("Sucess", "Insurer Created Successfully", "success");
          toggle();
        })
        .catch((err) => {
          if (err) {
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleGetReinsurer = (value) => {
    setSelectedReinsurer(value ? value.value : null);
  };

  useEffect(() => {
    if (selectedReinsurer) {
      setValue("insurer_company_name", selectedReinsurer.re_company_name);
      setValue("insurer_company_email", selectedReinsurer.re_company_email);
      setValue("street", selectedReinsurer.reinsurer_address.street);
      setValue("region", selectedReinsurer.reinsurer_address.region);
      setValue("country", selectedReinsurer.reinsurer_address.country);
      setValue("suburb", selectedReinsurer.reinsurer_address.suburb);
      setValue("insurer_company_website", selectedReinsurer.re_company_website);
    } else {
      reset();
    }
  }, [selectedReinsurer]);



  const Form = (
    <div className="col-md-12">
      <fieldset className="border-form p-2">
        <legend className="w-auto" style={{ fontSize: 16 }}>
          {!edit ? "Create new insurer" : "Edit insurer"}
        </legend>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company name</label>
              <input
                name="insurer_company_name"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Company name"
              />
              {errors.insurer_company_name && (
                <p className="text-danger">
                  {errors.insurer_company_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                name="insurer_company_email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {errors.insurer_company_email && (
                <p className="text-danger">
                  {errors.insurer_company_email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Website</label>
              <input
                name="insurer_company_website"
                ref={register({ required: false })}
                type="text"
                className="form-control"
                placeholder="Website"
              />
              {errors.insurer_company_website && (
                <p className="text-danger">
                  {errors.insurer_company_website.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Street Address</label>
              <input
                name="street"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Street Address"
              />
              {errors.street && (
                <p className="text-danger">{errors.street.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Suburb/city</label>
              <input
                name="suburb"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Suburb"
              />
              {errors.suburb && (
                <p className="text-danger">{errors.suburb.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Region/State</label>
              <input
                name="region"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Region"
              />
              {errors.region && (
                <p className="text-danger">{errors.region.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Country</label>
              <input
                ref={register({
                  required: "Required",
                })}
                type="text"
                name="country"
                list="movies"
                placeholder="Country"
                className="form-control"
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}

              <datalist id="movies">
                <select name="movies" className="form-control">
                  {countries.map((country, key) => (
                    <option key={key} value={country.label} />
                  ))}
                </select>
              </datalist>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );


  if (view) {
    return (
      <form
        onSubmit={handleSubmit(handleUpdateInsurer)}
      >

        <div className="form-group">
          <h3 className="modal-title">View Insurer</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Company name</label>
              <input
                name="insurer_company_name"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Company name"
                defaultValue={data?.insurer_company_name}
              />
              {errors.insurer_company_name && (
                <p className="text-danger">
                  {errors.insurer_company_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                name="insurer_company_email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                defaultValue={data?.insurer_company_email}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {errors.insurer_company_email && (
                <p className="text-danger">
                  {errors.insurer_company_email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Website</label>
              <input
                name="insurer_company_website"
                ref={register({ required: false })}
                type="text"
                className="form-control"
                placeholder="Website"
                defaultValue={data?.insurer_company_website}
              />
              {errors.insurer_company_website && (
                <p className="text-danger">
                  {errors.insurer_company_website.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Street Address</label>
              <input
                name="street"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Street Address"
                defaultValue={data?.insurer_address.street}
              />
              {errors.street && (
                <p className="text-danger">{errors.street.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Suburb/city</label>
              <input
                name="suburb"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Suburb"
                defaultValue={data?.insurer_address.suburb}
              />
              {errors.suburb && (
                <p className="text-danger">{errors.suburb.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Region/State</label>
              <input
                name="region"
                ref={register({ required: "Required" })}
                type="text"
                className="form-control"
                placeholder="Region"

                defaultValue={data?.insurer_address.region}
              />
              {errors.region && (
                <p className="text-danger">{errors.region.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Country</label>
              <input
                ref={register({
                  required: "Required",
                })}
                type="text"
                name="country"
                list="movies"
                placeholder="Country"
                className="form-control"
                defaultValue={data?.insurer_address.region}
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}

              <datalist id="movies">
                <select name="movies" className="form-control">
                  {countries.map((country, key) => (
                    <option key={key} value={country.label} />
                  ))}
                </select>
              </datalist>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="form-group d-flex justify-content-end">
            {editAccessRoles.includes(user?.position) && (
              <button type="submit" className="btn btn-sm btn-primary w-md">
                Edit Insurer
              </button>
            )}
          </div>
        </div>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(!edit ? handleAddInsurer : handleUpdateInsurer)}
    >
      <div className="">
        <div className="form-group">
          <h3 className="modal-title">{!edit ? "Add" : "Edit"} Insurer</h3>
        </div>
        {/* <div className="row"> */}
        <div className="">
          <fieldset className="border-form p-2 mb-2">
            <legend className="w-auto" style={{ fontSize: 16 }}>
              Choose action
            </legend>
            <div className="form-group">
              <select
                name=""
                id=""
                value={choice}
                onChange={(evt) => {
                  setChoice(evt.target.value);
                  setSelectedReinsurer(null);
                }}
                className="form-control"
              >
                <option value="">Choose one</option>
                <option value="new">Create new</option>
                <option value="old">Add from list</option>
              </select>
              {/* {errors.insurer_company_name && <p className="text-danger">{errors.insurer_company_name.message}</p>} */}
            </div>
          </fieldset>
        </div>
        {/* </div> */}
        <div className="row">
          {!edit && choice === "old" && (
            <div className="col-md-12">
              <fieldset className="border-form p-2 mb-2">
                <legend className="w-auto" style={{ fontSize: 16 }}>
                  Add from list
                </legend>
                <Alert variant="danger">
                  <strong>
                    Select a Reinsurance company from the list to add as an
                    insurer
                  </strong>
                </Alert>
                <Selector
                  components={{ Option: ReinsurerOption }}
                  onChange={handleGetReinsurer}
                  options={reinsurersData}
                />
              </fieldset>
            </div>
          )}
          {choice === "old" && selectedReinsurer && Form}
          {choice === "new" && Form}
          {(choice || selectedReinsurer) && (
            <div className="col-md-12 mt-2">
              <div className="form-group d-flex justify-content-end">
                {!edit && (
                  <button type="submit" className="btn btn-sm btn-primary w-md">
                    Add Insurer
                  </button>
                )}
                {editAccessRoles.includes(user?.position) && edit && (
                  <button type="submit" className="btn btn-sm btn-primary w-md">
                    Edit Insurer
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddInsurer;
