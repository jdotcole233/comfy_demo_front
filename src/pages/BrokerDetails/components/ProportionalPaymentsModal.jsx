import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Datatable } from "../../../components";
import { getFlexibleName } from "../../Insurers/components/Note";
import { paymentsColumns } from "./columns";

const ProportionalPaymentsModal = ({
  accounts = [],
  treaty = {},
  re_broker_id,
  selectPayment,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState(() => {
    return accounts?.length > 0 ? accounts[0] : null;
  });

  const changeLayer = (key, quarter) => {
    setSelectedQuarter(quarter);
    setCurrentIndex(key);
  };

  const generatePayments = (_payments = []) =>
    _payments
      ?.filter((el) => {
        const obj = JSON.parse(el.payment_details || "{}");
        return obj.payment_type;
      })
      ?.map((payment) => {
        const obj = JSON.parse(payment.payment_details || "{}");
        // console.log(payment);
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
          payment_amount: payment?.payment_amount?.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          created_at: payment.created_at,
          updated_at: payment.updated_at,
          section:
            payment.surpulus_uuid || payment.treaty_accountstreaty_account_id,
          actions: (
            <>
              <button
                onClick={() => selectPayment(payment)}
                className="btn btn-sm  btn-info mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => selectPayment(payment)}
                className="btn btn-sm  btn-success mr-1"
              >
                Generate receipt
              </button>
            </>
          ),
        };
      });

  return (
    <Modal.Body>
      <ul className="nav nav-tabs nav-tabs-custom">
        {accounts?.map((el, id) => (
          <li
            key={id}
            onClick={() => changeLayer(id, el)}
            className="nav-item btn"
          >
            <div
              className={`nav-link ${id === currentIndex ? "active" : ""}`}
              href="#"
            >
              {getFlexibleName(el?.treaty_account?.account_periods)}
            </div>
          </li>
        ))}
      </ul>

      <Datatable
        columns={paymentsColumns}
        data={generatePayments(
          selectedQuarter?.broker_surplus_participation_payments
        )}
      />
    </Modal.Body>
  );
};

export default ProportionalPaymentsModal;
