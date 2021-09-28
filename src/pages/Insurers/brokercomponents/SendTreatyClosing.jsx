import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Editor, Selector } from "../../../components";
import { SEND_CLOSING_SLIP } from "../../../graphql/mutattions";
import { createOption } from "../../CreateSlip/CreateBroadcastEmail";
import styles from "../styles/ViewInsurerOffer.module.css";

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const SendTreatyClosing = ({ broker }) => {
  const { register, errors, handleSubmit, setError, clearError, reset } =
    useForm();
  const [contentError, setContentError] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const [content, setContent] = useState("");
  // const [emails, setEmails] = useState("")

  const [sendmail] = useMutation(SEND_CLOSING_SLIP);

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
      //   reinsurer_id: reisnsurer?.reinsurer.reinsurer_id,
      //   offer_id: offer?.offer_id,
      //   message_content: content,
      //   subject,
      //   copied_emails: [...copiedMails.map((e) => e.label)],
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
        <h2 className={styles.card_title}>Send Closing Slip</h2>
        <div className="alert alert-danger">
          <p>
            This session will send a copy of closing slip to{" "}
            {/* <strong>{reisnsurer?.reinsurer?.re_company_name}</strong> as */}
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
