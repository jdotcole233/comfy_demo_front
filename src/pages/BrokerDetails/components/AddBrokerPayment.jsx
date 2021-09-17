import React, { useState } from "react";
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { Drawer } from "../../../components";
import AddPaymentForm from "./AddPaymentForm";

const AddBrokerPayment = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Fragment>
      <Dropdown.Item onClick={() => setShowForm(true)}>
        Make Payments
      </Dropdown.Item>
      <Drawer
        isvisible={showForm}
        toggle={() => setShowForm(false)}
        setShow={setShowForm}
        width="50%"
      >
        <AddPaymentForm />
      </Drawer>
    </Fragment>
  );
};

export default AddBrokerPayment;
