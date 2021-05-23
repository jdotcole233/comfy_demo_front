import React from "react";
import { useContext, useState } from "react";
import { Datatable, Drawer } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import ViewInsurerOffer from "../../Insurers/ViewInsurerOffer";
import { Modal } from "react-bootstrap";
import { paymentsColumns } from "../../Insurers/dummy";

const RetrocedentOfferButtons = ({
  offer,
  data,
  skip = 0,
  type = "recent",
}) => {
  const { state: ctx } = useContext(AuthContext);
  const [viewOffer, setViewOffer] = useState(false);
  const [paymentsModal, setPaymentsModal] = useState(false);

  const finance = true;
  // ["Finance Executive"].includes(ctx?.user?.position) &&
  // offer?.offer_status === "CLOSED";

  return (
    <div>
      <>
        <button
          onClick={() => setViewOffer(true)}
          className="btn btn-sm btn-primary m-1"
        >
          View Offer
        </button>
        {finance && (
          <button
            onClick={() => setPaymentsModal(true)}
            className="btn btn-sm btn-danger m-1"
          >
            Payments
          </button>
        )}
        {finance && (
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

      {/* View paymnts */}
      <Modal
        size="xl"
        show={paymentsModal}
        onHide={() => setPaymentsModal(!paymentsModal)}
      >
        <Modal.Header closeButton>Payments history</Modal.Header>
        <Modal.Body>
          <Datatable columns={paymentsColumns} data={[]} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RetrocedentOfferButtons;
