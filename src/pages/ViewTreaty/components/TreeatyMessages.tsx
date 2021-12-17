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
        <fieldset className="border-form mb-2">
          <legend className={`text-xl font-light`}>
            Treaty Details [{treaty?.treaty_reference}]
          </legend>
          <table className="table">
            <tbody>
              <tr style={{ margin: 0, lineHeight: 0 }}>
                <td>Insurance company</td>
                <td>{treaty?.insurer?.insurer_company_name} </td>
              </tr>
              <tr style={{ margin: 0 }}>
                <td>Class of business</td>
                <td>{treaty?.treaty_program?.treaty_name} </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
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
