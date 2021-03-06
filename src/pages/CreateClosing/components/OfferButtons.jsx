/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo, useContext } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { DELETE_OFFER, ADD_PERCENTAGE } from "../../../graphql/mutattions";
import { OFFERS } from "../../../graphql/queries";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Drawer, Datatable, BottomDrawer } from "../../../components";
import {
  generateParticipants,
  calculateFacOffer,
  generateEndorsementOffers,
} from "../actions";
import { creditNotes } from "../columns";
import { BASE_URL_LOCAL } from "../../../graphql";
import PreviewCoverNote from "../PreviewCoverNote";
import PreviewDebitNote from "../PreviewDebitNote";
import PreviewCreditNote from "../PreviewCreditNote";
import SendCoverNoteMail from "../SendCoverNoteMail";
import SendClosngSlip from "../SendClosingSlip";
import { AuthContext } from "../../../context/AuthContext";
import { deleteAccessRoles } from "../../../layout/adminRoutes";
import AddEndorsement from "./AddEndorsement";
import { endorsementColumns } from "../columns";
import OfferRenewal from "./OfferRenewal";

const OfferButtons = ({ offer }) => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const history = useHistory();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showCoverNotePreview, setShowCoverNotePreview] = useState(false);
  const [showCoverNoteMail, setshowCoverNoteMail] = useState(false);
  const [showDebitNotePreview, setshowDebitNotePreview] = useState(false);
  const [showCreditNotePreview, setshowCreditNotePreview] = useState(false);
  const [showReopenOfferModal, setShowReopenOfferModal] = useState(false);
  const [viewOffer, setViewOffer] = useState(false);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const [showSendClosingSlip, setShowSendClosingSlip] = useState(false);
  const [showUpdateReinsurerPercentage, setShowUpdateReinsurerPercentage] =
    useState(false);
  const [percentageErrorEntry, setPercentageErrorEntry] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [fac_offer, setFac_offer] = useState(0);
  const [test_offer, setTest_offer] = useState(0);
  const [showEndorsement, setShowEndorsement] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const expired = useMemo(() => offer?.expiry_status === "EXPIRED", [offer]);
  const [deleteoffer] = useMutation(DELETE_OFFER, {
    refetchQueries: [
      { query: OFFERS, variables: { offer_status: ["CLOSED"] } },
    ],
  });

  const [addPercentage] = useMutation(ADD_PERCENTAGE, {
    refetchQueries: [
      { query: OFFERS, variables: { offer_status: ["CLOSED"] } },
    ],
  });

  const handlePreviewCoverNote = useCallback((offer) => {
    setSelectedOffer(offer);
    setShowCoverNotePreview((s) => !s);
  }, []);
  const handlePreviewDebitNote = useCallback((offer) => {
    setSelectedOffer(offer);
    setshowDebitNotePreview(!showDebitNotePreview);
  }, []);
  const handleReopenOffer = useCallback((offer) => {
    setSelectedOffer(offer);
    setShowReopenOfferModal((c) => !c);
  }, []);

  const handleShowSendMailDrawer = useCallback((offer) => {
    setSelectedOffer(offer);
    setshowCoverNoteMail(!showCoverNoteMail);
  }, []);

  const handleShowPayments = useCallback((offer) => {
    setSelectedOffer(offer);
    setViewOffer((c) => !c);
  }, []);

  const handleCloseReopenOffer = useCallback(() => {
    setSelectedOffer(null);
    setShowReopenOfferModal(false);
  }, []);

  const handleShowUpdateModal = useCallback((reinsurer) => {
    setSelectedReinsurer(reinsurer);
    setShowUpdateReinsurerPercentage(true);
  }, []);

  const openEndorsement = useCallback(() => {
    setOpenDrawer(true);
    // setShowEndorsement(prev => !prev);
  }, []);

  const handleDeleteOffer = (offer) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: true,
      icon: "warning",
      title: "Delete offer?",
      text: `This action will remove offer with policy number ${offer?.offer_detail?.policy_number} completely from the system`,
      buttons: ["Cancel", { text: "Agree", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      deleteoffer({
        variables: { id: offer?.offer_id },
      })
        .then((res) => {
          swal("Success", "Offer Deleted successfully", "success");
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

  const handleCloseUpdateModal = useCallback((evt) => {
    setSelectedReinsurer(null);
    setShowUpdateReinsurerPercentage(false);
  }, []);

  const handleChangePercentageValue = (evt) => {
    setPercentage(evt.target.value);
  };

  useMemo(() => {
    if (selectedReinsurer) {
      setPercentage(selectedReinsurer.offer_participant_percentage);
      setTest_offer(fac_offer - selectedReinsurer.offer_participant_percentage);
    }
  }, [selectedReinsurer]);

  useMemo(() => {
    if (parseFloat(test_offer) + parseFloat(percentage) > fac_offer) {
      setPercentageErrorEntry(true);
    } else {
      setPercentageErrorEntry(false);
    }
  }, [percentage]);

  useMemo(
    () =>
      calculateFacOffer({
        offer: selectedOffer,
        setFac_offer,
        setTest_offer,
      }),
    [selectedOffer]
  );

  const AddPercentage = (evt) => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Update ${selectedReinsurer?.reinsurer?.re_company_name}'s percentage ?`,
      text: "This action will update the initial assigned percentage",
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      addPercentage({
        variables: {
          offer_participant_id: selectedReinsurer?.offer_participant_id,
          offer_id: selectedOffer?.offer_id,
          percentage,
          reopen: true,
        },
      })
        .then((res) => {
          swal({
            icon: "success",
            title: "Success",
            text: "Offer has been reopened successfully",
            buttons: ["Stay here", { text: "Go to Reopened offer" }],
          }).then((input) => {
            if (!input) {
              setSelectedReinsurer(null);
              handleCloseUpdateModal();
              handleCloseReopenOffer();
            } else {
              history.push({
                pathname: "/admin/view-offer",
                state: { offer_id: selectedOffer?.offer_id },
              });
            }
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
    });
  };

  const { rows, participants, downloadLink } = useMemo(
    () =>
      generateParticipants({
        offer: selectedOffer,
        setSelectedReinsurer,
        setShowSendClosingSlip,
        setViewOffer,
        setshowCreditNotePreview,
        handleShowUpdateModal,
      }),
    [selectedOffer]
  );

  const handleDownloadAll = (event) => {
    swal({
      icon: "warning",
      title: `This action generates ${selectedOffer?.offer_participant.length} credit notes as a zip file.`,
      text: "Do you wish to continue ?",
      buttons: ["No", { text: "Yes" }],
    }).then((input) => {
      if (!input) throw {};
      window.open(
        `${BASE_URL_LOCAL}/generate_closing_slip_for_all/${downloadLink}`,
        "_blank"
      );
    });
  };

  return (
    <div>
      <>
        <DropdownButton
          className="mr-1 mb-1 w-md"
          size="sm"
          as={ButtonGroup}
          id="dropdown-basic-button"
          title="Generate Notes"
        >
          <Dropdown.Item onClick={() => handlePreviewCoverNote(offer)}>
            Preview Cover Note
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePreviewDebitNote(offer)}>
            Preview Debit Note
          </Dropdown.Item>
          {offer?.approval_status === "APPROVED" && (
            <Dropdown.Item onClick={() => handleShowSendMailDrawer(offer)}>
              Send
            </Dropdown.Item>
          )}
        </DropdownButton>

        <button
          onClick={() => handleShowPayments(offer)}
          className="btn btn-sm w-md btn-info mb-1 mr-1"
        >
          Credit Notes
        </button>
        <DropdownButton
          variant="warning"
          className="mr-1 mb-1 w-md"
          size="sm"
          as={ButtonGroup}
          id="dropdown-basic-button"
          title="Actions"
        >
          {!expired && (
            <Dropdown.Item onClick={() => handleReopenOffer(offer)}>
              Reopen Offer
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => setShowEndorsement((prev) => !prev)}>
            Endorsements
          </Dropdown.Item>
          {["UNPAID"].includes(offer?.payment_status) &&
            offer?.approval_status === "APPROVED" &&
            deleteAccessRoles.includes(user?.user_role?.position) &&
            !expired && (
              <Dropdown.Item onClick={() => handleDeleteOffer(offer)}>
                Delete Offer
              </Dropdown.Item>
            )}
        </DropdownButton>
        <OfferRenewal offer={offer} />
      </>

      {/* Modal for Reopen Offer */}

      <Modal
        size="xl"
        centered
        show={showReopenOfferModal}
        onHide={handleCloseReopenOffer}
      >
        <Modal.Header closeButton>Reopen offer</Modal.Header>
        <Modal.Body>
          <div className="container ">
            <div className="col-md-12 alert alert-warning">
              <p className="text-danger">
                Modification made to any reinsurer on this page will change the
                offer status to either <strong>PENDING</strong> or{" "}
                <strong>OPEN</strong>
              </p>

              <p className="text-danger">
                This action will cause offer with policy number{" "}
                {selectedOffer?.offer_detail?.policy_number} to be moved from{" "}
                <strong>CLOSING LIST</strong> to <strong>OFFER LIST</strong>
              </p>
            </div>
          </div>
          <Datatable
            entries={5}
            columns={creditNotes.filter((i) => i.label !== "Reinsurer Amount")}
            data={participants}
          />
        </Modal.Body>
      </Modal>

      {/* End of Reopen Offer */}
      {/* Modal for update Reinsurer pecentage */}
      <Modal
        size="md"
        centered
        show={showUpdateReinsurerPercentage}
        onHide={handleCloseUpdateModal}
      >
        <Modal.Header closeButton>Edit percentage</Modal.Header>
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
              disabled={percentageErrorEntry || !percentage.length}
              onClick={AddPercentage}
              className="form-control btn btn-primary"
              type="submit"
              value="Edit percentage"
            />
          </div>
        </Modal.Body>
      </Modal>

      {/* End of Modal for Reinsurer percentage */}

      {/* Preview Cover note */}
      <Drawer
        width="50%"
        isvisible={showCoverNotePreview}
        toggle={() => setShowCoverNotePreview(!showCoverNotePreview)}
      >
        <PreviewCoverNote offer={selectedOffer} />
      </Drawer>
      {/* Send debit and credit  Note */}
      <Drawer
        width="50%"
        isvisible={showCoverNoteMail}
        toggle={() => setshowCoverNoteMail(!showCoverNoteMail)}
      >
        <SendCoverNoteMail
          visible={showCoverNoteMail}
          offer={selectedOffer}
          toggle={() => setshowCoverNoteMail(!showCoverNoteMail)}
        />
      </Drawer>
      {/* Send closing slip Note */}
      <Drawer
        width="50%"
        isvisible={showSendClosingSlip}
        toggle={() => setShowSendClosingSlip(!showSendClosingSlip)}
      >
        <SendClosngSlip
          visible={showSendClosingSlip}
          reisnsurer={selectedReinsurer}
          offer={selectedOffer}
          toggle={() => setShowSendClosingSlip(!showSendClosingSlip)}
        />
      </Drawer>
      {/* Preview Debit Note */}
      <Drawer
        width="50%"
        isvisible={showDebitNotePreview}
        toggle={() => setshowDebitNotePreview(!showDebitNotePreview)}
      >
        <PreviewDebitNote offer={selectedOffer} />
      </Drawer>

      {/* Preview Credit Note */}
      <Drawer
        width="50%"
        isvisible={showCreditNotePreview}
        toggle={() => setshowCreditNotePreview(!showCreditNotePreview)}
      >
        <PreviewCreditNote
          offer={selectedOffer}
          reinsurer={selectedReinsurer}
        />
      </Drawer>

      <Drawer
        width="40%"
        isvisible={openDrawer}
        toggle={() => setOpenDrawer((prev) => !prev)}
      >
        <AddEndorsement
          offer_id={offer?.offer_id}
          toggle={() => setOpenDrawer((prev) => !prev)}
        />
      </Drawer>

      {/* Modal for the generate button */}

      <Modal
        centered
        show={viewOffer}
        onHide={() => setViewOffer(!viewOffer)}
        size="xl"
      >
        <Modal.Header closeButton>
          <h5>
            Offer Participants{" "}
            <strong>[{selectedOffer?.offer_detail?.policy_number}]</strong>
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 d-flex justify-content-end">
              {selectedOffer?.approval_status === "APPROVED" && (
                <button
                  onClick={handleDownloadAll}
                  className="btn btn-sm btn-primary w-md"
                >
                  Generate Notes
                </button>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="table-responsive">
              <Datatable entries={5} columns={creditNotes} data={rows} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* / end of the modal for generate button */}

      <BottomDrawer
        height="80%"
        isvisible={showEndorsement}
        toggle={() => setShowEndorsement((prev) => !prev)}
      >
        <div className="d-flex mt-3  justify-content-between p-4">
          <div className="d-flex flex-column w-auto">
            <fieldset style={{ borderColor: "#b8b4b4" }} className="border">
              <legend className="w-auto font-size-16 font-weight-bold">
                Offer Detail
              </legend>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Policy Number</th>
                    <td>{offer?.offer_detail?.policy_number}</td>
                    <th>Ceeding Company</th>
                    <td>{offer?.insurer?.insurer_company_name}</td>
                  </tr>
                  <tr>
                    <th>Class of Business</th>
                    <td>{offer?.classofbusiness?.business_name}</td>

                    <th>Insured</th>
                    <td>{offer?.offer_detail?.insured_by}</td>
                  </tr>
                  <tr>
                    <th>Total Premium</th>
                    <td>
                      {offer?.offer_endorsements[
                        offer?.offer_endorsements?.length - 1
                      ]?.premium?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) ||
                        offer?.premium?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                    </td>
                    <th>Status</th>
                    <td
                      className={`${
                        offer?.expiry_status === "EXPIRED"
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      {offer?.expiry_status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
          <div>
            {!expired && (
              <button
                onClick={openEndorsement}
                className="btn btn-sm btn-primary"
              >
                Add Endorsement
              </button>
            )}
          </div>
        </div>

        <div className="p-3">
          <h4>Endorsements for {offer?.offer_detail?.insured_by}</h4>
          <Datatable
            striped
            entries={5}
            data={generateEndorsementOffers({
              offer,
              endorsements: offer?.offer_endorsements || [],
            })}
            columns={endorsementColumns}
          />
        </div>
      </BottomDrawer>
    </div>
  );
};

export default OfferButtons;
