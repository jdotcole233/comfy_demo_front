/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Datatable } from "../../../components";
import { paymentsColumns } from "../dummy";
import _ from "lodash";

const NonProportionalTreatyPayments = ({ payments = [], treaty }) => {
  const [currentIndex, setCurrentIndex] = useState("");
  const layers = useMemo(() => {
    if (treaty) {
      const parsedLimits = JSON.parse(treaty.layer_limit || "[]");

      setCurrentIndex(parsedLimits[0].uuid);
      return parsedLimits;
    }
    return [];
  }, [treaty]);

  const changeLayer = (key) => {
    setCurrentIndex(key);
  };

  const actualPayments = _.groupBy(payments, "section");

  return (
    <Fragment>
      <Modal.Body>
        <ul className="nav nav-tabs nav-tabs-custom">
          {treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" &&
            layers.map((_, key) => (
              <li
                key={_.uuid}
                onClick={() => changeLayer(_.uuid)}
                className="nav-item btn"
              >
                <div
                  className={`nav-link ${
                    _.uuid === currentIndex ? "active" : ""
                  }`}
                  href="#"
                >{`Layer ${key + 1}`}</div>
              </li>
            ))}
        </ul>
        <Datatable
          columns={paymentsColumns}
          data={actualPayments[`${currentIndex}`]}
        />
      </Modal.Body>
    </Fragment>
  );
};

export default NonProportionalTreatyPayments;
