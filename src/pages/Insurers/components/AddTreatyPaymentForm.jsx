import React from "react";
import { Alert } from "react-bootstrap";
import styles from "../styles/ViewInsurerOffer.module.css";
import NonProportionalPaymentForm from "./NonProportionalPaymentForm";
import ProportionalPaymentForm from "./ProportionalPaymentForm";

function AddTreatyPaymentForm({
  insurer,
  treaty,
  toggleAddpayment,
  edit,
  payment,
}) {
  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>
          {edit ? "Edit" : "Add"} Treaty Payment
        </h2>
        <Alert variant="danger"></Alert>
      </div>
      {treaty?.treaty_program?.treaty_type === "PROPORTIONAL" ? (
        <ProportionalPaymentForm
          payment={payment}
          edit={edit}
          toggleAddpayment={toggleAddpayment}
          payments={treaty?.treaty_p_payments}
          treaty={treaty}
          insurer={insurer}
        />
      ) : (
        <NonProportionalPaymentForm
          payment={payment}
          edit={edit}
          toggleAddpayment={toggleAddpayment}
          treaty={treaty}
          insurer={insurer}
        />
      )}
    </div>
  );
}

export default AddTreatyPaymentForm;
