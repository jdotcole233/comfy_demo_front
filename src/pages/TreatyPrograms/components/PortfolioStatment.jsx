/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { Input } from "../../../components";
import { CREATE_AND_UPDATE_PORTFOLIO_STATEMENT } from "../../../graphql/queries/treaty";

const PortfolioStatment = ({ id, size }) => {
  const [showMOdal, setShowMOdal] = useState(false);
  const [premium, setPremium] = useState("");
  const [losses, setLosses] = useState("");

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
        },
      })
        .then(({ data: { createAndUpdatePortfolioStatment } }) => {
          if (!createAndUpdatePortfolioStatment) {
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
        })
        .catch((err) => {
          console.log(err);
          swal("System Error", "Sorry had a glitch to deal with ", "error");
        });
    });
  };

  return (
    <>
      <button
        disabled={size < 4}
        onClick={() => setShowMOdal(true)}
        className="btn btn-sm w-md btn-primary"
      >
        Portfolio Statement
      </button>

      <Modal centered show={showMOdal} onHide={() => setShowMOdal(false)}>
        <Modal.Header closeButton>Portfolio Statement</Modal.Header>
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
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={issueAction}
            disabled={!premium}
            className="btn btn-success btn-sm w-md"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PortfolioStatment;
