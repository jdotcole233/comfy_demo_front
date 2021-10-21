/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useContext, useMemo } from "react";
import styles from "./styles/card.module.css";
import { Alert } from "react-bootstrap";
import { Selector, Editor } from "../../components";
import { useMutation, useQuery } from "@apollo/client";
import { EMPLOYEES } from "../../graphql/queries/employees";
// import { CLAIM_REQUEST } from "../../graphql/mutattions";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { DrawerContext } from "../../components/Drawer";
import DropZone from "../../components/DropZone";
import { Select } from "../../components/Input";
import { validateEmails } from "./../../pages/CreateSlip/CreateBroadcastEmail";
import { SEND_TREATY_CLAIM_DEBIT_NOTE } from "../../graphql/queries/treaty";

const createOption = (label) => ({
  label,
  value: label,
});

// const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function ClaimRequest({ offer, toggle, claims, participant }) {
  const { closed } = useContext(DrawerContext);
  const { data: employees, loading } = useQuery(EMPLOYEES);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const { register, errors, handleSubmit, setError, reset } = useForm();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [sendSingle, setSendSingle] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [documentPage, setDocumentPage] = useState(-1);
  const [sendmail] = useMutation(SEND_TREATY_CLAIM_DEBIT_NOTE);

  const pages = useMemo(() => {
    if (claims) {
      return claims.map((claim, key) => ({
        label: `Document ${key + 1}`,
        value: key + 1,
      }));
    }
    return [];
  }, [claims]);

  useEffect(() => {
    if (employees) {
      const _emails = employees.employees.map((e) => ({
        label: e.employee_email,
        value: e.employee_email,
      }));
      setSelectedableEmail(_emails);
    }
  }, [employees]);

  useEffect(() => {
    if (closed) {
      reset();
      setContent("");
    }
  }, [closed, reset]);

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

  const handleInputChange = (event) => {
    setInputvalue(event);
  };

  const handleCopiedmailChange = (value) => {
    setCopiedMails(value ? value : []);
    // handleEmailChange(value);
  };

  const handleSubmitSendMail = ({ subject }) => {
    if (content.length < 1) {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }
    if (!validateEmails(copiedMails.map((e) => e.label))) {
      setError("copied_emails", "pattern", "Provide valid mails");
      return;
    }

    const formedData = {
      single_document: sendSingle ? 1 : 0,
      treaty_id: offer?.treaty_id,
      treaty_participant_id: participant?.treaty_participation_id,
      reinsurer_id: participant?.reinsurer?.reinsurer_id,
      paged: documentPage,
      email_component: {
        email_content: content,
        subject,
        copied_email: [...copiedMails.map((e) => e.label)],
        attachments: [...files],
      },
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure you make a claim request ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: formedData,
      })
        .then((res) => {
          swal("Hurray!!", "Mail sent successfully", "success");
          reset();
          setContent("");
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
  return (
    <>
      <div className={styles.card_header}>
        <h2 className={styles.card_title}>Send Claim Document(s) TReaty</h2>
        <Alert variant="danger">
          <p>
            This session will send copies of the claim debit note to all
            associates of{" "}
            <strong>{participant?.reinsurer?.re_company_name}</strong>
          </p>
          <p>
            N.B: You can include any number of EMAILS. Press ENTER or TAB key to
            add more in "<i>cc</i>" section{" "}
          </p>
        </Alert>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        <div className="row mb-2">
          <div className="col-md-2">
            <label className="" htmlFor="">
              Single Doc.
            </label>
          </div>
          <div className="col-md-10 ">
            <div
              onClick={() => setSendSingle((prev) => !prev)}
              style={{ height: 10, width: 10, cursor: "pointer" }}
              className={`${
                sendSingle ? "bg-primary" : "bg-secondary"
              } p-2 rounded`}
            >
              {/* {sendSingle && <FaCheck color="white" size={10} />} */}
            </div>
          </div>
        </div>
        {sendSingle && (
          <div className="row mb-2">
            <div className="col-md-2">
              <label className="" htmlFor=""></label>
            </div>
            <div className="col-md-10 ">
              <Select
                options={pages}
                onChange={(e) => setDocumentPage(e.target.value)}
              />
            </div>
          </div>
        )}
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
            <Editor value={content} onChange={(value) => setContent(value)} />
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
              closed={closed}
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
    </>
  );
}

export default ClaimRequest;
