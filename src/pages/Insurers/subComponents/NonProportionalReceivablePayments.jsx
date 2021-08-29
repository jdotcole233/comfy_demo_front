/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, memo, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Datatable } from "../../../components";
import { paymentsReceivalbleColumns } from "../dummy";
import _ from "lodash";
import { money } from "../../../utils";
import { useMemo } from "react";

const NonProportionalReceivablePayments = ({ payments = [], treaty }) => {
  const [currentIndex, setCurrentIndex] = useState("");
  const [index, setIndex] = useState(0);
  const layers = useMemo(() => {
    if (treaty) {
      const parsedLimits = JSON.parse(treaty.layer_limit || "[]");

      setCurrentIndex(parsedLimits[0].uuid);
      return parsedLimits;
    }
    return [];
  }, [treaty]);

  const changeLayer = (key, index) => {
    setCurrentIndex(key);
    setIndex(index);
  };

  const actualPayments = _.groupBy(payments, "section");

  return (
    <Fragment>
      <Modal.Body>
        {JSON.stringify()}
        <ul className="nav nav-tabs mb-2 nav-tabs-custom">
          {treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" &&
            layers.map((_, key) => (
              <li
                key={key}
                onClick={() => changeLayer(_.uuid, key)}
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
        <LayerBreakDown
          index={index}
          treaty={treaty}
          actualPayments={actualPayments}
          uuid={currentIndex}
        />
        <Datatable
          columns={paymentsReceivalbleColumns}
          data={actualPayments[`${currentIndex}`]}
        />
      </Modal.Body>
    </Fragment>
  );
};

export default memo(NonProportionalReceivablePayments);

const LayerBreakDown = ({ uuid, index, treaty = {}, actualPayments = {} }) => {
  const layer = useMemo(() => {
    if (treaty && index) {
      console.log("changed");
      return JSON.parse(treaty?.layer_limit || "[]").map((limit, key) => ({
        ...limit,
        uuid: limit?.uuid,
      }))[index];
    }
    return JSON.parse(treaty?.layer_limit || "[]").map((limit, key) => ({
      ...limit,
      uuid: limit?.uuid,
    }))[0];
  }, [index, treaty]);

  const totalAmount = parseFloat(layer?.limit);

  const remainingAmountTobePaid =
    totalAmount -
    actualPayments[`${uuid}`]?.reduce(
      (acc, curr) => acc + parseFloat(curr?.payment_amount_),
      0
    );

  return (
    <Alert variant="warning">
      <div className="row">
        <div className="col-md-12">
          <p>
            Limit : <b>{money(parseFloat(layer?.limit))}</b>
          </p>
        </div>
        <div className="col-md-12">
          <p>
            Deductible : <b>{money(parseFloat(layer?.deductible))}</b>
          </p>
        </div>
        <div className="col-md-12">
          <p>
            All payments should/must not exceed an amount of{" "}
            <b>{money(parseFloat(layer?.limit))}</b> for each claim
          </p>
          <p>
            Remaining amount to be paid :{" "}
            <b>
              {money(
                _.isNaN(remainingAmountTobePaid)
                  ? totalAmount
                  : remainingAmountTobePaid
              )}
            </b>
          </p>
        </div>
      </div>
    </Alert>
  );
};
