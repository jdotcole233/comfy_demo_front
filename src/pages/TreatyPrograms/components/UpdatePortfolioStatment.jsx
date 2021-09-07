/* eslint-disable no-throw-literal */
import { useMutation } from "@apollo/react-hooks";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Input } from "../../../components";
import { CREATE_AND_UPDATE_PORTFOLIO_STATEMENT } from "../../../graphql/queries/treaty";

const UpdatePortfolioStatment = ({ detail }) => {
  const [showModal, setShowModal] = useState(false);
  const [premium, setPremium] = useState("");
  const [losses, setLosses] = useState("");

  useEffect(() => {
    if (detail) {
      setPremium(detail?.overall_gross_premium);
      setLosses(detail?.losses_outstanding);
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
        },
      })
        .then(({ data: { createAndUpdatePortfolioStatment } }) => {
          if (!createAndUpdatePortfolioStatment) {
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

export default UpdatePortfolioStatment;
