/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import styles from "../styles/inputOffer.module.css";
import { Dropzone, Selector, Editor } from "../../../components";
import { useMutation, useQuery } from "@apollo/client";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import JoditEditor from "jodit-react";
import { EMPLOYEES } from "../../../graphql/queries/employees";
import { SEND_PLACING_OR_COVER_NOTE } from "../../../graphql/mutattions/treaty";
import { TREATY } from "../../../graphql/queries/treaty";

export const createOption = (label) => ({
  label,
  value: label,
});

export const validateEmails = (emails) => {
  let flag = true;
  for (let index = 0; index < emails.length; index++) {
    const element = emails[index];
    console.log("email" + index, element);
    if (emailRegex.test(element)) {
      flag = flag && true;
      console.log(true);
    } else {
      flag = flag && false;
      console.log(false);
    }
  }

  return flag;
};

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

function SendCoverNote({ treaty, setShow, closed }) {
  const { register, errors, handleSubmit, setError, clearError, reset } =
    useForm();
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);
  const [files, setFiles] = useState([]);
  const [sendmail, { loading: mailSending }] = useMutation(
    SEND_PLACING_OR_COVER_NOTE,
    { refetchQueries: [{ query: TREATY, variables: { treaty_id: treaty?.treaty_id } }] }
  );
  const [inputvalue, setInputvalue] = useState("");
  const [copiedMails, setCopiedMails] = useState([]);
  const [selectedableEmail, setSelectedableEmail] = useState([]);
  const { data: employees, loading } = useQuery(EMPLOYEES);

  const noOfReinsurers = treaty?.treaty_participants?.length ?? 0;
  const noOfAssociates = treaty?.treaty_to_associates?.length ?? 0;

  useEffect(() => {
    if (employees) {
      const _emails = employees.employees.map((e) => ({
        label: e.employee_email,
        value: e.employee_email,
      }));
      setSelectedableEmail(_emails);
    }
  }, [employees]);

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
    if (!validateEmails(copiedMails)) {
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
    // return;
    const data = {
      treaty_id: treaty?.treaty_id,
      doc_type: "COVER",
      emaildata: {
        email_content: content,
        subject,
        copied_email: copied_emails.length
          ? [...copiedMails.map((e) => e.label)]
          : [],
        attachments: [...files],
      }
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
          if (res.data.sendTreatyPlacingOrCovertNote) {
            swal("Success", "Mail sent successfully", "success");
            swal.stopLoading();
            swal.close();
            setShow(false)
          } else {
            swal("Success", "Mail sent successfully", "success");
            setContent("");
            setFiles([]);
            setFiles([]);
            reset();
            setShow(false)
          }
        })
        .catch((err) => {
          if (err) {
            // console.log(err)
            swal("Sorry!!", err.message.replace("GraphQL error:", ""), "error");
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
        <h2 className={styles.card_title}>Send Cover Note</h2>
        <Alert variant="danger">
          <strong>
            Send offer to {noOfReinsurers} reinsurers with {noOfAssociates}{" "}
            Associates
          </strong>
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
            {/* <SummerNote onChange={e => setContent(e)} /> */}
            {/* <JoditEditor value={content} onChange={value => setContent(value)} /> */}
            <Editor value={content} onChange={(value) => setContent(value)} />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-10">
            {contentError && <p className="text-danger">Required</p>}
          </div>
        </div>
        {/* <div className="form-group row mb-4">
                    <label className="col-form-label col-lg-2"></label>
                    <div className="col-lg-10">
                        <input className="ml-1 form-check-input" type="checkbox" name="" id="" />
                        <label className="ml-4 form-check-label" htmlFor="defaultCheck1">
                            Add facultative placement slip
                        </label>
                    </div>
                </div> */}
        <div className="form-group row mb-4">
          <label className="col-form-label col-lg-2">Attachment(s)</label>
          <div className="col-lg-10">
            <Dropzone
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

export default SendCoverNote;
