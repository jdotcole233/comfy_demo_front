import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const RetrocedentOfferButtons = ({
  offer,
  data,
  skip = 0,
  type = "recent",
}) => {
  const { state: ctx } = useContext(AuthContext);
  return (
    <div>
      <>
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
    </div>
  );
};

export default RetrocedentOfferButtons;
