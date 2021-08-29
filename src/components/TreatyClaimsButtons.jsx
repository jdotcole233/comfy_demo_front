/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useMemo, useState } from "react";
import {
  Datatable,
  Drawer,
  Modal,
  treatyClaimsClaimsColumns,
  treatyClaimsParticipantsColumn,
} from ".";
import ClaimRequestForm from "../pages/TreatyClaims/ClaimRequestForm";
import MakeClaimForm from "../pages/TreatyClaims/MakeClaimForm";
import moment from "moment";
import EditTreatyClaimForm from "./EditTreatyClaimForm";
import swal from "sweetalert";
import { useMutation } from "react-apollo";
import { DELETE_TREATY_CLAIM, TREATY_CLAIMS } from "../graphql/queries/treaty";
import PreviewNotes from "../pages/TreatyClaims/PreviewNotes";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import AutomateMakeTreatyClaimForm from "../pages/TreatyClaims/AutomateMakeTreatyClaimForm";
import _ from "lodash";

const TreatyClaimsButtons = ({ treaty }) => {
  const [viewClaims, setViewClaims] = useState(false);
  const [makeClaim, setMakeClaim] = useState(false);
  const [openAutomateClaimDrawer, setOpenAutomateClaimDrawer] = useState(false);
  const [viewParticipants, setViewParticipants] = useState(false);
  const [claimRequest, setClaimRequest] = useState(false);
  const [viewNotes, setViewNotes] = useState(false);
  // const [sendNotes, setSendNotes] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [editClaim, setEditClaim] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const showNotes = (participant) => {
    setSelectedParticipant(participant);
    setViewParticipants(true);
    setViewNotes(true);
  };

  const openClaimRequest = (Participant) => {
    setSelectedParticipant(Participant);
    setViewParticipants((prev) => !prev);
    setClaimRequest((prev) => !prev);
  };

  const [remove] = useMutation(DELETE_TREATY_CLAIM, {
    refetchQueries: [{ query: TREATY_CLAIMS }],
  });

  const participants = useMemo(() => {
    if (treaty && treaty?.treaty_participants) {
      return treaty?.treaty_participants?.map((_el) => ({
        ..._el,
        ..._el.reinsurer,
        actions: !_.isEmpty(_el.treaty_claims) ? (
          <>
            {/* Button to view the modal for all notes attributed to this Participant on the treaty */}
            <button
              onClick={() => showNotes(_el)}
              className="btn btn-info btn-sm m-1"
            >
              Preview notes
            </button>
            {/* Button to view Drawer to make claim */}
            <button
              onClick={() => openClaimRequest(_el)}
              className="btn btn-success btn-sm m-1"
            >
              Send notes
            </button>
            {/* Claim Request Button */}
          </>
        ) : (
          "No claims Made"
        ),
      }));
    }
    return [];
  }, [treaty]);

  const layeredParticipants = useMemo(() => {
    if (participants) {
      return _.mapValues(_.groupBy(participants, "layer_number"), (list) =>
        list.map((item) => _.omit(item, "layer_number"))
      );
    }
    return {};
  }, [participants]);

  const actualLayers = Object.keys(layeredParticipants);

  const changeLayer = (key) => {
    setCurrentIndex(key);
  };

  const claims = useMemo(() => {
    if (treaty && treaty?.treaty_claims) {
      return treaty?.treaty_claims?.map((el) => ({
        ...el,
        actions: (
          <>
            <button
              onClick={() => openEditClaimModal(el)}
              className="btn btn-sm btn-square text-primary"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onClickDeleteBUtton(el?.treaty_claim_id)}
              className="btn btn-sm btn-square text-danger btn-link"
            >
              <FaTrash />
            </button>
          </>
        ),
      }));
    }
    return [];
  }, [treaty]);

  const layeredClaims = useMemo(() => {
    if (claims) {
      return _.groupBy(claims, "layer_number");
    }
    return {};
  }, [claims]);

  // console.log("Layered Claims", layeredClaims);

  const onClickDeleteBUtton = (id) => {
    swal({
      icon: "warning",
      title: "Delete claim ?",
      text: "This action will delete the said claim",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      remove({
        variables: { id },
      })
        .then((res) => {
          swal("Success", "Claim deleted successfully", "success");
        })
        .catch((err) => {
          swal("Error", "Claim could not delete successfully", "error");
        });
    });
  };

  const openEditClaimModal = (claim) => {
    setSelectedClaim(claim);
    setEditClaim(true);
  };

  return (
    <>
      {/* Button to view the modal for all claims made on treaty */}
      {_.isEmpty(treaty?.treaty_claims) ? null : (
        <button
          onClick={() => setViewClaims(true)}
          className="btn btn-danger btn-sm m-1"
        >
          View claims
        </button>
      )}
      {/* Button to view Drawer to make claim */}
      <DropdownButton
        className=""
        variant="primary"
        size="sm"
        as={ButtonGroup}
        id="dropdown-basic-button"
        title="Make claim"
      >
        <Dropdown.Item onClick={() => setMakeClaim(true)}>Manual</Dropdown.Item>
        <Dropdown.Item onClick={() => setOpenAutomateClaimDrawer(true)}>
          Automate
        </Dropdown.Item>
      </DropdownButton>
      {/* Button to view all participants */}
      <button
        onClick={() => setViewParticipants(true)}
        className="btn btn-info mt-1 btn-sm m-1"
      >
        Participants
      </button>
      {/* Button to view Drawer for claim request */}

      {/* Modal For edit claim */}

      <Modal size="lg" show={editClaim} onHide={() => setEditClaim(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Claim</Modal.Title>
        </Modal.Header>
        <EditTreatyClaimForm
          treaty={treaty}
          setShow={setEditClaim}
          data={selectedClaim}
        />
      </Modal>

      {/* Modal for participants */}
      <Modal
        centered
        size="xl"
        show={viewParticipants}
        onHide={() => {
          setCurrentIndex(1);
          setViewParticipants(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            View Participants for {treaty?.treaty_reference}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Details treaty={treaty} />
          <ul className="nav nav-tabs nav-tabs-custom mb-2">
            {actualLayers.map((_, key) => (
              <li
                key={key}
                onClick={() => changeLayer(parseInt(_))}
                className="nav-item btn"
              >
                <div
                  className={`nav-link ${
                    parseInt(_) === currentIndex ? "active" : ""
                  }`}
                  href="#"
                >{`Layer ${_}`}</div>
              </li>
            ))}

            {treaty?.treaty_program?.treaty_type === "PROPORTIONAL" && (
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  All
                </a>
              </li>
            )}
          </ul>
          <Datatable
            entries={5}
            columns={treatyClaimsParticipantsColumn}
            data={layeredParticipants[`${currentIndex}`]}
          />
        </Modal.Body>
      </Modal>

      {/* Modal for view Claims */}
      <Modal
        centered
        size="xl"
        show={viewClaims}
        onHide={() => {
          setCurrentIndex(1);
          setViewClaims(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Claims for {treaty?.treaty_reference}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Details treaty={treaty} />
          <ul className="nav nav-tabs nav-tabs-custom mb-2">
            {actualLayers.map((_, key) => (
              <li
                key={key}
                onClick={() => changeLayer(parseInt(_))}
                className="nav-item btn"
              >
                <div
                  className={`nav-link ${
                    parseInt(_) === currentIndex ? "active" : ""
                  }`}
                  href="#"
                >{`Layer ${_}`}</div>
              </li>
            ))}
          </ul>
          <Datatable
            entries={5}
            columns={treatyClaimsClaimsColumns}
            data={layeredClaims[`${currentIndex}`]}
          />
        </Modal.Body>
      </Modal>

      {/* Drawer for Make Claim */}
      <Drawer
        width="40%"
        isvisible={makeClaim}
        toggle={() => setMakeClaim(false)}
      >
        <MakeClaimForm details={treaty} setShow={setMakeClaim} />
      </Drawer>

      {/* Drawer for claim request */}
      <Drawer
        width="40%"
        isvisible={claimRequest}
        toggle={() => setClaimRequest(false)}
      >
        {claimRequest && (
          <ClaimRequestForm
            participant={selectedParticipant}
            claims={selectedParticipant?.treaty_claims}
            offer={treaty}
          />
        )}
      </Drawer>

      {/* Drawer For Preview Notes */}
      <Drawer
        isvisible={viewNotes}
        width="50%"
        toggle={() => setViewNotes(false)}
      >
        <PreviewNotes participant={selectedParticipant} treaty={treaty} />
      </Drawer>

      {/* Drawer For Automate */}
      <Drawer
        isvisible={openAutomateClaimDrawer}
        width="40%"
        toggle={() => setOpenAutomateClaimDrawer(false)}
      >
        <AutomateMakeTreatyClaimForm
          treaty={treaty}
          setShow={setOpenAutomateClaimDrawer}
        />
      </Drawer>
    </>
  );
};

export default TreatyClaimsButtons;

const Details = ({ treaty }) => (
  <div className="">
    <p style={{ lineHeight: 0, fontSize: 16, fontVariant: "all-small-caps" }}>
      Treaty: {treaty?.treaty_program?.treaty_name}
    </p>
    <p style={{ lineHeight: 0, fontSize: 16, fontVariant: "all-small-caps" }}>
      Reinsured: {treaty?.insurer?.insurer_company_name}
    </p>
    <p style={{ lineHeight: 0, fontSize: 16, fontVariant: "all-small-caps" }}>
      Period:{" "}
      {`${moment(treaty?.treaty_deduction?.treaty_period_from).format(
        "DD-MMM, YY"
      )} to ${moment(treaty?.treaty_deduction?.treaty_period_to).format(
        "DD-MMM, YY"
      )}`}
    </p>
  </div>
);
