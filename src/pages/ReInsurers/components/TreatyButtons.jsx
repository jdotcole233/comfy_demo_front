import React, { Fragment, useState, useMemo, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TreatyEditPayment from "./TreatyEditPayment";
import _ from "lodash";
import NonProportionalPaymentModal from "./NonProportionalPaymentsModal";
import ProportionalPaymentsModal from "./ProportionalPaymentsModal";

const TreatyButtons = ({ treaty, _payments, reinsurer_id }) => {
  const [openPayments, setOpenPayments] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const isProp = treaty?.treaty_program?.treaty_type === "PROPORTIONAL";

  const selectPayment = useCallback(
    (payment) => {
      if (editPayment) {
        setSelectedPayment(null);
        setEditPayment(false);
      } else {
        setSelectedPayment(payment);
        setEditPayment(true);
      }
    },
    [editPayment]
  );

  const payments = useMemo(() => {
    if (treaty) {
      return _payments
        ?.filter((el) => {
          const obj = JSON.parse(el.participant_payment_details || "{}");
          return obj.payment_type;
        })
        ?.map((payment) => {
          const obj = JSON.parse(payment.participant_payment_details || "{}");
          console.log(payment);
          return {
            ...payment,
            type:
              obj?.payment_type === "Cheque"
                ? obj?.payment_type +
                  " - " +
                  obj.payment_from?.cheque_number +
                  " "
                : obj?.payment_type,
            bank_name: obj?.payment_from?.bank_name,
            beneficiary_bank: obj?.payment_to,
            payment_amount: payment?.participant_payment_amount?.toLocaleString(
              undefined,
              { maximumFractionDigits: 2 }
            ),
            created_at: payment.created_at,
            updated_at: payment.updated_at,
            section:
              payment.surpulus_uuid || payment.treaty_accountstreaty_account_id,
            actions: (
              <>
                <button
                  onClick={() => selectPayment(payment)}
                  className="btn btn-sm w-md btn-info mr-1"
                >
                  Edit
                </button>
              </>
            ),
          };
        });
    }

    return [];
  }, [_payments, selectPayment, treaty]);

  return (
    <Fragment>
      <Link
        to={{
          pathname: "/admin/treaty-programs/overview",
          state: { treaty_id: treaty?.treaty_id },
        }}
        className="btn btn-success btn-sm"
      >
        View Treaty
      </Link>
      {!_.isEmpty(payments) && (
        <button
          onClick={() => setOpenPayments(true)}
          className="btn btn-warning ml-1 btn-sm"
        >
          payments
        </button>
      )}

      <Modal
        centered
        size="xl"
        show={openPayments}
        onHide={() => setOpenPayments(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payments</Modal.Title>
        </Modal.Header>
        {isProp ? (
          <ProportionalPaymentsModal
            reinsurer_id={reinsurer_id}
            treaty={treaty}
            payments={payments}
            selectPayment={selectPayment}
          />
        ) : (
          <NonProportionalPaymentModal treaty={treaty} payments={payments} />
        )}
      </Modal>

      <Modal size="lg" show={editPayment} onHide={() => selectPayment(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payment</Modal.Title>
        </Modal.Header>
        <TreatyEditPayment
          treaty={treaty}
          payment={selectedPayment}
          setShow={setEditPayment}
        />
      </Modal>
    </Fragment>
  );
};

export default TreatyButtons;
