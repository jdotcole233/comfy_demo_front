/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { BottomDrawer } from "../../../components";
import ClaimsListing from "./ClaimsListing";
import EditReceivablePaymentForReinsurer from "./EditReceivablePaymentForReinsurer";

const ReceiveablePayments = ({
  isProp = false,
  treaty = {},
  insurer = {},
  refetch,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return isProp ? null : (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-sm mr-1 btn-danger"
      >
        Claim payments
      </button>

      <Modal
        centered
        size="lg"
        show={selectedPayment}
        onHide={() => setSelectedPayment(null)}
      >
        <EditReceivablePaymentForReinsurer
          payment={selectedPayment}
          treaty={treaty}
          insurer_id={insurer?.insurer_id}
        />
      </Modal>

      <BottomDrawer
        height="90%"
        isvisible={showModal}
        toggle={() => setShowModal(false)}
      >
        <ClaimsListing
          setShow={setShowModal}
          claims={treaty?.treaty_claims}
          treaty={treaty}
        />
      </BottomDrawer>
    </>
  );
};

export default ReceiveablePayments;
