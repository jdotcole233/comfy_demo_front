/* eslint-disable no-throw-literal */
import React from "react";
import { Modal } from "react-bootstrap";
import { Drawer } from "../../components";
import LayerDebitNote from "./Previews/LayerDebitNote";
import { useMutation } from "@apollo/client";
import { TREATY, UPDATE_LIMIT_LAYER } from "../../graphql/queries/treaty";
import swal from "sweetalert";
import SendNote from "../Insurers/components/SendNote";
import SendNonproportionalNote from "../Insurers/components/SendNonproportionalNote";

function EditLayer({ index, layer, insurer, treaty, percentage, _layers }) {
  const [showModal, setShowModal] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [layers, setLayer] = React.useState({});
  const [showSendingNoteDrawer, setShowSendingNoteDrawer] =
    React.useState(false);

  const [updaeLayer] = useMutation(UPDATE_LIMIT_LAYER, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });

  React.useEffect(() => {
    if (layer) {
      setLayer(layer);
    }
  }, [layer]);

  function onLimitValueChange(e) {
    const { value, name } = e.target;
    const _ = { ...layers };
    _[name] = value;
    setLayer(_);
  }

  function updateLayer(e) {
    const _ = _layers;
    _[index - 1] = layers;
    // alert(JSON.stringify(_))
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: `Are you sure you want to update this layer ?`,
      text: ``,
      buttons: [
        "No",
        {
          text: "Yes",
          closeModal: false,
        },
      ],
    }).then((input) => {
      if (!input) throw null;
      updaeLayer({
        variables: {
          limit: {
            limit: JSON.stringify(_),
            treaty_id: treaty?.treaty_id,
          },
        },
      })
        .then(() => {
          setShowModal(false);
          swal(
            "Hurray!!",
            "layer " + index + "updated successfully",
            "success"
          );
        })
        .catch((err) => {
          swal(
            "Whhoops!!",
            "layer " + index + "not updated successfully",
            "error"
          );
        });
    });
  }

  const isProp = treaty.treaty_program?.treaty_type !== "NONPROPORTIONAL";

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-info btn-sm  mr-2"
      >
        Edit
      </button>
      {percentage >= 100 && (
        <button
          onClick={() => setShowSendingNoteDrawer((prev) => !prev)}
          className="btn btn-primary btn-sm w-md mr-2"
        >
          Send Debit Note{" "}
        </button>
      )}
      {percentage >= 100 && (
        <button
          onClick={() => setShowDrawer(true)}
          className="btn btn-success btn-sm w-md"
        >
          Preview Debit Note
        </button>
      )}

      <Modal centered visi show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Edit Layer {index}</Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Limit</label>
                <input
                  value={layers.limit}
                  name="limit"
                  onChange={(e) => onLimitValueChange(e)}
                  type="text"
                  placeholder="Limit"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Type of goods">Deductible</label>
                <input
                  value={layers.deductible}
                  name="deductible"
                  onChange={(e) => onLimitValueChange(e)}
                  type="text"
                  placeholder="Deductible"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="form-group mt-2">
                <label htmlFor="M&D Premium">M&D Premium</label>
                <input
                  value={layers.m_and_d_premium}
                  name="m_and_d_premium"
                  onChange={(e) => onLimitValueChange(e)}
                  className="form-control"
                  placeholder="Claim Settled"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-2">
                <label htmlFor="Installments">Installments</label>
                <select
                  value={layers.installment_type}
                  className="form-control"
                  name="installment_type"
                  onChange={(e) => onLimitValueChange(e)}
                  id="installment_type"
                >
                  <option value="">Select ...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={updateLayer} className="btn btn-sm btn-success w-md">
            Submit
          </button>
        </Modal.Footer>
      </Modal>

      <Drawer
        isvisible={showDrawer}
        width="50%"
        toggle={() => setShowDrawer(false)}
      >
        {showDrawer && (
          <LayerDebitNote
            index={index}
            percentage={100 - parseFloat(percentage)}
            insurer={insurer}
            treaty={treaty}
            layer={layers}
          />
        )}
      </Drawer>

      {/* Drawer for  */}
      <Drawer
        isvisible={showSendingNoteDrawer}
        width="50%"
        toggle={() => setShowSendingNoteDrawer((prev) => !prev)}
      >
        {showSendingNoteDrawer && isProp && (
          <SendNote
            toggle={() => setShowSendingNoteDrawer((prev) => !prev)}
            notes={treaty?.treaty_accounts}
            treaty_id={treaty?.treaty_id}
            reinsurers={treaty?.treaty_participants}
          />
        )}
        {showSendingNoteDrawer && !isProp && (
          <SendNonproportionalNote
            setShow={setShowSendingNoteDrawer}
            limit={layers.limit}
            total_participation_percentage={100 - percentage}
            installment_type={layers.installment_type}
            m_and_d_premium={layers.m_and_d_premium}
            layer={index}
            treaty_id={treaty?.treaty_id}
            uuid={layers.uuid}
          />
        )}
      </Drawer>
    </>
  );
}

export default EditLayer;
