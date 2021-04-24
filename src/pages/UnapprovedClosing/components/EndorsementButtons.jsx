/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useQuery } from "react-apollo";
import { GET_ENDORSEMENT_PARTICIPATION } from "../../../graphql/queries";
import { Modal } from "react-bootstrap";
import { Drawer, Datatable } from "../../../components";
import { calculateFacOffer, generateEndorsementParticipants } from "../actions";
import { creditNotes } from "../../CreateClosing/columns";
import EndorsementCoverNote from "../../CreateClosing/EndorsementPreviews/EndorsementCoverNote";
import PreviewDebitNote from "../../CreateClosing/EndorsementPreviews/EndorsementDebitNote";
import PreviewCreditNote from "../../CreateClosing/EndorsementPreviews/EndorsementCreditNote";
import ContractChanges from "../../CreateClosing/EndorsementPreviews/ParticipantCoverNote";
import SendClosngSlip from "../../CreateClosing/SendClosingSlip";
import EndorsementApproval from "../EndorsementApproval";

const EndorsementButtons = ({ offer, endorsement }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showCoverNotePreview, setShowCoverNotePreview] = useState(false);
  const [showCoverNoteMail, setshowCoverNoteMail] = useState(false);
  const [showDebitNotePreview, setshowDebitNotePreview] = useState(false);
  const [showCreditNotePreview, setshowCreditNotePreview] = useState(false);
  const [viewOffer, setViewOffer] = useState(false);
  const [selectedReinsurer, setSelectedReinsurer] = useState(null);
  const [showSendClosingSlip, setShowSendClosingSlip] = useState(false);
  const [, setShowUpdateReinsurerPercentage] = useState(false);
  const [, setPercentageErrorEntry] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [fac_offer, setFac_offer] = useState(0);
  const [test_offer, setTest_offer] = useState(0);
  const [showContractChnages, setShowContractChnages] = useState(false);

  const { data: _participations } = useQuery(GET_ENDORSEMENT_PARTICIPATION, {
    variables: {
      id: endorsement?.offer_endorsement_id,
    },
  });

  const handlePreviewCoverNote = useCallback((offer) => {
    setSelectedOffer(offer);
    setShowCoverNotePreview((s) => !s);
  }, []);
  const handlePreviewDebitNote = useCallback((offer) => {
    setSelectedOffer(offer);
    setshowDebitNotePreview(!showDebitNotePreview);
  }, []);

  const handleApprovalDrawer = useCallback((offer) => {
    setSelectedOffer(offer);
    setshowCoverNoteMail(!showCoverNoteMail);
  }, []);

  const handleShowPayments = useCallback((offer) => {
    setSelectedOffer(offer);
    setViewOffer((c) => !c);
  }, []);

  const handleShowUpdateModal = useCallback((reinsurer) => {
    setSelectedReinsurer(reinsurer);
    setShowUpdateReinsurerPercentage(true);
  }, []);

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

  const { rows } = useMemo(
    () =>
      generateEndorsementParticipants({
        offer: offer,
        _participants: _participations?.readParticipationsForEndorsement
          ? JSON.parse(_participations?.readParticipationsForEndorsement)
          : [],
        setSelectedReinsurer,
        setShowSendClosingSlip,
        setViewOffer,
        setshowCreditNotePreview,
        handleShowUpdateModal,
        setShowContractChanges: setShowContractChnages,
      }),
    [selectedOffer]
  );

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
          <Dropdown.Item onClick={() => handlePreviewCoverNote(endorsement)}>
            Preview Contract Changes
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlePreviewDebitNote(endorsement)}>
            Preview Debit Note
          </Dropdown.Item>
        </DropdownButton>

        <button
          onClick={() => handleShowPayments(endorsement)}
          className="btn btn-sm w-md btn-info mb-1 mr-1"
        >
          Credit Notes
        </button>
        <button
          onClick={() => handleApprovalDrawer(endorsement)}
          className="btn btn-sm w-md btn-success mb-2 mr-1"
        >
          Approve
        </button>
      </>

      {/* Preview Cover note */}
      <Drawer
        width="50%"
        isvisible={showCoverNotePreview}
        toggle={() => setShowCoverNotePreview(!showCoverNotePreview)}
      >
        {showCoverNotePreview && (
          <EndorsementCoverNote
            offer={selectedOffer?.offer}
            endorsement={selectedOffer}
          />
        )}
      </Drawer>
      {/* Send debit and credit  Note */}
      <Drawer
        width="40%"
        isvisible={showCoverNoteMail}
        toggle={() => setshowCoverNoteMail(!showCoverNoteMail)}
      >
        <EndorsementApproval
          endorsement={selectedOffer}
          setClose={setshowCoverNoteMail}
        />
      </Drawer>
      {/* Send closing slip Note */}
      <Drawer
        width="50%"
        isvisible={showSendClosingSlip}
        toggle={() => setShowSendClosingSlip(!showSendClosingSlip)}
      >
        {showSendClosingSlip && (
          <SendClosngSlip
            visible={showSendClosingSlip}
            reisnsurer={selectedReinsurer}
            offer={selectedOffer}
            toggle={() => setShowSendClosingSlip(!showSendClosingSlip)}
          />
        )}
      </Drawer>
      <Drawer
        width="50%"
        isvisible={showContractChnages}
        toggle={() => setShowContractChnages(false)}
      >
        {showContractChnages && (
          <ContractChanges
            offer={selectedOffer?.offer}
            endorsement={selectedOffer}
            reinsurer={selectedReinsurer}
            index={"Preview"}
          />
        )}
      </Drawer>
      {/* Preview Debit Note */}
      <Drawer
        width="50%"
        isvisible={showDebitNotePreview}
        toggle={() => setshowDebitNotePreview(!showDebitNotePreview)}
      >
        {showDebitNotePreview && (
          <PreviewDebitNote
            offer={selectedOffer?.offer}
            endorsement={selectedOffer}
          />
        )}
      </Drawer>

      {/* Preview Credit Note */}
      <Drawer
        width="50%"
        isvisible={showCreditNotePreview}
        toggle={() => setshowCreditNotePreview(!showCreditNotePreview)}
      >
        {showCreditNotePreview && (
          <PreviewCreditNote
            offer={selectedOffer?.offer}
            endorsement={selectedOffer}
            reinsurer={selectedReinsurer}
          />
        )}
      </Drawer>

      {/* Modal for the generate button */}

      <Modal
        centered
        show={viewOffer}
        onHide={() => setViewOffer(!viewOffer)}
        size="xl"
      >
        <Modal.Header closeButton>
          <h5>Offer Participants </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="table-responsive">
              <Datatable entries={5} columns={creditNotes} data={rows} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* / end of the modal for generate button */}
    </div>
  );
};

export default EndorsementButtons;
