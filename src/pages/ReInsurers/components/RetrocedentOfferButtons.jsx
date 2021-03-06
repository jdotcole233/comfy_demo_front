/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo } from "react";
import { useContext, useState } from "react";
import { Datatable, Drawer } from "../../../components";
import { AuthContext } from "../../../context/AuthContext";
import ViewInsurerOffer from "../../Insurers/ViewInsurerOffer";
import { Modal } from "react-bootstrap";
import { paymentsColumns } from "../../Insurers/dummy";
import DistributePayment from "./DistributePayment";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { REMOVE_PAYMENT } from "../../../graphql/mutattions";
import { AddPayments } from "./payment/Add";
import { REINSURER, REINSURER_OFFERS } from "../../../graphql/queries";

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
  const [showBtn, setShowBtn] = useState(!0);
  const [payment, setPayment] = useState(null);
  const [updatepaymentDrawer, setUpdatepaymentDrawer] = useState(false);
  const [addPaymentDrawer, setAddPaymentDrawer] = useState(false);
  const finance =
    ["Finance Executive"].includes(ctx?.user?.user_role?.position) &&
    offer?.offer_status === "CLOSED";

  const [removePayment] = useMutation(REMOVE_PAYMENT, {
    refetchQueries: [
      {
        query: REINSURER,
        variables: { id: offer?.offer_retrocedent?.reinsurer?.reinsurer_id },
      },
      {
        query: REINSURER_OFFERS,
        variables: {
          id: offer?.offer_retrocedent?.reinsurer?.reinsurer_id,
          skip: 0,
        },
      },
    ],
  });

  // console.log(offer);

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

  const handleShowEditpaymentDrawer = useCallback((payment) => {
    setPayment(payment);
    setPaymentsModal(!paymentsModal);
    setUpdatepaymentDrawer(!updatepaymentDrawer);
  }, []);

  const handleRemovePayment = useCallback((payment) => {
    setPaymentsModal(false);
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to remove payment?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",

      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) {
        setPaymentsModal(true);
        return;
      }
      removePayment({
        variables: {
          id: payment.offer_payment_id,
        },
      })
        .then((res) => {
          swal("Success", "Payment record removed successfully", "success");
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  }, []);

  const payments = useMemo(() => {
    if (offer)
      return offer.offer_payment.map((payment) => {
        const obj = JSON.parse(payment.payment_details);
        return {
          type:
            obj.payment_type === "Cheque"
              ? obj.payment_type + " - " + obj.payment_from.cheque_number + " "
              : obj.payment_type,
          bank_name: obj.payment_from.bank_name,
          beneficiary_bank: obj.payment_to,
          payment_amount: `${
            obj?.conversion?.currency || offer?.offer_detail?.currency
          } ${payment.payment_amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          created_at: payment.created_at,
          updated_at: payment.updated_at,
          actions: (
            <>
              <button
                onClick={() => handleShowEditpaymentDrawer(payment)}
                className="btn btn-sm w-md btn-info mr-1"
              >
                View
              </button>
              <button
                onClick={() => handleRemovePayment(payment)}
                className="btn btn-sm w-md btn-danger mr-1"
              >
                Remove
              </button>
              {/* <button
                onClick={() => handlePaymentSchedule(payment, key)}
                className="btn btn-sm btn-success w-md mt-1 mr-1"
              >
                Payment Schedule
              </button> */}
              {/* <button
                onClick={() => handleGenerateReceipt(payment)}
                className="btn btn-sm btn-warning w-md mt-1"
              >
                Generate Receipt
              </button> */}
            </>
          ),
        };
      });
    return [];
  }, [handleRemovePayment, handleShowEditpaymentDrawer, offer]);

  return (
    <div>
      <>
        <button
          onClick={() => setViewOffer(true)}
          className="btn btn-sm btn-primary m-1"
        >
          View Offer
        </button>
        {finance && payments.length > 0 && (
          <button
            onClick={() => setPaymentsModal(true)}
            className="btn btn-sm btn-danger m-1"
          >
            Payments
          </button>
        )}
        {payments.length < 1 && (
          <button
            onClick={() => setAddPaymentDrawer(true)}
            className="btn btn-sm btn-danger m-1"
          >
            Make payment
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
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                onClick={() => {
                  setPaymentsModal(false);
                  setAddPaymentDrawer(true);
                }}
                className="btn btn-info btn-square btn-sm w-md"
              >
                Add payment
              </button>
            </div>
          </div>
          <Datatable columns={paymentsColumns} data={payments} />
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
          insurer_id={offer?.insurer?.insurer_id}
          toggle={() => setDistributePaymentsDrawer(!distributePaymentsDrawer)}
        />
      </Drawer>

      {/* Add payment Drawer */}
      <Drawer
        width="40%"
        isvisible={addPaymentDrawer}
        toggle={() => setAddPaymentDrawer(!addPaymentDrawer)}
      >
        {addPaymentDrawer && (
          <AddPayments
            details={offer}
            reinsurer_id={offer?.offer_retrocedent?.reinsurer?.reinsurer_id}
            toggle={() => setAddPaymentDrawer(!addPaymentDrawer)}
          />
        )}
      </Drawer>

      {/* Add payment Drawer */}
      <Drawer
        width="40%"
        isvisible={updatepaymentDrawer}
        toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)}
      >
        <AddPayments
          edit={true}
          details={offer}
          reinsurer_id={offer?.offer_retrocedent?.reinsurer?.reinsurer_id}
          payment={payment}
          toggle={() => setUpdatepaymentDrawer(!updatepaymentDrawer)}
        />
      </Drawer>
    </div>
  );
};

export default RetrocedentOfferButtons;
