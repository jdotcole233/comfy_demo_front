/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "react-apollo";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  deleteAccessRoles,
  editAccessRoles,
} from "../../../layout/adminRoutes";
import { useAuth } from "../../../context/AuthContext";
import { BROKER } from "../../../graphql/queries/brokers";
import { REMOVE_BROKER_ASSOCIATE, UDPATE_BROKER_ASSOCIATE } from "../../../graphql/mutattions/brokers";

const AssociateButtons = ({ broker, data }) => {
  const { user } = useAuth();

  const { setValue, register, errors, handleSubmit } = useForm();
  const { state } = useLocation();
  const [viewAssociate, setViewAssociate] = useState(false);
  const [selectedAssociate, seTselectedAssociate] = useState(null);

  useEffect(() => {
    if (selectedAssociate) {
      setValue(
        "re_broker_assoc_first_name",
        selectedAssociate.re_broker_assoc_first_name
      );
      setValue(
        "re_broker_assoc_last_name",
        selectedAssociate.re_broker_assoc_last_name
      );
      setValue(
        "re_broker_assoc_email",
        selectedAssociate.re_broker_assoc_email
      );
      setValue(
        "re_broker_assoc_position",
        selectedAssociate.re_broker_assoc_position
      );
      setValue(
        "re_broker_assoc_primary_phone",
        selectedAssociate.re_broker_assoc_primary_phone
      );
      setValue(
        "re_broker_assoc_secondary_phone",
        selectedAssociate.re_broker_assoc_secondary_phone
      );
    }
  }, [selectedAssociate]);

  // handle View Associate Data
  const handleViewAssociate = (reinsurer) => {
    seTselectedAssociate(reinsurer);
    setViewAssociate(!viewAssociate);
  };

  const [removeAssociate] = useMutation(REMOVE_BROKER_ASSOCIATE, {
    refetchQueries: [
      { query: BROKER, variables: { id: data?.re_broker_id } },
    ],
  });

  const handleRemoveAssociate = (broker) => {
    // return;
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Warning",
      text: `Are you sure you want to delete ${broker.re_broker_assoc_first_name}?`,
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
        removeAssociate({
          variables: {
            id: broker.re_broker_associate_id,
          },
        }).then((json) => {
          swal("Sucess", "Associate removed Successfully", "success");
        });
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

  const [updateRep] = useMutation(UDPATE_BROKER_ASSOCIATE, {
    refetchQueries: [
      { query: BROKER, variables: { id: data?.re_broker_id } },
    ],
  });

  const handleUpdateAssociate = (values) => {
    const input = {
      ...values,
      re_brokersre_broker_id: data?.re_broker_id,
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update ${values.re_broker_assoc_first_name}?`,
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((res) => {
      if (!res) throw null;
      updateRep({
        variables: {
          input,
          id:
            broker?.re_broker_associate_id,
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
                  name="re_broker_assoc_first_name"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
                {errors.re_broker_assoc_first_name && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_first_name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Last name</label>
                <input
                  name="re_broker_assoc_last_name"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
                {errors.re_broker_assoc_last_name && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_last_name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Primary phone number</label>
                <input
                  name="re_broker_assoc_primary_phone"
                  ref={register({ required: "Required" })}
                  type="text"
                  className="form-control"
                  placeholder="Primary phone number"
                />
                {errors.re_broker_assoc_primary_phone && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_primary_phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Secondary Phone number</label>
                <input
                  name="re_broker_assoc_secondary_phone"
                  ref={register({ required: false })}
                  type="text"
                  className="form-control"
                  placeholder="Secondary Phone number"
                />
                {errors.re_broker_assoc_secondary_phone && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_secondary_phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Email</label>
                <input
                  name="re_broker_assoc_email"
                  type="email"
                  ref={register({ required: "Required" })}
                  className="form-control"
                  placeholder="Email"
                />
                {errors.re_broker_assoc_email && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name">Position</label>
                <select
                  name="re_broker_assoc_position"
                  ref={register({ required: "Required" })}
                  id=""
                  className="form-control"
                >
                  <option value="">Position</option>
                  <option value="Manager">Manager</option>
                  <option value="Underwriter">Underwriter</option>
                </select>
                {errors.re_broker_assoc_position && (
                  <p className="text-danger">
                    {errors.re_broker_assoc_position.message}
                  </p>
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
