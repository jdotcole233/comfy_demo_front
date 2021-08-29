import React, { Fragment, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Datatable } from "../../../components";
import { getFlexibleName } from "../components/Note";
import { paymentsColumns } from "../dummy";
import _ from "lodash";

const ProportionalTreatyPayments = ({ payments = [], treaty }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const quarters = useMemo(() => {
    if (treaty) {
      setCurrentIndex(treaty?.treaty_accounts[0]?.treaty_account_id);
      return treaty?.treaty_accounts;
    }
    return [];
  }, [treaty]);

  const changeLayer = (key) => {
    setCurrentIndex(key);
  };

  const actualPayments = _.groupBy(payments, "section");
  console.log("Actual payments", actualPayments);

  return (
    <Fragment>
      <Modal.Body>
        <ul className="nav nav-tabs nav-tabs-custom">
          {quarters.map((_, key) => (
            <li
              key={key}
              onClick={() => changeLayer(_.treaty_account_id)}
              className="nav-item btn"
            >
              <div
                className={`nav-link ${
                  _.treaty_account_id === currentIndex ? "active" : ""
                }`}
                href="#"
              >
                {getFlexibleName(_.account_periods)}
              </div>
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

export default ProportionalTreatyPayments;
