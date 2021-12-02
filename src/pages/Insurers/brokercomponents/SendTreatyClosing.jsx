import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Editor, Selector } from "../../../components";
import { SEND_BROKER_CLOSING_SLIP } from "../../../graphql/mutattions";
import { createOption } from "../../CreateSlip/CreateBroadcastEmail";
import { getFlexibleName } from "../components/Note";
import styles from "../styles/ViewInsurerOffer.module.css";
import { EMPLOYEES } from "../../../graphql/queries/employees";

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const SendTreatyClosing = ({ re_broker_treaties_participation_id, treaty, name = "Name" }) => {
  const { register, errors, handleSubmit, setError, clearError, reset } =
    useForm();
  const { data: employees, loading } = useQuery(EMPLOYEES);
  const [contentError, setContentError] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const [content, setContent] = useState("");
  const [treatyAccountID, setTreatyAccountID] = useState("");

  const [sendmail] = useMutation(SEND_BROKER_CLOSING_SLIP);
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

  useEffect(() => {
    if (employees) {
      const _emails = employees.employees.map((e) => ({
        label: e.employee_email,
        value: e.employee_email,
      }));
      setSelectedableEmail(_emails);
    }
  }, [employees]);

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

  const handleSubmitSendMail = ({ subject }) => {
    if (content.length < 1) {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }
    const data = {
      treaty_id: treaty?.treaty_id,
      re_broker_treaties_participation_id,
      treaty_account_id: treatyAccountID,
      emaildata: {
        email_content: content,
        subject,
        copied_email: [...copiedMails.map((e) => e.label)],
      },
    };
    // console.log(data)
    // return;
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: "warning",
      title: "Are you sure ?",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw null;
      sendmail({
        variables: { ...data },
      })
        .then(() => {
          swal("Success", "Mail sent successfully", "success");
          setContent("");
          reset();
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal(
              "Oh noes!",
              err.message.replace("GraphQL error:", ""),
              "error"
            );
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
        <h2 className={styles.card_title}>Send Broker Closing Slip</h2>
        <div className="alert alert-danger">
          <p>
            This session will send a copy of closing slip to {" "}
            <strong>{name}</strong> as
            attachment
          </p>
          <p>
            N.B: You can include any number of EMAILS. Press ENTER or TAB key to
            add more{" "}
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        className={styles.card_body}
      >
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Quarter</label>
          <div className="col-lg-10">
            <select
              ref={register({ required: "Required" })}
              name="treaty_account_id"
              className="form-control"
              placeholder="Enter subject"
              onChange={e => setTreatyAccountID(e.target.value)}
            >
              <option value="">Select</option>
              {treaty?.treaty_accounts?.map((el, key) => (
                <option key={key} value={el?.treaty_account_id}>
                  {getFlexibleName(el?.account_periods)}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-danger">{errors.treaty_account_id.message}</p>
            )}
          </div>
        </div>
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
              //   isLoading={loading}
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
};

export default SendTreatyClosing;
