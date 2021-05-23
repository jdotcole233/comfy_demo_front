import React from "react";
import { useContext, useState } from "react";
import { Drawer } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import ViewInsurerOffer from "../../Insurers/ViewInsurerOffer";

const RetrocedentOfferButtons = ({
  offer,
  data,
  skip = 0,
  type = "recent",
}) => {
  const { state: ctx } = useContext(AuthContext);
  const [viewOffer, setViewOffer] = useState(false);
  return (
    <div>
      <>
        <button
          onClick={() => setViewOffer(true)}
          className="btn btn-sm btn-primary m-1"
        >
          View Offer
        </button>
        {["Finance Executive"].includes(ctx?.user?.position) &&
          offer?.offer_status === "CLOSED" && (
            <button onClick={() => {}} className="btn btn-sm btn-danger m-1">
              Payments
            </button>
          )}
        {["Finance Executive"].includes(ctx?.user?.position) &&
          offer?.offer_status === "CLOSED" && (
            <button onClick={() => {}} className="btn btn-sm btn-success m-1">
              Distribute Payment
            </button>
          )}
      </>

      {/* View Offer Drawer */}
      <Drawer
        width="40%"
        isvisible={viewOffer}
        toggle={() => setViewOffer(!viewOffer)}
      >
        <ViewInsurerOffer data={offer} />
      </Drawer>
    </div>
  );
};

export default RetrocedentOfferButtons;
