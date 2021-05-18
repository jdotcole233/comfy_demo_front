/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment } from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { BASE_URL_LOCAL } from '../../graphql';
import { getValues } from '../CreateClosing/EndorsementPreviews/EndorsementCreditNote';

export const calculateFacOffer = ({ offer, setFac_offer, setTest_offer }) => {
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
  _participants,
  setSelectedReinsurer,
  setshowCreditNotePreview,
  setViewOffer,
  setShowSendClosingSlip,
  handleShowUpdateModal,
  endorsement
}) => {
  if (!offer) return { rows: [], participants: [], downloadLink: '' };
  const rows = _participants
    .filter((el) => el.offer_participant_percentage !== 0)
    .map((reinsurer) => ({
      ...reinsurer,
      ...reinsurer.reinsurer,
      amount: `${offer?.offer_detail?.currency || offer?.offer_endorsement_detail?.currency} ${reinsurer.offer_amount}`,
      actions: (
        <Fragment>
          <DropdownButton
            variant="danger"
            size="sm"
            as={ButtonGroup}
            id="dropdown-basic-button"
            title={endorsement ? "Generate Notes" : "Generate Credit Note"}
          >
            <Dropdown.Item
              onClick={() => {
                setSelectedReinsurer(reinsurer);
                setshowCreditNotePreview((s) => !s);
              }}
            >
              {endorsement ? "Preview Credit Note" : "Preview"}
            </Dropdown.Item>
            {endorsement ?
              <Dropdown.Item>
                Preview Contract Changes
              </Dropdown.Item>
              : null}
          </DropdownButton>
          {reinsurer?.reinsurer?.reinsurer_address?.country !== 'Ghana' && (
            <a
              target="_blank"
              href={`${BASE_URL_LOCAL}/nic_form/${btoa(
                JSON.stringify({
                  offer_id: offer?.offer_id,
                  reinsurer_id: reinsurer?.reinsurer?.reinsurer_id,
                })
              )}`}
              className="btn btn-sm ml-1 btn-warning w-md"
            >
              Transfer schedule
            </a>
          )}
        </Fragment>
      ),
    }));
  const participants = _participants.map((reinsurer) => ({
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

  const ids = _participants.map(
    (participant) => participant?.reinsurer?.reinsurer_id
  );
  const parsedData = { [`${offer?.offer_id}`]: ids };
  const downloadLink = btoa(JSON.stringify(parsedData));

  return { rows, participants, downloadLink };
};



export const generateEndorsementParticipants = ({
  offer,
  endorsement,
  _participants,
  setSelectedReinsurer,
  setshowCreditNotePreview,
  handleShowUpdateModal,
  setShowContractChanges
}) => {
  if (!offer) return { rows: [], participants: [], downloadLink: '' };
  const rows = _participants
    .filter((el) => el.offer_participant_percentage !== 0)
    .map((reinsurer) => ({
      ...reinsurer,
      ...reinsurer.reinsurer,
      amount: () => {
        const fac_premium =
          (parseFloat(reinsurer?.offer_participant_percentage) / 100) *
          getValues(offer, -1, "premium", endorsement?.offer_endorsement_id);

        const commission =
          (parseFloat(reinsurer?.agreed_commission) / 100) * fac_premium;

        const withholding_tax =
          (parseFloat(reinsurer?.withholding_tax) / 100) * fac_premium;

        const brokerage =
          (parseFloat(reinsurer?.agreed_brokerage_percentage) / 100) * fac_premium;

        const nic_levy = (parseFloat(reinsurer?.nic_levy) / 100) * fac_premium;

        const amt_due =
          fac_premium - (commission + withholding_tax + brokerage + nic_levy);
        return `${offer?.offer_detail?.currency || offer?.offer_endorsement_detail?.currency} ${parseFloat(amt_due).toFixed(2)}`
      },
      actions: (
        <Fragment>
          <DropdownButton
            variant="danger"
            size="sm"
            as={ButtonGroup}
            id="dropdown-basic-button"
            title="Generate Notes"
          >
            <Dropdown.Item
              onClick={() => {
                setSelectedReinsurer(reinsurer);
                setshowCreditNotePreview((s) => !s);
              }}
            >
              Preview Credit Note
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              setSelectedReinsurer(reinsurer);
              setShowContractChanges(true)
            }}>
              Preview Contract Changes
              </Dropdown.Item>

          </DropdownButton>
          {reinsurer?.reinsurer?.reinsurer_address?.country !== 'Ghana' && (
            <a
              target="_blank"
              href={`${BASE_URL_LOCAL}/nic_form_endorsement/${btoa(
                JSON.stringify({
                  offer_id: offer?.offer_id,
                  reinsurer_id: reinsurer?.reinsurer_id,
                  endorsement_id: endorsement?.offer_endorsement_id,
                })
              )}`}
              className="btn btn-sm ml-1 btn-warning w-md"
            >
              Transfer schedule
            </a>
          )}
        </Fragment>
      ),
    }));
  const participants = _participants.map((reinsurer) => ({
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

  const ids = _participants.map(
    (participant) => participant?.reinsurer?.reinsurer_id
  );
  const parsedData = { [`${offer?.offer_id}`]: ids };
  const downloadLink = btoa(JSON.stringify(parsedData));

  return { rows, participants, downloadLink };
};


