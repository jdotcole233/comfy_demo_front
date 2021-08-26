/* eslint-disable no-throw-literal */
import JoditEditor from "jodit-react";
import { includes } from "lodash-es";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { Selector } from "../../../components";
import DropZone from "../../../components/DropZone";
import { useInsurer } from "../../../context/InsurerProvider";
import { EMPLOYEES } from "../../../graphql/queries/employees";
import { SEND_P_DEBIT_NOTE, TREATY } from "../../../graphql/queries/treaty";
import {
  validateEmails,
  createOption,
} from "../../CreateSlip/CreateBroadcastEmail";
import styles from "../styles/ViewInsurerOffer.module.css";
import { getFlexibleName } from "./Note";

export default function SendNote({ treaty, toggle }) {
  const { register, errors, handleSubmit, setError, clearError, reset } =
    useForm();
  const { state } = useLocation();
  const { selectedNotes, clearNotes } = useInsurer();
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [files, setFiles] = useState([]);
  const [sendmail] = useMutation(SEND_P_DEBIT_NOTE, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: state?.treaty_id } },
    ],
  });
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const { data: employees, loading } = useQuery(EMPLOYEES);
  const { data: treatyData } = useQuery(TREATY, {
    variables: { treaty_id: state?.treaty_id },
  });

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
      treaty_account_ids: selectedNotes,
      treaty_id: state?.treaty_id,
      email_component: {
        email_content: content,
        subject,
        copied_email: copied_emails.length
          ? [...copiedMails.map((e) => e.label)]
          : [],
        attachments: [...files],
      },
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
        variables: { ...data },
      })
        .then((res) => {
          swal("Hurray!!", "Mail sent successfully", "success");
          setContent("");
          setFiles([]);
          setFiles([]);
          reset();
          clearNotes();
          toggle();
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

  const handleEmailChange = (event) => {
    const { value } = event.target;
    const emails = value.length && value.split(",");
    const validEmails = emails.length ? validateEmails(emails) : false;
    if (!validEmails) {
      setError("copied_emails", "pattern", "Provide valid mails");
    } else {
      clearError("copied_emails");
    }
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

  const printAccountName = (account) => {
    if (selectedNotes.includes(account?.treaty_account_id)) {
      return getFlexibleName(account.account_periods);
    }
    return null;
  };

  return (
    <div>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Proportional Debit Note Compose</h2>
      </div>
      <Alert variant="danger">
        This session will send Copies of{" "}
        {treatyData.treaty?.treaty_accounts?.map((el) => printAccountName(el))}{" "}
        Debit Note(s) along with any attachments to{" "}
        {treatyData?.treaty?.treaty_to_associates?.length} associates{" "}
        {treatyData?.treaty?.insurer?.insurer_company_name}
      </Alert>
      {/* Mail Side */}
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        {/* {JSON.stringify(treatyData.treaty?.treaty_accounts)} */}
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
              onChange={handleEmailChange}
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
