import React from "react";
import { Loader, PageHeader } from "../../components";
import Overview from "./Overview";
import { useTreatyClaimsProps } from "./Providers/TreatyClaimsProvider";
import TreatyClaimsListing from "./TreatyClaimsListing";

function TreatyClaims() {
  const { loading } = useTreatyClaimsProps();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <PageHeader name="Treaty Claims" />
      <Overview />
      <TreatyClaimsListing />
    </div>
  );
}

export default TreatyClaims;
