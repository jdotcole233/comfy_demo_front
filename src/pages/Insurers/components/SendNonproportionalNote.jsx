/* eslint-disable no-throw-literal */
import JoditEditor from "jodit-react";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Selector } from "../../../components";
import DropZone from "../../../components/DropZone";
import { EMPLOYEES } from "../../../graphql/queries/employees";
import { SEND_NP_DEBIT_NOTE, TREATY } from "../../../graphql/queries/treaty";
import {
  validateEmails,
  createOption,
} from "../../CreateSlip/CreateBroadcastEmail";
import styles from "../styles/ViewInsurerOffer.module.css";

function SendNonproportionalNote({
  treaty_id,
  setShow,
  layer,
  limit,
  m_and_d_premium,
  total_participation_percentage,
  installment_type,
  participant_id,
  uuid,
}) {
  const { register, errors, handleSubmit, setError, reset } = useForm();
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [files, setFiles] = useState([]);
  const [sendmail] = useMutation(SEND_NP_DEBIT_NOTE, {
    refetchQueries: [{ query: TREATY, variables: { treaty_id } }],
  });
  const [should_send] = useState(0);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const { data: treaty } = useQuery(TREATY, { variables: { treaty_id } });
  const [include_attachment] = useState(false);
  const { data: employees, loading } = useQuery(EMPLOYEES);

  useEffect(() => {
    if (employees) {
      const _emails = employees.employees.map((e) => ({
        label: e.employee_email,
        value: e.employee_email,
      }));
      setSelectedableEmail(_emails);
    }
  }, [employees]);

  const handleSubmitSendMail = ({ subject, copied_emails }) => {
    console.log(copiedMails);
    if (!validateEmails(copiedMails.map((e) => e.label))) {
      setError("copied_emails", "pattern", "Provide valid mails");
      return;
    }
    // return;
    if (content.length < 1) {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }

    const data = {
      email_component: {
        email_content: content,
        subject,
        copied_email: copied_emails.length
          ? [...copiedMails.map((e) => e.label)]
          : [],
        attachments: [...files],
      },
      treaty_id,
      limit,
      m_and_d_premium,
      total_participation_percentage: 100 - total_participation_percentage,
      installment_type,
      layer,
      participant_id,
      uuid,
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to broadcast this mail?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: { data, should_send, include_attachment },
      })
        .then((res) => {
          swal("Hurray!!", "Mail sent successfully", "success");
          setContent("");
          setFiles([]);
          setFiles([]);
          reset();
          setShow(false);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            swal("Oh noes!", "The AJAX request failed!", "error");
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    });
  };

  const handleInputChange = (event) => {
    setInputvalue(event);
  };

  const handleCopiedmailChange = (value) => {
    setCopiedMails(value ? value : []);
  };

  const handleKeyDown = (event) => {
    if (!inputvalue) return;
    // eslint-disable-next-line default-case
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.log(copiedMails);
        setInputvalue("");
        setCopiedMails([...copiedMails, createOption(inputvalue)]);
        event.preventDefault();
    }
  };

  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Send Debit Note</h2>
      </div>

      <Alert variant="danger">
        This session will send Copies of Limit layer {layer} Debit Notes along
        with any attachments to {treaty?.treaty?.treaty_to_associates?.length}{" "}
        associates {treaty?.treaty?.insurer?.insurer_company_name}
      </Alert>

      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        <div className="form-group row mb-4">
          <label htmlFor="taskname" className="col-form-label col-lg-2">
            Subject
          </label>
          <div className="col-lg-10">
            <input
              id="taskname"
              ref={register({ required: "Required" })}
              name="subject"
              type="text"
              className="form-control"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-danger">{errors.subject.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mb-4">
          <label htmlFor="taskname" className="col-form-label col-lg-2">
            CC
          </label>
          <div className="col-lg-10">
            <Selector
              inputValue={inputvalue}
              onInputChange={handleInputChange}
              isMulti
              value={copiedMails}
              isLoading={loading}
              onChange={handleCopiedmailChange}
              onKeyDown={handleKeyDown}
              options={selectedableEmail}
            />
            <input
              type="hidden"
              ref={register({ required: "Required" })}
              value={copiedMails}
              name="copied_emails"
              className="form-control"
              placeholder="Enter recipients emails separated with commas"
            />
            {errors.copied_emails && (
              <p className="text-danger">{errors.copied_emails.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Message</label>
          <div className="col-lg-10">
            <JoditEditor
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-10">
            {contentError && <p className="text-danger">Required</p>}
          </div>
        </div>

        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Attachment(s)</label>
          <div className="col-lg-10">
            <DropZone
              closed={true}
              onChange={(set) => setFiles(set)}
              multiple={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-form-label col-lg-2"></div>
          <div className="col-lg-10 d-flex justify-content-end">
            <button type="submit" className="btn btn-sm w-md btn-primary">
              Send Email
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendNonproportionalNote;
