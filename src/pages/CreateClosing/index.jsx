/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo, useMemo } from "react";
import { Loader } from "../../components";
import { useQuery } from "@apollo/client";
import { ALLOFFERS, OFFERS } from "../../graphql/queries";
import { columns } from "./columns";
import { generateClosingOffers } from "./actions.js";
import OfferOverView from "./OfferOverView";
import OfferListing from "./OfferListing";
import Header from "./Header";

function ClosingOffer() {
  const [offerOverview, setOfferOverview] = useState(null);
  const [skip] = useState(0);

  const { data: offers, loading } = useQuery(OFFERS, {
    variables: {
      offer_status: ["CLOSED"],
    },
    fetchPolicy: "network-only",
    // pollInterval: 1000
  });

  const {
    data: alloffers,
    fetchMore,
    loading: fetching,
  } = useQuery(ALLOFFERS, {
    variables: {
      offer_status: ["CLOSED"],
      skip,
    },
    fetchPolicy: "cache-and-network",
  });

  const allTotal = useMemo(() => alloffers?.offers_all?.total, [alloffers]);

  useMemo(() => {
    if (offers) {
      setOfferOverview(JSON.parse(offers.offerOverview).offer_overview);
    }
  }, [offers]);

  const closedOffers = useMemo(
    () =>
      generateClosingOffers({
        arr: offers?.offers,
      }),
    [offers]
  );

  const allClosedOffers = useMemo(
    () =>
      generateClosingOffers({
        arr: alloffers?.offers_all,
      }),
    [alloffers]
  );

  const handleLoadMore = (skip) => {
    fetchMore({
      variables: {
        offer_status: ["CLOSED"],
        skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        fetchMoreResult.offers_all.offers = [
          ...prev.offers_all.offers,
          ...fetchMoreResult.offers_all.offers,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && offers && (
        <div className="page-content">
          <Header closedOffers={{ length: allTotal }} />

          <OfferOverView offerOverview={offerOverview} />

          <OfferListing
            path="/admin/create-closing"
            title="Closed Offers"
            recent={closedOffers}
            all={allClosedOffers}
            handleLoadMore={handleLoadMore}
            fetching={fetching}
            allTotal={allTotal}
            setInputOffer={null}
            columns={columns}
          />
        </div>
      )}
    </>
  );
}

export default memo(ClosingOffer);
