import React from "react";
import { ReinstatmentOffers_reinstate_offers_offers } from "../../graphql/queries/__generated__/ReinstatmentOffers";
import _ from "lodash";
import OfferButton from "./components/OfferButton";

export const generateOffers = (
  offers: ReinstatmentOffers_reinstate_offers_offers[] | null | undefined
) => {
  const formatted = offers?.map((offer) => {
    const payment_type_key = offer?.offer_detail?.payment_type
      ? Object.keys(JSON.parse(offer?.offer_detail?.payment_type))[0]
      : "NA";
    const payment_type_values = offer?.offer_detail?.payment_type
      ? Object.values(JSON.parse(offer?.offer_detail?.payment_type))[0]
      : "NA";
    return {
      // ...offer,
      policy_number: offer.offer_detail?.policy_number,
      participants: offer?.offer_participant?.length,
      payment_type: offer?.offer_detail?.payment_type
        ? payment_type_key === "instalment"
          ? `Instalment ${payment_type_values}`
          : _.upperFirst(payment_type_key.split("_").join(" "))
        : "NA",
      insured: offer.offer_detail?.insured_by,
      sum_insured:
        offer.offer_detail?.currency +
        " " +
        offer.sum_insured.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }),
      insurance_company: offer.insurer?.insurer_company_name,
      premium:
        offer.offer_detail?.currency +
        " " +
        offer.premium.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      cob: offer?.classofbusiness?.business_name,
      offer_date: new Date(offer.created_at).toDateString(),
      approval_status: (
        <span
          style={{ letterSpacing: 3 }}
          className={`badge badge-${
            offer.approval_status === "UNAPPROVED"
              ? "warning"
              : offer.approval_status === "APPROVED"
              ? "success"
              : "warning"
          } font-size-11`}
        >
          {offer.approval_status}
        </span>
      ),
      actions: <OfferButton offer={offer} />,
    };
  });
  return formatted;
};
