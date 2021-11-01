/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext } from "react";
import { Loader } from "../../components";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SINGLE_OFFER } from "../../graphql/queries";
import { AuthContext } from "../../context/AuthContext";
import OfferDetails from "./components/OfferDetails";
import ReinsurerListing from "./components/ReinsurerListing";
import AssociateListing from "./components/AssociateListing";
import OfferDescriptionAndOptions from "./components/OfferDescriptionAndOptions";
import ViewOfferHeader from "./components/VewOfferHeader";

function ViewOffer() {
  const {
    state: { user },
  } = useContext(AuthContext);
  const history = useHistory();
  const { state } = useLocation();

  const { data, loading, startPolling, stopPolling } = useQuery(SINGLE_OFFER, {
    variables: {
      offer_id: state?.offer_id,
    },
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  useEffect(() => {
    if (!state) {
      history.push("/admin/create-slip");
    }
  }, [state]);

  const myStartPolling = () => startPolling(1000);

  useEffect(() => {
    window.addEventListener("focus", myStartPolling);
    window.addEventListener("blur", stopPolling);

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", startPolling);
      window.removeEventListener("blur", stopPolling);
    };
  });

  if (loading) {
    return <Loader />;
  }

  if (!loading && data?.findSingleOffer?.offer_status === "CLOSED")
    return <Redirect to="/admin/create-slip" />;

  return (
    <div className="page-content">
      <div className="container-fluid">
        <ViewOfferHeader data={data} />

        <div className="row">
          <OfferDetails data={data} />
          <OfferDescriptionAndOptions data={data} state={state} />
        </div>
        <ReinsurerListing data={data} state={state} user={user} />
        <AssociateListing data={data} state={state} user={user} />
      </div>
    </div>
  );
}

export default ViewOffer;
