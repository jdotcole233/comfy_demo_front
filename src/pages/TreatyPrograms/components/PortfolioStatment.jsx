/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { Input } from "../../../components";
import { CREATE_AND_UPDATE_PORTFOLIO_STATEMENT } from "../../../graphql/queries/treaty";

const PortfolioStatment = ({ id, size, treaty, premium: defaultPremium }) => {
  const [showMOdal, setShowMOdal] = useState(false);
  const [premium, setPremium] = useState("");
  const [outgoingPremium, setOutgoingPremium] = useState("");
  const [losses, setLosses] = useState("");
  const [outgoingLosses, setOutgoingLosses] = useState("");
  const [lossDate, setLossDate] = useState("");
  const [loss, setLoss] = useState("");

  const [createAndUpdate] = useMutation(CREATE_AND_UPDATE_PORTFOLIO_STATEMENT);

  const issueAction = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to create Portfolio statement?`,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      createAndUpdate({
        variables: {
          treaty_proportional_detail_id: id,
          overall_gross_premium: premium,
          losses,
          prev_year_configuration: {
            outgoing_premium_portfolio: outgoingPremium,
            outgoing_loss_portfolio: outgoingLosses,
          },
          known_losses: {
            date: lossDate,
            loss: loss,
          },
        },
      })
        .then(
          ({
            data: { createAndUpdatePortfolioStatmentAndProfitCommission },
          }) => {
            if (!createAndUpdatePortfolioStatmentAndProfitCommission) {
              swal(
                "Whoops!!",
                "Portfolio statement Could not be added successfully",
                "error"
              );
            } else {
              swal(
                "Hurray!!",
                "Portfolio statement added successfully",
                "success"
              );
              setPremium("");
              setShowMOdal(false);
            }
          }
        )
        .catch((err) => {
          console.log(err);
          swal("System Error", "Sorry had a glitch to deal with ", "error");
        });
    });
  };

  useEffect(() => {
    if (defaultPremium) {
      setPremium(defaultPremium);
    }
  }, [defaultPremium]);

  const title = /fire|general accident/g.test(treaty?.toLowerCase())
    ? "Profit Comm. & Portfolio Stmt"
    : "Profit Comm.";

  return (
    <>
      <button
        disabled={size < 4}
        onClick={() => setShowMOdal(true)}
        className="btn btn-sm w-md btn-primary"
      >
        {title}
      </button>

      <Modal centered show={showMOdal} onHide={() => setShowMOdal(false)}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <Input
            label={`100% Gross Premium Ceded To Reinsurers - ${new Date().getFullYear()}`}
            placeholder="100% Gross Premium"
            type="number"
            defaultValue={defaultPremium}
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          />
          <Input
            label="Losses outstanding"
            placeholder="Losses outstanding"
            type="number"
            value={losses}
            onChange={(e) => setLosses(e.target.value)}
          />
          <fieldset className="w-auto p-2 border-form">
            <legend className="details_title">
              {" "}
              Losses recorded in the previous year{" "}
            </legend>
            <div>
              <Input
                label="Outgoing Premium Portfolio"
                placeholder="Outgoing Premium Portfolio"
                type="number"
                value={outgoingPremium}
                onChange={(e) => setOutgoingPremium(e.target.value)}
              />
              <Input
                label="Outgoing Loss Portfolio"
                placeholder="Outgoing Loss Portfolio"
                type="number"
                value={outgoingLosses}
                onChange={(e) => setOutgoingLosses(e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset className="w-auto p-2 border-form mt-3">
            <legend className="details_title">
              {" "}
              Losses recorded in the previous year{" "}
            </legend>
            {/* <div className="col-md-6"> */}
            <div>
              <Input
                label="Losses Recorded"
                placeholder="Losses Recorded"
                type="number"
                value={loss}
                onChange={(e) => setLoss(e.target.value)}
              />
              <Input
                label="Losses Recorded as at"
                placeholder="Losses Recorded as at"
                type="date"
                value={lossDate}
                onChange={(e) => setLossDate(e.target.value)}
              />
              {/* </div> */}
            </div>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={issueAction}
            disabled={!premium}
            className="btn btn-success bg-success btn-sm w-md"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PortfolioStatment;
