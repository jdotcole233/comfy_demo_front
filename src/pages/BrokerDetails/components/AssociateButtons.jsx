/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from "react";
import {
  REMOVE_ASSOCIATE,
  UPDATE_REINSURER_ASSOCIATE,
} from "../../../graphql/mutattions";
import { useMutation } from "react-apollo";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { REINSURER } from "../../../graphql/queries";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  deleteAccessRoles,
  editAccessRoles,
} from "../../../layout/adminRoutes";
import { AuthContext } from "../../../context/AuthContext";

const AssociateButtons = ({ broker, data }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { setValue, register, errors, handleSubmit } = useForm();
  const { state } = useLocation();
  const [viewAssociate, setViewAssociate] = useState(false);
  const [selectedAssociate, seTselectedAssociate] = useState(null);

  useEffect(() => {
    if (selectedAssociate) {
      setValue("rep_first_name", selectedAssociate.rep_first_name);
      setValue("rep_last_name", selectedAssociate.rep_last_name);
      setValue("rep_email", selectedAssociate.rep_email);
      setValue("position", selectedAssociate.position);
      setValue(
        "rep_primary_phonenumber",
        selectedAssociate.rep_primary_phonenumber
      );
      setValue(
        "rep_secondary_phonenumber",
        selectedAssociate.rep_secondary_phonenumber
      );
    }
  }, [selectedAssociate]);

  // handle View Associate Data
  const handleViewAssociate = (reinsurer) => {
    seTselectedAssociate(reinsurer);
    setViewAssociate(!viewAssociate);
  };

  const [removeAssociate] = useMutation(REMOVE_ASSOCIATE, {
    variables: {
      id: selectedAssociate?.reinsurer_representative_id,
    },
  });
  const handleRemoveAssociate = (broker) => {
    // return;
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Warning",
      text: `Are you sure you want to delete ${broker.broker_company_name}?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    })
      .then((name) => {
        if (!name) throw {};
        return removeAssociate({
          variables: {
            id: broker.reinsurer_representative_id,
          },
          refetchQueries: [
            { query: REINSURER, variables: { id: state?.broker_id } },
          ],
        });
      })
      .then((json) => {
        swal("Sucess", "Associate removed Successfully", "success");
      })
      .catch((err) => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  const [updateRep] = useMutation(UPDATE_REINSURER_ASSOCIATE, {
    refetchQueries: [{ query: REINSURER, variables: { id: state?.broker_id } }],
  });

  const handleUpdateAssociate = (values) => {
    const rep = {
      ...values,
      reinsurersreinsurer_id: data?.broker.broker_id,
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update ${values.broker_company_name}?`,
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      updateRep({
        variables: {
          rep,
          reinsurer_representative_id:
            selectedAssociate?.reinsurer_representative_id,
        },
      })
        .then((res) => {
          swal("Sucess", "Associate updated Successfully", "success");
          setViewAssociate(false);
          seTselectedAssociate(null);
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
  return (
    <div>
      <>
        <button
          onClick={() => handleViewAssociate(broker)}
          className="btn btn-sm btn-primary w-md mr-1"
        >
          View
        </button>
        {deleteAccessRoles.includes(user?.position) && (
          <button
            onClick={() => handleRemoveAssociate(broker)}
            className="btn btn-sm btn-danger w-md mr-1"
          >
            Remove
          </button>
        )}
      </>

      {/* View Associate Modal */}
      <Modal
        size="lg"
        show={viewAssociate}
        onHide={() => setViewAssociate(!viewAssociate)}
      >
        <Modal.Header closeButton>View Associate</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdateAssociate)} className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">First name</label>
                <input
                  name="rep_first_name"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
                {errors.rep_first_name && (
                  <p className="text-danger">{errors.rep_first_name.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Last name</label>
                <input
                  name="rep_last_name"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
                {errors.rep_last_name && (
                  <p className="text-danger">{errors.rep_last_name.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Primary phone number</label>
                <input
                  name="rep_primary_phonenumber"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="Primary phone number"
                />
                {errors.rep_primary_phonenumber && (
                  <p className="text-danger">
                    {errors.rep_primary_phonenumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Secondary Phone number</label>
                <input
                  name="rep_secondary_phonenumber"
                  ref={register({ required: false })}
                  type="text"
                  className="form-control"
                  placeholder="Secondary Phone number"
                />
                {errors.rep_secondary_phonenumber && (
                  <p className="text-danger">
                    {errors.rep_secondary_phonenumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Email</label>
                <input
                  name="rep_email"
                  type="email"
                  ref={register({ required: "Required" })}
                  className="form-control"
                  placeholder="Email"
                />
                {errors.rep_email && (
                  <p className="text-danger">{errors.rep_email.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Position</label>
                <select
                  name="position"
                  ref={register({ required: "Required" })}
                  id=""
                  className="form-control"
                >
                  <option value="">Position</option>
                  <option value="Manager">Manager</option>
                  <option value="Underwriter">Underwriter</option>
                </select>
                {errors.position && (
                  <p className="text-danger">{errors.position.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end">
              {/* <button type="button" onClick={() => setViewAssociate(!viewAssociate)} className="btn btn-danger btn-sm w-md mr-1">Close</button> */}
              {editAccessRoles.includes(user?.position) && (
                <button type="submit" className="btn btn-primary btn-sm w-lg">
                  Save
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* /end of View Associate Modal */}
    </div>
  );
};

export default AssociateButtons;
