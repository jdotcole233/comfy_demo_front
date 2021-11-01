import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Modal } from "react-bootstrap";
import { Datatable, Loader } from "../../../components";
import { REINSURER_PROPORTIONAL_TREATY_PAYMENTS } from "../../../graphql/queries/treaty";
import { getFlexibleName } from "../../Insurers/components/Note";
import { paymentsColumns } from "../columns";

const ProportionalPaymentsModal = ({
  payments = [],
  treaty = {},
  reinsurer_id,
  selectPayment,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const { data, loading, error } = useQuery(
    REINSURER_PROPORTIONAL_TREATY_PAYMENTS,
    {
      variables: {
        treaty_id: treaty?.treaty_id,
        treaty_participation_id: reinsurer_id,
      },
    }
  );

  if (loading)
    return (
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      </Modal.Body>
    );

  if (error) return <Modal.Body>Error</Modal.Body>;

  const changeLayer = (key, quarter) => {
    setSelectedQuarter(quarter);
    setCurrentIndex(key);
  };

  const generatePayments = (_payments = []) =>
    _payments
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

  return (
    <Modal.Body>
      <ul className="nav nav-tabs nav-tabs-custom">
        {data?.treatyReinsurerAccountsPayment?.map((el, id) => (
          <li
            key={id}
            onClick={() => changeLayer(id, el)}
            className="nav-item btn"
          >
            <div
              className={`nav-link ${id === currentIndex ? "active" : ""}`}
              href="#"
            >
              {getFlexibleName(el.account_periods)}
            </div>
          </li>
        ))}
      </ul>

      <Datatable
        columns={paymentsColumns}
        data={generatePayments(selectedQuarter?.treaty_p_payments)}
      />
    </Modal.Body>
  );
};

export default ProportionalPaymentsModal;
