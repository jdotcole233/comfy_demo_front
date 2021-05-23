import React, { useState, useEffect, useContext } from "react";
import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { Drawer, Datatable } from "../../../components";
import UpdateExtraCharges from "../UpdateExtraCharges";
import ViewReinsurerOffer from "../ViewReinsurerOffer";
import { Modal } from "react-bootstrap";
import { AddPayments } from "../AddPayment";
import { paymentsColumns } from "../columns";
import { AuthContext } from "../../../context/AuthContext";

const RetrocedentOfferButtons = ({
  offer,
  data,
  skip = 0,
  type = "recent",
}) => {
  const [paymentsModal, setPaymentsModal] = useState(false);
  const [addPaymentDrawer, setAddPaymentDrawer] = useState(false);
  const [updatepaymentDrawer, setUpdatepaymentDrawer] = useState(false);
  const [viewOffer, setViewOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showExtraChargesDrawer, setShowExtraChargesDrawer] = useState(false);
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState(null);
  const { state: ctx } = useContext(AuthContext);

  useEffect(() => {
    if (selectedOffer) {
      const actualPayments = selectedOffer.offer_participant_payment.filter(
        (payment) => {
          const obj = JSON.parse(payment.paid_details || "{}");
          return obj.payment_type;
        }
      );
      const rows = [];
      actualPayments.map((payment) => {
        const obj = JSON.parse(payment.paid_details || "{}");
        const row = {
          type:
            obj.payment_type === "Cheque"
              ? obj.payment_type + " - " + obj.payment_from?.cheque_number + " "
              : obj.payment_type || "N/A",
          bank_name: obj?.payment_from?.bank_name || "N/A",
          beneficiary_bank: obj.payment_to || "N/A",
          payment_amount: payment.offer_payment_amount.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          ),
          created_at: new Date(payment.created_at).toDateString(),
          updated_at: payment.updated_at,
          actions: (
            <>
              <button
                onClick={() => handleEditPayment(payment)}
                className="btn btn-sm btn-info w-md"
              >
                View
              </button>
            </>
          ),
        };
        rows.push(row);
        return payment;
      });
      setPayments(rows);
    }
  }, [selectedOffer]);

  const handleEditPayment = (payment) => {
    setPayment(payment);
    setPaymentsModal(!!0);
    setUpdatepaymentDrawer(!0);
  };

  const handleViewOfferDetails = (offer) => {
    setSelectedOffer(offer);
    setViewOffer(!viewOffer);
  };

  const handleViewExtraCharges = (offer) => {
    console.log(offer);
    setSelectedOffer(offer);
    setShowExtraChargesDrawer(!showExtraChargesDrawer);
  };

  const handleShowPayments = (offer) => {
    setSelectedOffer(offer);
    setPaymentsModal(!paymentsModal);
  };

  return (
    <div>
      <>
        
      </>

    </div>
  );
};

export default RetrocedentOfferButtons;
