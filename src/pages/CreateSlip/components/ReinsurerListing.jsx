/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { reinsurersColumns } from "../columns";
import { Datatable } from "../../../components";
import { DropdownButton, ButtonGroup, Dropdown, Modal } from "react-bootstrap";
import {
  editAccessRoles,
  deleteAccessRoles,
} from "../../../layout/adminRoutes";
import { useMutation } from "@apollo/client";
import {
  REMOVE_REINSURER_FROM_PARTICIPATION,
  ADD_PERCENTAGE,
} from "../../../graphql/mutattions";
import { SINGLE_OFFER } from "../../../graphql/queries";
import swal from "sweetalert";
import PlaceOffer from "./PlaceOffer";
import UnplacedOffer from "./UnplaceOffer";

const getLongestPrecision = (value) => {
  if (Number.isInteger(value)) return 4;
  const __ = Number(value).toString().split(".")[1];
  return __.toString().length;
};

const ReinsurerListing = ({ data, state, user }) => {
  const [reinsurers, setReinsurers] = useState([]);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const [addPercentageModal, setAddPercentageModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [percentageErrorEntry, setPercentageErrorEntry] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [sumOfPArticipatingPercentage, setSumOfPArticipatingPercentage] =
    useState(0);
  const [removeReinsurer] = useMutation(REMOVE_REINSURER_FROM_PARTICIPATION, {
    refetchQueries: [
      { query: SINGLE_OFFER, variables: { offer_id: state?.offer_id } },
    ],
  });

  const [addPercentage] = useMutation(ADD_PERCENTAGE, {
    variables: {
      offer_participant_id: selectedReinsurer?.offer_participant_id,
      offer_id: state?.offer_id,
      percentage,
    },
    refetchQueries: [
      { query: SINGLE_OFFER, variables: { offer_id: state?.offer_id } },
    ],
  });

  const handleAddPercentage = (reinsurer) => {
    setSelectedReinsurer(reinsurer);
    setAddPercentageModal(!addPercentageModal);
  };

  const handleEditPercentage = (reinsurer) => {
    setSelectedReinsurer(reinsurer);
    setIsEdit(true);
    setAddPercentageModal(!addPercentageModal);
  };

  const showingFacOffer =
    data?.findSingleOffer?.facultative_offer - sumOfPArticipatingPercentage;

  const handleRemoveReinsurer = (data) => {
    // console.log(data);
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to remove ${data.reinsurer.re_company_name} ?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      removeReinsurer({
        variables: {
          offer_id: state?.offer_id,
          offer_participating_id: data.offer_participant_id,
          reinsurer_id: data.reinsurer.reinsurer_id,
        },
      })
        .then((res) => {
          swal("Success", "Reinsurer removed successfully", "success");
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  useEffect(() => {
    if (selectedReinsurer && selectedReinsurer.offer_participant_percentage) {
      setPercentage(selectedReinsurer.offer_participant_percentage);
    }
  }, [selectedReinsurer]);

  useEffect(() => {
    if (data) {
      const list = [];
      let sumOfParticipatingPercentages = 0;

      data.findSingleOffer.offer_participant.map((reinsurer) => {
        sumOfParticipatingPercentages += reinsurer.offer_participant_percentage;
        const row = {
          company_name: reinsurer.reinsurer.re_company_name,
          company_email: reinsurer.reinsurer.re_company_email,
          no_of_reps: "",
          participant_percentage: reinsurer.offer_participant_percentage,
          offer_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-soft-${
                data.findSingleOffer.offer_status === "OPEN"
                  ? "primary"
                  : data.findSingleOffer.offer_status === "CLOSING"
                  ? "success"
                  : "defualt"
              } p-1 font-size-11`}
            >
              {data.findSingleOffer.offer_status}
            </span>
          ),
          actions: (
            <>
              <DropdownButton
                disabled={data?.findSingleOffer?.placed_offer}
                className="mr-1 mb-1"
                variant="primary"
                size="sm"
                as={ButtonGroup}
                id="dropdown-basic-button"
                title="Percentage"
              >
                {reinsurer.offer_participant_percentage ? (
                  <Dropdown.Item
                    onClick={() => handleEditPercentage(reinsurer)}
                    disabled={
                      !editAccessRoles.includes(user?.user_role?.position)
                    }
                  >
                    Edit
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => handleAddPercentage(reinsurer)}>
                    Add
                  </Dropdown.Item>
                )}
              </DropdownButton>
              {deleteAccessRoles.includes(user?.user_role?.position) && (
                <button
                  disabled={data?.findSingleOffer?.placed_offer}
                  onClick={() => handleRemoveReinsurer(reinsurer)}
                  className="btn btn-danger btn-sm w-md"
                >
                  Remove
                </button>
              )}
            </>
          ),
        };
        list.push(row);
        return row;
      });
      setSumOfPArticipatingPercentage(sumOfParticipatingPercentages);

      setReinsurers(list);
    }
  }, [data]);

  const AddPercentage = (event) => {
    if (!percentage) {
      swal("Warning", "Please provide a value for percentage", "warning");
      return;
    }

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure update percentage?",
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      addPercentage()
        .then((res) => {
          swal("Success", "Percentage updated", "success");
          setPercentage("");
          setSelectedReinsurer(null);
          setAddPercentageModal(!addPercentageModal);
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  // handling change Percentage Value
  const handleChangePercentageValue = (event) => {
    const { value } = event.target;
    // console.log(typeof value)
    const remainingPercentage =
      data?.findSingleOffer?.facultative_offer - sumOfPArticipatingPercentage;
    // console.log("Remaining", remainingPercentage)
    const availablePercenatge =
      remainingPercentage + selectedReinsurer.offer_participant_percentage;
    // console.log("Available %", availablePercenatge)
    const _actual_amount = parseFloat(availablePercenatge).toFixed(
      getLongestPrecision(data?.findSingleOffer?.facultative_offer)
    );
    if (parseFloat(value) <= _actual_amount) {
      setPercentage(value);
      setPercentageErrorEntry(false);
    } else {
      setPercentage("");
      setPercentageErrorEntry(true);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">
                Distribution Companies(Re-Insurers)
              </h4>
              <div className="row pl-3 pr-3 d-flex justify-content-between">
                <h5 style={{ fontSize: 12, color: "red" }}>
                  Current Fac. Offer :{" "}
                  {showingFacOffer.toFixed(
                    getLongestPrecision(
                      data?.findSingleOffer?.facultative_offer
                    )
                  )}{" "}
                  %
                </h5>

                {data?.findSingleOffer?.placed_offer ? (
                  <UnplacedOffer
                    offer={data?.findSingleOffer}
                    remaining={showingFacOffer}
                  />
                ) : (
                  <PlaceOffer
                    disabled={
                      !(
                        showingFacOffer <
                        data?.findSingleOffer?.facultative_offer
                      )
                    }
                    offer={data?.findSingleOffer}
                    remaining={showingFacOffer}
                  />
                )}
              </div>

              <ul className="nav nav-tabs nav-tabs-custom">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    All
                  </a>
                </li>
              </ul>

              <div className="mt-4">
                <Datatable columns={reinsurersColumns} data={reinsurers} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add percentage Modal */}
      <Modal
        centered
        show={addPercentageModal}
        onHide={() => setAddPercentageModal(!addPercentageModal)}
      >
        <Modal.Header closeButton>
          {!isEdit ? "Add" : "Edit"} percentage to{" "}
          {selectedReinsurer?.reinsurer.re_company_name}
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="">Percentage</label>
            <input
              type="number"
              value={percentage}
              onChange={handleChangePercentageValue}
              className="form-control"
              placeholder="Percentage"
            />
            {percentageErrorEntry && (
              <p className="text-danger">
                You have provided a value more than available
              </p>
            )}
          </div>
          <div className="form-group">
            <input
              onClick={AddPercentage}
              className="form-control btn btn-primary"
              value={selectedReinsurer}
              type="submit"
              value={`${!isEdit ? "Add" : "Edit"} percentage`}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReinsurerListing;
