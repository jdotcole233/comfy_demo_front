/* eslint-disable no-throw-literal */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { Drawer, BottomDrawer } from "../../../components";

import AddReceiveablePaymentForm from "./AddReceiveablePaymentForm";
import ClaimsListing from "./ClaimsListing";
import EditReceivablePaymentForReinsurer from "./EditReceivablePaymentForReinsurer";

const ReceiveablePayments = ({
  isProp = false,
  treaty = {},
  insurer = {},
  refetch,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showMakePaymentDrawer, setShowMakePaymentDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return isProp ? null : (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-sm mr-1 btn-danger"
      >
        Claim payments
      </button>
      {/* <DropdownButton
        className="mr-1"
        variant="danger"
        size="sm"
        as={ButtonGroup}
        id="dropdown-basic-button"
        title=""
      >
        <Dropdown.Item>View Payments</Dropdown.Item>
        <Dropdown.Item onClick={() => setShowMakePaymentDrawer(true)}>
          Make Payments
        </Dropdown.Item>
      </DropdownButton> */}

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

      <Drawer
        isvisible={showMakePaymentDrawer}
        toggle={() => setShowMakePaymentDrawer(false)}
        width="40%"
      >
        <AddReceiveablePaymentForm
          toggleAddpayment={() => setShowMakePaymentDrawer(false)}
          treaty={treaty}
          insurer={insurer}
          // claim={}
        />
      </Drawer>

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
