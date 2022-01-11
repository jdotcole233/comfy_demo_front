import { useMutation } from "@apollo/client";
import React, { useCallback, useState } from "react";
import swal from "sweetalert";
import { APPROVE_TREATY } from "../../../graphql/mutattions/renewal";
import {
  ApproveTreaty,
  ApproveTreatyVariables,
} from "../../../graphql/mutattions/__generated__/ApproveTreaty";
import { OFFERS } from "../../../graphql/queries";
import { ENDORSEMENTS } from "../../../graphql/queries/endorsements";
import { TREATY_CLAIMS } from "../../../graphql/queries/treaties";
import { UnapporvedTreatyClaims_all_treaties } from "../../../graphql/queries/__generated__/unapporvedTreatyClaims";
import CommentChatBox from "../CommentChatBox";

interface Props {
  treaty: UnapporvedTreatyClaims_all_treaties;
  setShow?: any;
}

const ApprovTreaty = ({ treaty, setShow }: Props) => {
  const [status, setStatus] = useState("");
  const [messages, setComments] = useState<string[]>([]);
  const [approval_date, setApproval_date] = useState("");

  const [setstatus, { loading }] = useMutation<
    ApproveTreaty,
    ApproveTreatyVariables
  >(APPROVE_TREATY, {
    variables: {
      treaty_id: treaty.treaty_id,
      approval_status: status,
      document_message: messages,
      approval_date,
    },
    refetchQueries: [
      {
        query: TREATY_CLAIMS,
        variables: {
          status: "UNAPPROVED",
          treaty_type: ["NONPROPORTIONAL", "PROPORTIONAL"],
        },
      },
      {
        query: ENDORSEMENTS,
      },
      {
        query: OFFERS,
        variables: {
          offer_status: ["CLOSED"],
          approval_status: "UNAPPROVED",
        },
      },
    ],
  });

  const buttons = {
    APPROVED: "Approve",
    REJECTED: "Reject",
    MODIFY: "Modify",
  };

  const popMessages = {
    APPROVED: `Setting the status of this treaty with policy number ${treaty?.treaty_reference} will enable all staff to generate and send copies of debit, cover and credit notes out of the system.`,
    MODIFY: `This action reminds the staff to make amendments to treaty with policy number ${treaty?.treaty_reference} for resubmission`,
    DELETE: `This action instructs staff to delete treaty with policy number ${treaty?.treaty_reference} from the system`,
  };

  const addComment = useCallback((_comment) => {
    setComments((prev) => [...prev, _comment]);
  }, []);

  const handleSetStatus = () => {
    swal({
      title: "Are you sure?",
      text: popMessages[status as keyof typeof popMessages],
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "btn",
          closeModal: true,
        },
        confirm: {
          text: buttons[status as keyof typeof buttons],
          value: true,
          closeModal: false,
          className: "btn btn-success",
        },
      },
      dangerMode: true,
    }).then((input) => {
      if (!input) throw null;
      setstatus()
        .then((res) => {
          swal("Success", "Treaty status  changed Successfully", "success");
          setComments([]);
          setStatus("");
          setShow && setShow(false);
        })
        .catch((err) => {
          swal("Whoops!!", "Error changing treaty status", "error");
        });
    });
  };

  return (
    <div className="container-fluid">
      <fieldset className="border-form mb-2">
        <legend className={`font-size-16`}>
          Treaty Details [{treaty?.treaty_reference}]
        </legend>
        <table className="table">
          <tbody>
            <tr style={{ margin: 0, lineHeight: 0 }}>
              <td>Insurance company</td>
              <td>{treaty?.insurer?.insurer_company_name} </td>
            </tr>
            <tr style={{ margin: 0, lineHeight: 0 }}>
              <td>Class of business</td>
              <td>{treaty?.treaty_program?.treaty_name} </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <div className="row">
        <div className="form-group col-md-12">
          <label htmlFor="acceptance_type" className="text-danger">
            Approval Status
          </label>
          <select
            name="approval_status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id=""
            className="form-control"
          >
            <option value="">Please Select...</option>
            <option value="APPROVED">Approved</option>
            <option value="MODIFY">Modify</option>
            <option value="DELETE">Delete</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {(status === "MODIFY" || status === "DELETE") && (
            <CommentChatBox
              comments={[]}
              userComments={messages}
              onChange={addComment}
            />
          )}
        </div>
      </div>

      {status === "APPROVED" && (
        <>
          <div className="alert alert-danger">
            By approving this treaty, both placing and cover notes will be
            digitally signed
          </div>
          <input
            type="date"
            value={approval_date}
            onChange={(e) => setApproval_date(e.target.value)}
            name=""
            className="form-control mb-3"
          />
        </>
      )}

      {status !== "" && (
        <div className="row">
          <div className="col-md-12">
            <button
              disabled={loading}
              onClick={handleSetStatus}
              className="btn btn-block btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovTreaty;
