/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/inputOffer.module.css";
import { useMutation, useQuery } from "react-apollo";
import { Editor, Selector } from "../../../components";
import { SEND_CONTRACT_DEBIT } from "../../../graphql/mutattions";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { DrawerContext } from "../../../components/Drawer";
import { EMPLOYEES } from "../../../graphql/queries/employees";
import { SEND_ENDORSEMENT_CONTRACT_CHANGES } from "../../../graphql/mutattions/endorsements";

const createOption = (label) => ({
  label,
  value: label,
});

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function SendContractChanges({ insurer, doc_number, toggle, endorsement }) {
  const { closed } = useContext(DrawerContext);
  const {
    register,
    errors,
    handleSubmit,
    setError,
    clearError,
    reset,
  } = useForm();
  const [contentError, setContentError] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const [content, setContent] = useState("");
  // const [emails, setEmails] = useState("")
  const { data: employees, loading } = useQuery(EMPLOYEES);

  const [sendmail] = useMutation(SEND_ENDORSEMENT_CONTRACT_CHANGES);

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
        setInputvalue("");
        setCopiedMails([...copiedMails, createOption(inputvalue)]);
        event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    setInputvalue(event);
  };

  const validateEmails = (emails) =>
    emails.every((email) => emailRegex.test(email.value));

  const handleCopiedmailChange = (value) => setCopiedMails(value ? value : []);

  useEffect(() => {
    if (copiedMails && copiedMails.length) {
      const validEmails = validateEmails(copiedMails);
      validEmails
        ? clearError("copied_emails")
        : setError("copied_emails", "pattern", "Provide valid mails");
    }
  }, [copiedMails]);

  const handleSubmitSendMail = ({ subject, copied_emails }) => {
    if (content.length < 1) {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }
    const data = {
      // reinsurer_id: reisnsurer?.reinsurer.reinsurer_id,
      offer_endorsement_id: endorsement?.offer_endorsement_id,
      email_content: content,
      subject,
      doc_number,
      copied_email: [...copiedMails.map((e) => e.label)],
    };
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: { data },
      })
        .then((res) => {
          swal("Success", "Mail sent successfully", "success");
          setContent("");
          reset();
          toggle();
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
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
        <h2 className={styles.card_title}>Send Endorsement Contract Changes</h2>
        <Alert variant="danger">
          <p>
            This session will send a copy of Endorsement Contract Changes and to{" "}
            <strong>{insurer}</strong> as attachment
          </p>
          <p>
            N.B: You can include any number of EMAILS. Press ENTER or TAB key to
            add more{" "}
          </p>
        </Alert>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Subject</label>
          <div className="col-lg-10">
            <input
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
          <label className="col-form-label col-lg-2">CC</label>
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
            {/* <JoditEditor value={content} onChange={value => setContent(value)} /> */}
            <Editor value={content} onChange={(value) => setContent(value)} />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-10">
            {contentError && <p className="text-danger">Required</p>}
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

export default SendContractChanges;
