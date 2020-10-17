/* eslint-disable react/jsx-no-target-blank */
import React, {Fragment} from 'react';
import {DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
import {BASE_URL_LOCAL} from '../../graphql';
import OfferButtons from './components/OfferButtons';
export const generateClosingOffers = ({arr}) => {
  if (!arr) return [];
  const list = [];
  arr.offers.map((offer) => {
    const row = {
      policy_number: offer.offer_detail?.policy_number,
      insured: offer.offer_detail?.insured_by,
      sum_insured:
        offer.offer_detail?.currency +
        ' ' +
        offer.sum_insured.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }),
      insurance_company: offer.insurer.insurer_company_name,
      premium:
        offer.offer_detail?.currency +
        ' ' +
        offer.premium.toLocaleString(undefined, {maximumFractionDigits: 2}),
      participants: offer.offer_participant.filter(
        (el) => el.offer_participant_percentage !== 0
      ).length,
      cob: offer.classofbusiness.business_name,
      offer_date: new Date(offer.created_at).toDateString(),
      approval_status: (
        <span
          style={{letterSpacing: 3}}
          className={`badge badge-${
            offer.approval_status === 'UNAPPROVED'
              ? 'warning'
              : offer.approval_status === 'APPROVED'
              ? 'success'
              : 'warning'
          } font-size-11`}
        >
          {offer.approval_status}
        </span>
      ),
      actions: <OfferButtons offer={offer} />,
    };
    list.push(row);
    return row;
  });

  return list;
};

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
  const rows = offer.offer_participant
    .filter((el) => el.offer_participant_percentage !== 0)
    .map((reinsurer) => ({
      ...reinsurer,
      ...reinsurer.reinsurer,
      amount: `${offer.offer_detail.currency} ${reinsurer.offer_amount}`,
      actions: (
        <Fragment>
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
            {offer?.approval_status === 'APPROVED' && (
              <Dropdown.Item
                onClick={() => {
                  setSelectedReinsurer(reinsurer);
                  setViewOffer((s) => !s);
                  setShowSendClosingSlip((s) => !s);
                }}
              >
                Send
              </Dropdown.Item>
            )}
          </DropdownButton>
          {reinsurer?.reinsurer?.reinsurer_address?.country !== 'Ghana' && (
            <a
              target="_blank"
              href={`${BASE_URL_LOCAL}/nic_form/${btoa(
                JSON.stringify({
                  offer_id: offer?.offer_id,
                  reinsurer_id: reinsurer?.reinsurer.reinsurer_id,
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
