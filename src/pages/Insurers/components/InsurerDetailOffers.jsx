import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import OfferButtons from "./Offerbuttons";
import f_dat from "../dummy";
import _ from "lodash";
import OfferListing from "../OfferListing";
import { useAuth } from "../../../context/AuthContext";

// import { useInsurerProps } from "../providers/InsurerProvider";
// const retrocedentFilter = (offer) => offer && _.isNull(offer.offer_retrocedent);

const InsurerDetailOffers = ({
  insurer,
  loadMore,
  fetching,
  insurer_offers,
}) => {
  const { type } = useSelector((state) => state.insurer);
  const { user } = useAuth()
  const offers = useMemo(() => {
    const list = [];
    if (insurer) {
      insurer.insurer.offers.map((offer, i) => {
        const hasEndorsement = _.last(offer.offer_endorsements);
        // const expected =
        //   parseFloat(offer.fac_premium) - parseFloat(offer.commission_amount);
        const payments_made = offer?.offer_payment?.reduce((prev, currVal) => {
          const payment_value = currVal.payment_amount || 0;
          const payment_details = JSON.parse(currVal.payment_details ?? "{}");
          return (
            prev +
            payment_value / parseFloat(payment_details?.conversion?.rate ?? 1)
          );
        }, 0.0);

        const endorsementAddon = hasEndorsement
          ? parseFloat(hasEndorsement?.fac_premium) -
          parseFloat(hasEndorsement?.commission_amount)
          : 0;
        const expected = hasEndorsement
          ? endorsementAddon
          : parseFloat(offer.fac_premium) -
          parseFloat(offer?.commission_amount) +
          endorsementAddon;

        const row = {
          name: offer.offer_detail?.policy_number,
          currency: offer?.offer_detail?.currency,
          outstanding: (expected - payments_made).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          expected_premium: expected.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          insured: offer.offer_detail?.insured_by,
          sum_insured: ` ${offer.sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          f_sum_insured: ` ${offer.fac_sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
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
          comission: offer.commission,
          cob: offer.classofbusiness.business_name,
          offer_date: offer.created_at,
          status: offer.payment_status,
          offer_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.offer_status === "OPEN"
                ? "primary"
                : offer.offer_status === "PENDING"
                  ? "danger"
                  : "success"
                } font-size-11`}
            >
              {offer.offer_status}
            </span>
          ),
          clearance_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.clearance_status === "UNCLEARED"
                ? "danger"
                : "success"
                } font-size-11`}
            >
              {offer.clearance_status}
            </span>
          ),
          payment_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.payment_status === "PARTPAYMENT"
                ? "primary"
                : offer.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
                } font-size-11`}
            >
              {offer.payment_status}
            </span>
          ),
          salary: (
            <OfferButtons
              insurer={insurer}
              state={{ insurer_id: insurer.insurer_id }}
              offer={offer}
            />
          ),
        };
        list.push(row);
        return offer;
      });
    }
    return list;
  }, [insurer]);

  const insurers_all_offers = useMemo(() => {
    if (insurer_offers) {
      return insurer_offers?.insurer_all_offers?.offers.map((offer, i) => {
        const expected =
          parseFloat(offer.fac_premium) - parseFloat(offer.commission_amount);
        const payments_made = offer?.offer_payment?.reduce((prev, currVal) => {
          const payment_value = currVal.payment_amount || 0;
          return prev + payment_value;
        }, 0.0);
        return {
          name: offer.offer_detail?.policy_number,
          currency: offer?.offer_detail?.currency,
          outstanding: (expected - payments_made).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          expected_premium: expected.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          insured: offer.offer_detail?.insured_by,
          sum_insured: ` ${offer.sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          f_sum_insured: ` ${offer.fac_sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
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
          comission: offer.commission,
          cob: offer.classofbusiness.business_name,
          offer_date: offer.created_at,
          status: offer.payment_status,
          offer_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.offer_status === "OPEN"
                ? "primary"
                : offer.offer_status === "PENDING"
                  ? "danger"
                  : "success"
                } font-size-11`}
            >
              {offer.offer_status}
            </span>
          ),
          clearance_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.clearance_status === "UNCLEARED"
                ? "danger"
                : "success"
                } font-size-11`}
            >
              {offer.clearance_status}
            </span>
          ),
          payment_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.payment_status === "PARTPAYMENT"
                ? "primary"
                : offer.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
                } font-size-11`}
            >
              {offer.payment_status}
            </span>
          ),
          salary: (
            <OfferButtons
              insurer={insurer}
              state={{ insurer_id: insurer?.insurer_id }}
              offer={offer}
            />
          ),
        };
      });
    }
    return [];
  }, [insurer_offers, insurer]);

  const insurers_all_offers_total = useMemo(
    () => insurer_offers?.insurer_all_offers?.total,
    [insurer_offers]
  );

  return type === "Fac" ? (
    <div className="">
      <OfferListing
        path="/admin/insurers-details"
        title={`Offers`}
        setInputOffer={1}
        insurer_id={insurer?.insurer?.insurer_id}
        fetching={fetching}
        handleLoadMore={loadMore}
        recent={offers}
        all={insurers_all_offers}
        columns={user?.user_role?.position === "Finance Executive" ? f_dat.columns : f_dat.columns?.filter(el => el.field !== "clearance_status")}
        allTotal={insurers_all_offers_total}
      />
    </div>
  ) : null;
};

export default InsurerDetailOffers;
