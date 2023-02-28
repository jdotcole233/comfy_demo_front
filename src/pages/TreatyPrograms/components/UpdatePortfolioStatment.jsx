/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/client";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Input } from "../../../components";
import { CREATE_AND_UPDATE_PORTFOLIO_STATEMENT } from "../../../graphql/queries/treaty";
import moment from "moment";

const UpdatePortfolioStatment = ({ detail }) => {
  const [showModal, setShowModal] = useState(false);
  const [premium, setPremium] = useState("");
  const [outgoingPremium, setOutgoingPremium] = useState("");
  const [losses, setLosses] = useState("");
  const [outgoingLosses, setOutgoingLosses] = useState("");
  const [lossDate, setLossDate] = useState("");
  const [loss, setLoss] = useState("");

  useEffect(() => {
    if (detail) {
      const prev_year_configuration = JSON.parse(
        detail?.prev_year_configuration || "{}"
      );
      const known_losses = JSON.parse(
        JSON.parse(detail?.portfolio_entry_compute || "{}")?.known_losses ||
          "{}"
      );
      const __ = new Date(known_losses?.date).toLocaleDateString();
      setPremium(detail?.overall_gross_premium);
      setLosses(detail?.losses_outstanding);
      setOutgoingPremium(prev_year_configuration?.outgoing_premium_portfolio);
      setOutgoingLosses(prev_year_configuration?.outgoing_loss_portfolio);
      setLossDate(moment(__).format("YYYY-MM-DD"));
      setLoss(known_losses?.loss);
      console.log("known_losses", known_losses);
      console.log("prev_year_configuration", __);
    }
  }, [detail]);

  const [createAndUpdate] = useMutation(CREATE_AND_UPDATE_PORTFOLIO_STATEMENT);

  const issueAction = () => {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update Portfolio statement?`,
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
          treaty_proportional_detail_id: detail?.treaty_proportional_detail_id,
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
                "Portfolio statement Could not be updated successfully",
                "error"
              );
            } else {
              swal(
                "Hurray!!",
                "Portfolio statement updated successfully",
                "success"
              );
              setPremium("");
              setShowModal(false);
            }
          }
        )
        .catch((err) => {
          console.log(err);
          swal("System Error", "Sorry had a glitch to deal with ", "error");
        });
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-sm btn-info w-md"
      >
        Edit
      </button>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Edit Portfolio Statement</Modal.Header>
        <Modal.Body>
          <Input
            label={`100% Gross Premium Ceded To Reinsurers - ${new Date().getFullYear()}`}
            placeholder="100% Gross Premium"
            type="number"
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
                label={`Losses Recorded as at`}
                placeholder="Losses Recorded as at"
                type="date"
                defaultValue={lossDate}
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

export default UpdatePortfolioStatment;
