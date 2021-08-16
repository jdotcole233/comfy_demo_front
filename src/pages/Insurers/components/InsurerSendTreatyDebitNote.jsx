import React, { Fragment, useState } from "react";
import Slide from "react-reveal/Bounce";
import { Drawer } from "../../../components";
import SendSelectedDebitNotes from "./SendSelectedDebitNotes";

const toothStyles = {
  height: 50,
  width: 400,
  background: "red",
  position: "fixed",
  bottom: 70,
  right: 20,
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  backgroundColor: "gray",
  paddingLeft: 20,
  paddingRight: 20,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const InsurerSendTreatyDebitNote = ({ isvisible, setDone, treaty }) => {
  //   const { treaty } = useInsurer();
  const [showMailSender, setShowMailSender] = useState(false);

  const handleClose = () => {
    setDone();
    setShowMailSender(false);
  };

  return (
    <Fragment>
      <Slide right when={isvisible}>
        <div className="insurer-debit-note-anim bg-warning" style={toothStyles}>
          <div style={{ lineHeight: 0, color: "#fff" }}>
            Send selected Debit Note(s) ?
          </div>
          <div>
            <button
              onClick={() => setShowMailSender(true)}
              className="btn btn-sm btn-success mr-2 w-md"
            >
              Yes
            </button>
            <button onClick={() => setDone()} className="btn btn-sm btn-danger">
              No
            </button>
          </div>
        </div>
      </Slide>

      <Drawer width="50%" isvisible={showMailSender} toggle={handleClose}>
        {showMailSender && (
          <SendSelectedDebitNotes
            treaty_id={treaty?.treaty_id}
            toggle={handleClose}
          />
        )}
      </Drawer>
    </Fragment>
  );
};

export default InsurerSendTreatyDebitNote;
