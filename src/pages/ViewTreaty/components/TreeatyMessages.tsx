import React, { Fragment, useState } from "react";
import { Drawer } from "../../../components";
import CommentChatBox from "../../UnapprovedClosing/CommentChatBox";

interface Props {
  treaty: any;
}

const TreeatyMessages = ({ treaty }: Props) => {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => setShowMessages(true)}
        className="btn btn-danger btn-sm d-flex align-items-center"
      >
        <i className="bx bx-comment font-size-16 text-white mr-2"></i>
        Treaty Comments
      </button>

      <Drawer
        isvisible={showMessages}
        setShow={setShowMessages}
        width={"40%"}
        toggle={() => setShowMessages(false)}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Treaty Detail</h5>
            <p className="card-text">
              The currency of the treaty is the currency of the country that is
              signing the treaty.
            </p>
          </div>
        </div>
        <CommentChatBox
          userComments={[]}
          comments={treaty?.treaty_document_messages}
          onChange={() => {}}
          disabled={true}
        />
      </Drawer>
    </Fragment>
  );
};

export default TreeatyMessages;
