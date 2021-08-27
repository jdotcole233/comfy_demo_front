import React from 'react';

export const generateClaimsTable = ({
  offers,
  handleViewClaimRequest,
  handleViewClaimsModal,
  handleViewMakeClaimDrawer,
}) =>
  offers.map((offer) => ({
    // clickEvent: (e) => console.log(e.target),
    policy_number: offer.offer_detail?.policy_number,
    insured: offer.offer_detail?.insured_by,
    sum_insured:
      offer.offer_detail?.currency +
      ' ' +
      offer.sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    insurance_company: offer.insurer.insurer_company_name,
    premium:
      offer.offer_detail?.currency +
      ' ' +
      offer.premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    participants: offer.offer_participant.length,
    claim_status: (
      <span
        style={{ letterSpacing: 3 }}
        className={`badge badge-${offer.claim_status === 'CLAIMED' ? 'danger' : 'primary'
          }`}
      >
        {offer.claim_status}
      </span>
    ),
    cob: offer.classofbusiness.business_name,
    offer_date: new Date(offer.created_at).toDateString(),
    endorsements: offer?.offer_endorsements?.length ? (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="font-size-16 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    ) : (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="font-size-16 text-danger"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    ),
    actions: (
      <>
        {offer?.offer_claims?.length ? (
          <button
            onClick={() => handleViewClaimsModal(offer)}
            className="btn btn-danger btn-sm m-1"
          >
            View claims
          </button>
        ) : null}
        {offer?.payment_status !== 'UNPAID' && (
          <button
            onClick={() => handleViewMakeClaimDrawer(offer)}
            className="btn btn-primary btn-sm m-1"
          >
            Make claim
          </button>
        )}
        {offer?.payment_status !== 'UNPAID' && (
          <button
            onClick={() => handleViewClaimRequest(offer)}
            className="btn btn-success mt-1 btn-sm m-1"
          >
            Claim Request
          </button>
        )}
      </>
    ),
  }));
