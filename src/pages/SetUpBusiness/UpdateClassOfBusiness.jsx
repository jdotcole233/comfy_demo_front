/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CLASS_OF_BUSINESS } from "../../graphql/mutattions";
import {
  FETCH_CLASS_OF_BUSINESS,
  CLASS_OF_BUSINESS,
} from "../../graphql/queries";
import { CurrencyValues, Loader } from "../../components";

export const UpdateClassOfBusiness = ({ data, toggle }) => {
  const [selectedClassOfBusiness, setSelectedClassOfBusiness] = useState("");
  const [addintionalInputFields, setaddintionalInputFields] = useState([]);
  const [businessname, setBusinessname] = useState("");
  const [detailCount, setCount] = useState(0);

  const { data: classOfBusiness, loading } = useQuery(CLASS_OF_BUSINESS, {
    variables: { id: data ? data?.class_of_business_id : "1" },
    fetchPolicy: "network-only",
  });

  const [updateClassOfBusiness] = useMutation(UPDATE_CLASS_OF_BUSINESS, {
    variables: {
      id: selectedClassOfBusiness.class_of_business_id,
      details: JSON.stringify(addintionalInputFields),
      business_name: businessname,
    },
    refetchQueries: [{ query: FETCH_CLASS_OF_BUSINESS }],
  });

  useEffect(() => {
    if (classOfBusiness) {
      setSelectedClassOfBusiness(classOfBusiness?.singleClassOfBusiness);
      setaddintionalInputFields([
        ...JSON.parse(
          classOfBusiness?.singleClassOfBusiness?.business_details || "[]"
        ),
      ]);
      setBusinessname(
        classOfBusiness?.singleClassOfBusiness?.business_name || ""
      );
    }
  }, [classOfBusiness]);

  useEffect(() => {
    if (addintionalInputFields.length) {
      setCount(addintionalInputFields.length);
    }
  }, [addintionalInputFields]);

  const handleAddInput = (e) => {
    const newInput = {
      keydetail: "",
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

  const handleUpdateBusinesss = (e) => {
    const business_details = addintionalInputFields.filter(
      (el) => el.keydetail.length > 0
    );
    if (business_details.length < addintionalInputFields.length) {
      swal(
        "Notice",
        "Either fill out the empty fields or remove them",
        "warning"
      );
    } else {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        icon: "warning",
        title: "Are you sure ?",
        text: `You want to update ${businessname} with  ${business_details.length} detail(s) to Afro-AsianSystem?.`,
        buttons: [
          "No",
          {
            text: "Yes",
            closeModal: false,
          },
        ],
      })
        .then((name) => {
          if (!name) throw null;
          return updateClassOfBusiness();
        })
        .then((json) => {
          setaddintionalInputFields([]);
          toggle();
          swal("Success", "Class of Business Created Successfully", "success");
        })
        .catch((err) => {
          if (err) {
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && classOfBusiness ? (
        <div>
          <div className="row">
            <div className="form-group">
              <h3 className="modal-title">Edit class of business</h3>
            </div>
          </div>
          <fieldset className="border p-1 mb-2">
            <legend style={{ fontSize: 16 }} className="w-auto">
              Business Overview
            </legend>
            <div className="row">
              <div className="col-md-12">
                <div className="card mini-stats-wid">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body">
                        <p className="text-muted font-weight-medium">
                          Total Offers
                        </p>
                        <h4 className="mb-0">
                          {
                            classOfBusiness?.singleClassOfBusiness
                              .single_total_offers
                          }
                        </h4>
                      </div>

                      <div className="mini-stat-icon avatar-sm  bg-primary align-self-center">
                        <span className="avatar-title">
                          <i className="bx bx-copy-alt font-size-24"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card mini-stats-wid">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body">
                        <p className="text-muted font-weight-medium">
                          Fac. Premium
                        </p>
                        <CurrencyValues
                          data={JSON.parse(
                            classOfBusiness?.singleClassOfBusiness
                              .single_total_overview
                          )}
                        />
                      </div>

                      <div className="avatar-sm  bg-primary align-self-center mini-stat-icon">
                        <span className="avatar-title  bg-primary">
                          <i className="bx bx-archive-in font-size-24"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="">Business Name</label>
            <input
              type="text"
              value={businessname}
              onChange={(e) => setBusinessname(e.target.value)}
              className="form-control"
              placeholder="eg. Marine Cargo"
            />
          </div>
          <div className="form-group">
            <div className="row mb-2">
              <div className="col-md-12">
                <button
                  onClick={handleAddInput}
                  className="btn btn-primary mr-2"
                >
                  +
                </button>
                {addintionalInputFields.length ? (
                  <button
                    onClick={handleRemoveInput}
                    className="btn btn-danger"
                  >
                    -
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <label htmlFor="">Business Details</label>
          </div>
          <div className="form-group">
            <div className="row">
              {addintionalInputFields.map((el, key) => (
                <div key={key} className="col-md-6">
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
                        onClick={() => handleRemoveParticularInput(key)}
                        className="btn btn-danger"
                        type="button"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <button
              disabled={!businessname.length}
              onClick={handleUpdateBusinesss}
              className="btn btn-primary btn-sm w-md"
            >
              Update Business
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
