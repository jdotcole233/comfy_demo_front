import React from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

export const calculateFacOffer = ({offer, setFac_offer, setTest_offer}) => {
  if (!offer) return 0;
  const total = offer?.offer_participant?.reduce(
    (pr, cr) => parseFloat(pr) + parseFloat(cr?.offer_participant_percentage),
    0
  );
  setFac_offer(total);
  setTest_offer(total);
};

export const generateParticipants = ({
  offer,
  setSelectedReinsurer,
  setshowCreditNotePreview,
  setViewOffer,
  setShowSendClosingSlip,
  handleShowUpdateModal,
}) => {
  if (!offer) return {rows: [], participants: [], downloadLink: ''};
  const rows = offer.offer_participant.map((reinsurer) => ({
    ...reinsurer,
    ...reinsurer.reinsurer,
    amount: `${offer.offer_detail.currency} ${reinsurer.offer_amount}`,
    actions: (
      <DropdownButton
        variant="danger"
        size="sm"
        as={ButtonGroup}
        id="dropdown-basic-button"
        title="Generate Credit Note"
      >
        <Dropdown.Item
          onClick={() => {
            setSelectedReinsurer(reinsurer);
            setshowCreditNotePreview((s) => !s);
          }}
        >
          Preview
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSelectedReinsurer(reinsurer);
            setViewOffer((s) => !s);
            setShowSendClosingSlip((s) => !s);
          }}
        >
          Send
        </Dropdown.Item>
      </DropdownButton>
    ),
  }));
  const participants = offer.offer_participant.map((reinsurer) => ({
    ...reinsurer,
    ...reinsurer.reinsurer,
    actions: (
      <button
        onClick={() => handleShowUpdateModal(reinsurer)}
        className="btn btn-primary w-md btn-sm"
      >
        update
      </button>
    ),
  }));

  const ids = offer.offer_participant.map(
    (participant) => participant.reinsurer.reinsurer_id
  );
  const parsedData = {[`${offer?.offer_id}`]: ids};
  const downloadLink = btoa(JSON.stringify(parsedData));

  return {rows, participants, downloadLink};
};
