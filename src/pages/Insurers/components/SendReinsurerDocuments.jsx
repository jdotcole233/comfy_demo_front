/* eslint-disable no-throw-literal */
import JoditEditor from "jodit-react";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Dropzone, Selector } from "../../../components";
import {
  SEND_NP_CREDIT_NOTE,
  SEND_TREATY_CREDIT_AND_STATEMENTS_NOTE,
  TREATY,
} from "../../../graphql/queries/treaty";
import {
  createOption,
  validateEmails,
} from "../../CreateSlip/CreateBroadcastEmail";
import { getFlexibleName } from "./Note";
import styles from "../styles/ViewInsurerOffer.module.css";
import { EMPLOYEES } from "../../../graphql/queries/employees";
import swal from "sweetalert";

const SendReinsurerDocuments = ({
  setShow,
  isProp,
  treaty,
  layers,
  layer,
  reinsurer,
}) => {
  const { register, errors, handleSubmit, setError, clearError, reset } = useForm();
  const [content, setContent] = useState("");
  const [contentError /*setContentError*/] = useState(false);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const { data: employees, loading } = useQuery(EMPLOYEES);
  const [files, setFiles] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [noteTypes, setNote] = useState([]);
  const [docType, setDocType] = useState([]);

  const [sendcreditnote] = useMutation(SEND_NP_CREDIT_NOTE, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
  });
  const [sendmail] = useMutation(SEND_TREATY_CREDIT_AND_STATEMENTS_NOTE, {
    refetchQueries: [
      { query: TREATY, variables: { treaty_id: treaty?.treaty_id } },
    ],
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

  const chooseNote = (note_id) => {
    const __ = treaty?.treaty_accounts?.map((el) => el.treaty_account_id);
    // console.log(__);
    const note = note_id === "All" ? __ : [note_id];
    setNote(note);
  };

  const chooseDoc = (doc) => {
    const __ = ["0", "1"];
    const _doc = doc === "All" ? __ : [doc];
    setDocType(_doc);
    if (doc === "Portfolio Statement") {
      const note_id = treaty?.treaty_accounts[0]?.treaty_account_id;
      setNote([note_id]);
    }
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

  const handleCopiedmailChange = (value) => {
    setCopiedMails(value ? value : []);
  };

  // handle send Mail
  const handleSubmitSendMail = ({ subject, copied_emails }) => {
    const data = {
      email_component: {
        email_content: content,
        subject,
        copied_email: copied_emails.length
          ? [...copiedMails.map((e) => e.label)]
          : [],
        attachments: [...files],
      },
      limit: parseFloat(layers.limit.split(",").join("")),
      m_and_d_premium: parseFloat(layers.m_and_d_premium.split(",").join("")),
      total_participation_percentage:
        reinsurer?.treaty_participation_percentage,
      installment_type: parseInt(layers.installment_type),
      layer,
      participant_id: reinsurer?.treaty_participation_id,
      uuid: layers.uuid,
      treaty_id: treaty?.treaty_id,
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to send this mail?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendcreditnote({
        variables: { data },
      })
        .then(() => {
          swal("Hurray!!", "Mail sent successfully", "success");
          setContent("");
          setFiles([]);
          setFiles([]);
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

  const handleSubmitCreditSendMail = ({ subject, copied_emails }) => {
    const data = {
      email_component: {
        email_content: content,
        subject,
        copied_email: copied_emails.length
          ? [...copiedMails.map((e) => e.label)]
          : [],
        attachments: [...files],
      },
      docType,
      treaty_account_id: noteTypes,
      treaty_id: treaty?.treaty_id,
      participant_id: reinsurer?.treaty_participation_id,
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you want to send this mail?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: { ...data },
      }).then(() => {
        swal("Hurray!!", "Mail sent successfully", "success");
        setContent("");
        setFiles([]);
        setCopiedMails([]);
        reset();
        setShow(false);
      }).catch((err) => {
        if (err) {
          // console.log(err);
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
    });
  };

  const portFolioCond = treaty?.treaty_accounts?.length >= 4;

  return (
    <div>
      <div className="mb-4">
        <div className={styles.card_header}>
          <h2 className={styles.card_title}>
            {isProp
              ? "Send Treaty Closing Note"
              : "Send Credit Note"}
          </h2>
        </div>
      </div>

      <div className="alert alert-danger p-2">
        {!isProp ? <p>
          This session will send Copy of Credit Notes along with any
          attachments to {treaty?.treaty_to_associates?.length} associates{" "}
          {reinsurer?.reinsurer?.re_company_name}
        </p> :
          <>
            <p>
              This session will send a copy of the TREATY CLOSING NOTE to <strong>{reinsurer?.reinsurer?.re_company_name}</strong>
            </p>
            <p>
              N.B: You can include any number of EMAILs. Press ENTER OR TAB key to add more
            </p>
          </>
        }
      </div>

      {isProp && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div
                className={`${docType[0] === "Portfolio Statement"
                  ? "col-md-12"
                  : "col-md-6"
                  }`}
              >
                <div className="form-group">
                  <label htmlFor="Statement Type">Document Type</label>
                  <select
                    onChange={(e) => chooseDoc(e.target.value)}
                    className="form-control"
                    name="statement_type"
                    ref={register({ required: "Required" })}
                    id="statement_type"
                  >
                    <option value="">Select ...</option>
                    <option value="0">Treaty Closing</option>
                    {portFolioCond && (
                      <option value="Portfolio Statement">
                        Portfolio Statement
                      </option>
                    )}
                  </select>
                  {errors.statement_type && (
                    <p className="text-danger">
                      {errors.statement_type.message}
                    </p>
                  )}
                </div>
              </div>
              {docType[0] !== "Portfolio Statement" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Statement Type">Quarter</label>
                    <select
                      //   disabled={docType.includes("0") || docType.includes("1")}
                      onChange={(e) => chooseNote(e.target.value)}
                      className="form-control"
                      ref={register({ required: "Required" })}
                      name="quarter"
                      id="statement_type"
                    >
                      <option value="">Select ...</option>
                      <option value="All">All</option>
                      {treaty?.treaty_accounts?.map((note) => (
                        <option value={note?.treaty_account_id}>
                          {getFlexibleName(note?.account_periods)}
                        </option>
                      ))}
                    </select>
                    {errors.quarter && (
                      <p className="text-danger">{errors.quarter.message}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(
          isProp ? handleSubmitCreditSendMail : handleSubmitSendMail
        )}
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
            <Dropzone
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
};

export default SendReinsurerDocuments;
