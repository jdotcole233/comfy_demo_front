/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import { useMutation } from "react-apollo";
import { PostPoneNotification } from "../../../graphql/mutattions/Notifications";
import { INSURER } from "../../../graphql/queries";

const Reschedule = ({ remainders, id }) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const now = new Date();
  const [postpone, { loading }] = useMutation(PostPoneNotification, {
    variables: {
      date,
      ids:
        typeof remainders === "object"
          ? remainders.map((remainder) => remainder.remainder_id)
          : [],
    },
    refetchQueries: [{ query: INSURER, variables: { id } }],
  });

  useEffect(() => {
    if (date) {
      setError(false);
    }
    return () => {
      setError(false);
    };
  }, [date]);

  const handleShowRescheduleForm = () => {
    setShowForm((c) => !c);
  };
  const handleReschedule = (event) => {
    if (!date.length) {
      setError(true);
      return;
    }
    swal({
      icon: "info",
      title: "Rescheduele Notification ?",
      text: "This action reschedules expiry notification to the next 3 months",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      postpone()
        .then((res) => {
          setShowForm(false);
          setDate("");
          swal("Success", "Notification has been postponed", "success");
        })
        .catch((err) => {
          if (err) {
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  if (remainders) {
    return JSON.stringify(remainders);
  }

  return remainders?.length ? (
    <>
      {/* use postpone till in value to either show or not show button */}
      {!remainders[0].postponed_till && (
        <button
          onClick={handleShowRescheduleForm}
          className="btn btn-warning waves-effect waves-light btn-sm"
        >
          Reschedule
        </button>
      )}
      <Modal centered show={showForm} onHide={() => setShowForm((c) => !c)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <div className="form-group">
              <label htmlFor="postpone_date">Postpone till</label>
              <input
                type="date"
                min={
                  now.getFullYear().toString() +
                  "-" +
                  (now.getMonth() + 1).toString().padStart(2, 0) +
                  "-" +
                  now.getDate().toString().padStart(2, 0)
                }
                value={date}
                onChange={(evt) => setDate(evt.target.value)}
                className="form-control"
              />
              {error && <p className="text-danger">Required</p>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleReschedule}
            disabled={loading}
            className="btn btn-sm w-md btn-warning waves-effect waves-light"
          >
            {loading ? <i className="bx bx-hourglass bx-spin mr-2"></i> : null}
            Postpone
          </button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
};

export default Reschedule;
