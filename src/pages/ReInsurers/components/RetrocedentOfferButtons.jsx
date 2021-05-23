import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Datatable, Drawer } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import ViewInsurerOffer from "../../Insurers/ViewInsurerOffer";
import { Modal } from "react-bootstrap";
import { paymentsColumns } from "../../Insurers/dummy";
import DistributePayment from "./DistributePayment";

const RetrocedentOfferButtons = ({
  offer,
  data,
  skip = 0,
  type = "recent",
}) => {
  const { state: ctx } = useContext(AuthContext);
  const [viewOffer, setViewOffer] = useState(false);
  const [paymentsModal, setPaymentsModal] = useState(false);
  const [distributePaymentsDrawer, setDistributePaymentsDrawer] =
    useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const finance = true;
  // ["Finance Executive"].includes(ctx?.user?.position) &&
  // offer?.offer_status === "CLOSED";

  useEffect(() => {
    if (offer) {
      //if offer payment szie is > 0
      if (offer.offer_participant.length > 0) {
        setShowBtn(!0);
        //if offer payment last index of payment details is == null
        if (offer.offer_participant[0].offer_participant_payment.length > 0) {
          if (
            offer.offer_participant[0].offer_participant_payment[
              offer.offer_participant[offer.offer_participant.length - 1]
                .offer_participant_payment.length - 1
            ].paid_details === ""
          ) {
            setShowBtn(!!0);
          } else {
            setShowBtn(!0);
          }
        }
      }
    }
  }, [offer]);

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
          <button
            onClick={() => setDistributePaymentsDrawer(true)}
            className="btn btn-sm btn-success m-1"
          >
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

      <Drawer
        width="50%"
        isvisible={distributePaymentsDrawer}
        toggle={() => setDistributePaymentsDrawer(!distributePaymentsDrawer)}
      >
        <DistributePayment
          data={offer}
          showFlag={showBtn}
          insurer_id={offer?.offer_retrocedent?.reinsurer?.reinsurer_id}
          toggle={() => setDistributePaymentsDrawer(!distributePaymentsDrawer)}
        />
      </Drawer>
    </div>
  );
};

export default RetrocedentOfferButtons;
