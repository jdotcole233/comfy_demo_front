import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Datatable } from "../../../components";
import { paymentsColumns } from "./columns";
import _ from "lodash";

const NonProportionalPaymentModal = ({ payments = [], treaty = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const layer = _.first(JSON.parse(treaty?.layer_limit ?? "[]"));
    return layer?.uuid;
  });

  const uniqueLayers = _.groupBy(payments, "section");
  const changeLayer = (key) => {
    setCurrentIndex(key);
  };

  return (
    <Modal.Body>
      <ul className="nav nav-tabs nav-tabs-custom">
        {JSON.parse(treaty?.layer_limit ?? "[]").map((_, key) => (
          <li
            key={_.uuid}
            onClick={() => changeLayer(_.uuid)}
            className="nav-item btn"
          >
            <div
              className={`nav-link ${_.uuid === currentIndex ? "active" : ""}`}
              href="#"
            >{`Layer ${key + 1}`}</div>
          </li>
        ))}
      </ul>
      <Datatable columns={paymentsColumns} data={uniqueLayers[currentIndex]} />
    </Modal.Body>
  );
};

export default NonProportionalPaymentModal;
